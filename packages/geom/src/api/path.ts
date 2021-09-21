import { equiv } from "@thi.ng/equiv";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { Attribs, IHiccupShape, PathSegment } from "@thi.ng/geom-api";
import { copy } from "@thi.ng/vectors/copy";
import { copyAttribs } from "../internal/copy-attribs";

export class Path implements IHiccupShape {
    closed = false;

    constructor(
        public segments: PathSegment[] = [],
        public attribs?: Attribs
    ) {}

    get type() {
        return "path";
    }

    *[Symbol.iterator]() {
        yield* this.segments;
    }

    copy(): Path {
        const p = new Path(
            this.segments.map((s) => {
                const d: PathSegment = { type: s.type };
                s.point && (d.point = copy(s.point));
                s.geo && (d.geo = <any>s.geo.copy());
                return d;
            }),
            copyAttribs(this)
        );
        p.closed = this.closed;
        return p;
    }

    equiv(o: any) {
        return o instanceof Path && equiv(this.segments, o.segments);
    }

    add(s: PathSegment) {
        if (this.closed) illegalState("path already closed");
        this.segments.push(s);
    }

    toHiccup() {
        let dest: any[] = [];
        const segments = this.segments;
        const n = segments.length;
        if (n > 1) {
            for (let i = 0; i < n; i++) {
                const s = segments[i];
                if (s.geo) {
                    dest = dest.concat(s.geo!.toHiccupPathSegments());
                } else if (s.point) {
                    dest.push(["M", s.point]);
                }
            }
            if (this.closed) {
                dest.push(["Z"]);
            }
        }
        return ["path", this.attribs || {}, dest];
    }
}

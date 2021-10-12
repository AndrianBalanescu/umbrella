import type { IHiccupPathSegment } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy";
import { APC } from "./apc";

export class Cubic extends APC implements IHiccupPathSegment {
    get type() {
        return "cubic";
    }

    copy(): Cubic {
        return <Cubic>__copyShape(Cubic, this);
    }

    toHiccup() {
        return [
            "path",
            this.attribs,
            [["M", this.points[0]], ...this.toHiccupPathSegments()],
        ];
    }

    toHiccupPathSegments() {
        const pts = this.points;
        return [["C", pts[1], pts[2], pts[3]]];
    }
}

import type { IObjectOf } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import type { Implementation2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PathSegment } from "@thi.ng/geom-api";
import { simplify as _simplify } from "@thi.ng/geom-resample/simplify";
import type { Vec } from "@thi.ng/vectors";
import { Path } from "../api/path";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const simplify = defmulti<IShape, number, IShape>(dispatch);

simplify.addAll(<IObjectOf<Implementation2<unknown, number, IShape>>>{
    path: ($: Path, eps = 0.1) => {
        const res: PathSegment[] = [];
        const orig = $.segments;
        const n = orig.length;
        let points!: Vec[] | null;
        let lastP!: Vec;
        for (let i = 0; i < n; i++) {
            const s = orig[i];
            if (s.type === "l" || s.type === "p") {
                points = points
                    ? points.concat(vertices(s.geo!))
                    : vertices(s.geo!);
                lastP = peek(points);
            } else if (points) {
                points.push(lastP);
                res.push({
                    geo: new Polyline(_simplify(points, eps)),
                    type: "p",
                });
                points = null;
            } else {
                res.push({ ...s });
            }
        }
        if (points) {
            points.push(lastP);
            res.push({
                geo: new Polyline(points),
                type: "p",
            });
        }
        return new Path(res, copyAttribs($));
    },

    poly: ($: Polygon, eps = 0.1) =>
        new Polygon(_simplify($.points, eps, true), copyAttribs($)),

    polyline: ($: Polyline, eps = 0.1) =>
        new Polyline(_simplify($.points, eps), copyAttribs($)),
});

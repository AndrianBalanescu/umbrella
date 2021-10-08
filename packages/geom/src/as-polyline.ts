import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import { set } from "@thi.ng/vectors/set";
import type { Path } from "./api/path";
import { Polyline } from "./api/polyline";
import { copyAttribs } from "./internal/copy-attribs";
import { dispatch } from "./internal/dispatch";
import { vertices } from "./vertices";

export const asPolyline: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Polyline
> = defmulti<any, number | Partial<SamplingOpts> | undefined, Polyline>(
    dispatch,
    {
        arc: "points",
        circle: "poly",
        cubic: "points",
        ellipse: "poly",
        line: "points",
        polyline: "points",
        quad: "poly",
        quadratic: "points",
        rect: "poly",
        tri: "poly",
    },
    {
        points: ($, opts) => new Polyline(vertices($, opts), copyAttribs($)),

        path: ($: Path, opts) => {
            const pts = vertices($, opts);
            $.closed && pts.push(set([], pts[0]));
            return new Polyline(pts, copyAttribs($));
        },

        poly: ($, opts) => {
            const pts = vertices($, opts);
            pts.push(set([], pts[0]));
            return new Polyline(pts, copyAttribs($));
        },
    }
);

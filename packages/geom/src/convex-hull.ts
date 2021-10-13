import type { MultiFn1 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { grahamScan2 } from "@thi.ng/geom-hull/graham-scan";
import { Polygon } from "./api/polygon.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

export const convexHull: MultiFn1<IShape, IShape> = defmulti<any, IShape>(
    __dispatch,
    {
        circle: "tri",
        ellipse: "tri",
        poly: "points",
        polyline: "points",
        quad: "points",
        rect: "tri",
    },
    {
        group: ($: IShape) => new Polygon(vertices($), __copyAttribs($)),

        points: ($: PCLike) =>
            new Polygon(grahamScan2($.points), __copyAttribs($)),

        tri: ($: IShape) => $.copy(),
    }
);

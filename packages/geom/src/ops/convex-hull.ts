import type { MultiFn1 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { grahamScan2 } from "@thi.ng/geom-hull/graham-scan";
import { Polygon } from "../api/polygon";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { vertices } from "./vertices";

export const convexHull: MultiFn1<IShape, IShape> = defmulti<any, IShape>(
    dispatch,
    {
        circle: "tri",
        ellipse: "tri",
        poly: "points",
        polyline: "points",
        quad: "points",
        rect: "tri",
    },
    {
        group: ($: IShape) => new Polygon(vertices($), copyAttribs($)),

        points: ($: PCLike) =>
            new Polygon(grahamScan2($.points), copyAttribs($)),

        tri: ($: IShape) => $.copy(),
    }
);

import type { IObjectOf } from "@thi.ng/api";
import type { Implementation2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape, IShape } from "@thi.ng/geom-api";
import { clipLineSegmentPoly } from "@thi.ng/geom-clip-line/clip-poly";
import { sutherlandHodgeman } from "@thi.ng/geom-clip-poly";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { Group } from "../api/group";
import { Line } from "../api/line";
import { Polygon } from "../api/polygon";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { ensureVertices, vertices } from "./vertices";

export const clipConvex = defmulti<
    IShape,
    IShape | ReadonlyVec[],
    IShape | undefined
>(dispatch);

clipConvex.addAll(<
    IObjectOf<
        Implementation2<unknown, IShape | ReadonlyVec[], IShape | undefined>
    >
>{
    group: ({ children, attribs }: Group, boundary) => {
        boundary = ensureVertices(boundary);
        const clipped: IHiccupShape[] = [];
        for (let c of children) {
            const res = clipConvex(c, boundary);
            if (res) clipped.push(<IHiccupShape>res);
        }
        return new Group({ ...attribs }, clipped);
    },

    line: ($: Line, boundary) => {
        const segments = clipLineSegmentPoly(
            $.points[0],
            $.points[1],
            ensureVertices(boundary)
        );
        return segments && segments.length
            ? new Line(segments[0], copyAttribs($))
            : undefined;
    },

    poly: ($: Polygon, boundary) => {
        boundary = ensureVertices(boundary);
        const pts = sutherlandHodgeman($.points, boundary, centroid(boundary));
        return pts.length ? new Polygon(pts, copyAttribs($)) : undefined;
    },

    rect: ($: IShape, boundary) => {
        boundary = ensureVertices(boundary);
        const pts = sutherlandHodgeman(
            vertices($),
            boundary,
            centroid(boundary)
        );
        return pts.length ? new Polygon(pts, copyAttribs($)) : undefined;
    },
});

clipConvex.isa("circle", "rect");
clipConvex.isa("ellipse", "rect");
clipConvex.isa("path", "rect");
clipConvex.isa("quad", "poly");
clipConvex.isa("tri", "poly");

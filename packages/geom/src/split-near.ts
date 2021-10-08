import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { closestT } from "@thi.ng/geom-closest-point/line";
import { Sampler } from "@thi.ng/geom-resample/sampler";
import { splitCubicNearPoint } from "@thi.ng/geom-splines/cubic-split";
import { quadraticSplitNearPoint } from "@thi.ng/geom-splines/quadratic-split";
import { clamp01 } from "@thi.ng/math/interval";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { Cubic } from "./api/cubic";
import { Line } from "./api/line";
import { Polyline } from "./api/polyline";
import { Quadratic } from "./api/quadratic";
import { copyAttribs } from "./internal/copy-attribs";
import { dispatch } from "./internal/dispatch";
import { pointArraysAsShapes } from "./internal/points-as-shape";
import { splitLine } from "./internal/split";

/**
 * Similar to {@link splitAt}, but instead of taking a normalized parametric
 * split position, splits the given curve at the closest point to `p`.
 * Returns tuple of split shapes of same type as `shape`.
 *
 * Implemented for:
 *
 * - Cubic
 * - Line
 * - Polyline
 * - Quadratic
 *
 * @param shape - shape to operate on
 * @param p - split point
 */
export const splitNearPoint: MultiFn2<
    IShape,
    ReadonlyVec,
    IShape[] | undefined
> = defmulti<any, ReadonlyVec, IShape[] | undefined>(
    dispatch,
    {},
    {
        cubic: ({ points, attribs }: Cubic, p) =>
            splitCubicNearPoint(
                p,
                points[0],
                points[1],
                points[2],
                points[3]
            ).map((pts) => new Cubic(pts, { ...attribs })),

        line: ($: Line, p) => {
            const t = closestT(p, $.points[0], $.points[1]) || 0;
            return splitLine($.points[0], $.points[1], clamp01(t)).map(
                (pts) => new Line(pts, copyAttribs($))
            );
        },

        polyline: ($: Polyline, p) =>
            pointArraysAsShapes(
                Polyline,
                new Sampler($.points).splitNear(p),
                $.attribs
            ),

        quadratic: ({ points, attribs }: Quadratic, p) =>
            quadraticSplitNearPoint(p, points[0], points[1], points[2]).map(
                (pts) => new Quadratic(pts, { ...attribs })
            ),
    }
);

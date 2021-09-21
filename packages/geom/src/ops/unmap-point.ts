import type { IObjectOf } from "@thi.ng/api";
import type { Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { madd } from "@thi.ng/vectors/madd";
import { mixBilinear } from "@thi.ng/vectors/mix-bilinear";
import type { Quad } from "../api/quad";
import type { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";

/**
 * Projects given point `uv` (normalized coords) into the target space
 * defined by `shape` and writes result to `out` (or returns new
 * vector). See {@link mapPoint} for reverse operation. Both functions
 * together can be used to warp points from one shape into another.
 *
 * Currently only implemented for these shape types:
 *
 * - AABB
 * - Quad
 * - Rect
 *
 * @param shape - shape to operate on
 * @param uv - point to map in UV space
 * @param out - result
 */
export const unmapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(
    <any>dispatch
);

unmapPoint.addAll(<IObjectOf<Implementation2O<unknown, ReadonlyVec, Vec, Vec>>>{
    quad: ({ points }: Quad, uv, out = []) =>
        mixBilinear(
            out,
            points[0],
            points[1],
            points[3],
            points[2],
            uv[0],
            uv[1]
        ),

    rect: ($: Rect, uvw: ReadonlyVec, out = []) =>
        madd(out, $.size, uvw, $.pos),
});

unmapPoint.isa("aabb", "rect");
unmapPoint.isa("quad3", "quad");

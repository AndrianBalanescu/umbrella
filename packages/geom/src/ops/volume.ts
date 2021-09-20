import type { IObjectOf } from "@thi.ng/api";
import type { Implementation1 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import { PI } from "@thi.ng/math/api";
import type { AABB } from "../api/aabb";
import type { Sphere } from "../api/sphere";
import { dispatch } from "../internal/dispatch";

/**
 * Returns the volume of given 3D shape. Returns 0 for all others.
 *
 * Currently only implemented for:
 *
 * - AABB
 * - Sphere
 */
export const volume = defmulti<IShape, number>(dispatch);
volume.setDefault(() => 0);

volume.addAll(<IObjectOf<Implementation1<unknown, number>>>{
    aabb: ({ size }: AABB) => size[0] * size[1] * size[2],

    sphere: ($: Sphere) => (4 / 3) * PI * $.r ** 3,
});

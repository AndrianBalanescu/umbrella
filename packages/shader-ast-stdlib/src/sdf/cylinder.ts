import type { Vec2Sym } from "@thi.ng/shader-ast";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT0, vec2, VEC2_0 } from "@thi.ng/shader-ast/ast/lit";
import { add, sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { abs, length, max, min } from "@thi.ng/shader-ast/builtin/math";
import { maxComp2 } from "../math/maxcomp.js";

/**
 * Returns signed distance from `p` to cylinder centered around Y-axis
 * with height `h` and radius `r`.
 *
 * @param p - vec3
 * @param h - float
 * @param r - float
 */
export const sdfCylinder = defn(
    "float",
    "sdCylinder",
    ["vec3", "float", "float"],
    (p, h, r) => {
        let d: Vec2Sym;
        return [
            (d = sym(sub(abs(vec2(length($(p, "xz")), $y(p))), vec2(h, r)))),
            ret(add(min(maxComp2(d), FLOAT0), length(max(d, VEC2_0)))),
        ];
    }
);

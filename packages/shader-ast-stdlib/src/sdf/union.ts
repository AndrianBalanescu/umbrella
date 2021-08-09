import { $x, defn, FloatTerm, lt, min, ret, ternary } from "@thi.ng/shader-ast";

/**
 * Inline function. Variadic SDF shape union (a || b) for any number of terms
 * (at least 1 required).
 *
 * @param a -
 * @param terms -
 */
export const sdfUnion = (a: FloatTerm, ...terms: FloatTerm[]) =>
    terms.reduce((a, b) => min(a, b), a);

/**
 * SDF shape union for vec2 terms, i.e. the common form where the X coord
 * defines distance and Y an object or material ID.
 *
 * @param a -
 * @param b -
 */
export const sdfUnion2 = defn("vec2", "sdfUnion2", ["vec2", "vec2"], (a, b) => [
    ret(ternary(lt($x(a), $x(b)), a, b)),
]);

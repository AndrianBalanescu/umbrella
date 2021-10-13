import type { Mat, ReadonlyMat } from "./api.js";
import { mulM } from "./mulm.js";

/**
 * Concatenates / multiplies given matrices in left-to-right order. A
 * minimum of 2 input matrices must be given. If `out` is null, writes
 * result into `a`.
 *
 * @param out -
 * @param a -
 * @param b -
 * @param xs -
 */
export const concat = (
    out: Mat | null,
    a: ReadonlyMat,
    b: ReadonlyMat,
    ...xs: ReadonlyMat[]
): Mat => xs.reduce((acc: Mat, x) => mulM(acc, acc, x), mulM(out, a, b));

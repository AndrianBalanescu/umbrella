import type { VecOpSGVNV, VecOpSVNV } from "./api.js";
import { defOpS } from "./compile/emit.js";
import { ARGS_VVN, MATH2_N, SARGS_VV } from "./compile/templates.js";

export const [submNS, submNS2, submNS3, submNS4] = defOpS<
    VecOpSGVNV,
    VecOpSVNV
>(MATH2_N("-", "*"), ARGS_VVN, SARGS_VV);

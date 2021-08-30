import type { VecOpSGVN, VecOpSVN } from "./api";
import { ARGS_V, ARGS_VN, defOpS, SARGS_V } from "./internal/codegen";
import { MATH_N } from "./internal/templates";

export const [mulNS, mulNS2, mulNS3, mulNS4] = defOpS<VecOpSGVN, VecOpSVN>(
    MATH_N("*"),
    ARGS_VN,
    SARGS_V,
    ARGS_V
);

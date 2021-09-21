import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [sign, sign2, sign3, sign4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.sign"
);

import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [asin, asin2, asin3, asin4] = defFnOp<MultiVecOpV, VecOpV>(
    "Math.asin"
);

import type { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./compile/emit";

export const [cos, cos2, cos3, cos4] = defFnOp<MultiVecOpV, VecOpV>("Math.cos");

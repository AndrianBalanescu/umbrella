import { ReadonlyVec, signedArea2 } from "@thi.ng/vectors3";

export const clockwise2 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec) =>
        signedArea2(a, b, c) < 0;

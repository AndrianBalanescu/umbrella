import { powN3 } from "@thi.ng/vectors/pown";
import type { ColorOp } from "../api";
import { OKLAB_M2 } from "../api/constants";
import { mulV33 } from "../internal/matrix-ops";

const CONE_LMS = [
    0.412165612, 0.211859107, 0.0883097947, 0.536275208, 0.6807189584,
    0.2818474174, 0.0514575653, 0.107406579, 0.6302613616,
];

/**
 * @remarks
 * Reference: https://bottosson.github.io/posts/oklab/
 *
 * @param out
 * @param src
 */
export const rgbOklab: ColorOp = (out, src) =>
    mulV33(null, OKLAB_M2, powN3(null, mulV33(out, CONE_LMS, src), 1 / 3));

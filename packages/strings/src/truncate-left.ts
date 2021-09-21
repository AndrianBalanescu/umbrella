import { memoizeJ } from "@thi.ng/memoize/memoizej";
import type { Stringer } from "./api";

export const truncateLeft: (n: number, prefix?: string) => Stringer<string> =
    memoizeJ(
        (n: number, prefix = "") =>
            (x) =>
                x.length > n
                    ? prefix + x.substr(x.length - n + prefix.length)
                    : x
    );

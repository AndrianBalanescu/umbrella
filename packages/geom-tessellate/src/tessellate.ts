import { isFunction } from "@thi.ng/checks/is-function";
import type { Tessellator } from "@thi.ng/geom-api";
import { repeat } from "@thi.ng/transducers/iter/repeat";
import { reducer } from "@thi.ng/transducers/reduce";
import { last } from "@thi.ng/transducers/rfn/last";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { scan } from "@thi.ng/transducers/xform/scan";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export function tessellate(
    points: ReadonlyVec[],
    tessFn: Tessellator,
    iter?: number
): Vec[][];
export function tessellate(
    points: ReadonlyVec[],
    tessFns: Iterable<Tessellator>
): Vec[][];
export function tessellate(...args: any[]) {
    return transduce(
        scan(
            reducer(
                () => [args[0]],
                (acc: Vec[][], fn: Tessellator) =>
                    transduce(mapcat(fn), push(), acc)
            )
        ),
        last(),
        isFunction(args[1]) ? repeat(args[1], args[2] || 1) : args[1]
    );
}

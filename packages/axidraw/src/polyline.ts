import type { ReadonlyVec } from "@thi.ng/vectors";
import { DOWN, DrawCommand, PolylineOpts, START, STOP, UP } from "./api.js";

/**
 * Takes an array of 2D points and yields an iterable of {@link DrawCommand}s.
 * The drawing behavior can be customized via additional {@link PolylineOpts}
 * given.
 *
 * @param pts
 * @param opts
 */
export function* polyline(
	pts: ReadonlyVec[],
	opts: Partial<PolylineOpts>
): IterableIterator<DrawCommand> {
	if (!pts.length) return;
	const { speed, delayDown, delayUp, down, onlyGeo } = {
		speed: 1,
		onlyGeo: false,
		...opts,
	};
	if (onlyGeo) {
		for (let p of pts) yield ["m", p, speed];
		return;
	}
	yield UP;
	yield ["m", pts[0]];
	if (down !== undefined) yield ["pen", down];
	yield delayDown != undefined ? ["d", delayDown] : DOWN;
	for (let i = 1, n = pts.length; i < n; i++) yield ["m", pts[i], speed];
	yield delayUp != undefined ? ["u", delayUp] : UP;
	// reset pen to configured defaults
	if (down !== undefined) yield ["pen"];
}

/**
 * Syntax sugar. Takes an iterable of draw commands, adds {@link START} as
 * prefix and {@link STOP} as suffix. I.e. it creates a "complete" drawing...
 *
 * @example
 * ```ts
 * [...complete([ ["m", [0, 0]] ])]
 * // [ ["start"], ["m", [0, 0]], ["stop"] ]
 * ```
 *
 * @param commands
 */
export function* complete(commands: Iterable<DrawCommand>) {
	yield START;
	yield* commands;
	yield STOP;
}

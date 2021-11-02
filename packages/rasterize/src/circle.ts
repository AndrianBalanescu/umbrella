import type { IGrid2D, TypedArray } from "@thi.ng/api";
import { circleClipped } from "@thi.ng/grid-iterators/circle";
import { draw2D } from "./draw";

export const drawCircle = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    x: number,
    y: number,
    r: number,
    val: P,
    fill = false
) =>
    draw2D(
        grid,
        val,
        circleClipped(x, y, r, 0, 0, grid.width, grid.height, fill)
    );

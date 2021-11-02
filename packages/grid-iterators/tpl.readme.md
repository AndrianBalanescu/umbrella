# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

Provides the altogether 25 following orderings to generate grid coordinates,
including iterators for shape rasterization, drawing, clipping, filling,
processing in general:

### Columns

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/columns2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/columns.ts)

Also see the filtered version
[`columnEnds2d()`](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/column-ends.ts),
which only includes the end points of each column.

### Diagonal

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/diagonal2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/diagonal.ts)

Also see the filtered version
[`diagonalEnds2d()`](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/diagonal-ends.ts),
which only includes the end points of the diagonals.

### Hilbert curve

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/hilbert2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/hilbert.ts)

### Interleave columns

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/interleavecolumns2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/interleave.ts)

Supports custom strides... example uses `step = 4`

### Interleave rows

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/interleaverows2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/interleave.ts)

Supports custom strides... example uses `step = 4`

### Random

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/random2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/random.ts)

Supports custom PRNG implementations via `IRandom` interface defined in
[@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)

### Rows

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/rows2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/rows.ts)

Also see the filtered version
[`rowEnds2d()`](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/row-ends.ts),
which only includes the end points of each row.

### Outward spiral

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/spiral2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/spiral.ts)

### Z-curve

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/zcurve2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/zcurve.ts)

### Zigzag columns

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/zigzagcolumns2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/zigzag-columns.ts)

### Zigzag diagonal

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/zigzagdiag2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/zigzag-diagonal.ts)

### Zigzag rows

![anim](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/grid-iterators/zigzagrows2d-small.gif)

[Source](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/zigzag-rows.ts)

Some functions have been ported from [Christopher
Kulla](https://fpsunflower.github.io/ckulla/)'s Java-based [Sunflow
renderer](https://sunflow.sf.net).

For more basic 2D/3D grid iteration, also see `range2d()` & `range3d()`
in
[@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).

### Flood filling

The `floodFill()` iterator can be used to iterate arbitrary 2D grids using an
user-provided predicate function. The function recursively explores (in a
row-major manner) the space in the `[0,0]..(width,height)` interval, starting at
given `x,y` and continues as long given predicate function returns a truthy
value. Any eligible 90-degree connected regions will be found and iterated
recursively. The predicate function is used to select eligible grid cells
(e.g. "pixels" of sorts).

```ts
// source "image"
const img = [
    "█", " ", " ", " ", "█",
    "█", " ", "█", " ", " ",
    " ", " ", "█", " ", "█",
    " ", "█", "█", " ", " ",
    " ", " ", " ", "█", "█",
];

// flood fill iterator from point (1,0)
// only accept " " as source pixel value
// image size is 5x5
const region = floodFill((x, y) => img[x + y * 5] === " ", 1, 0, 5, 5);

// label filled pixels using increasing ASCII values
let ascii = 65; // "A"
for(let [x,y] of region) img[x + y * 5] = String.fromCharCode(ascii++);

// result image showing fill order
img
// [
//   "█", "A", "B", "C", "█",
//   "█", "I", "█", "D", "E",
//   "K", "J", "█", "F", "█",
//   "L", "█", "█", "G", "H",
//   "M", "N", "O", "█", "█"
// ]
```

### Miscellaneous

Additionally, the following shape iterators are available, all also with
optional clipping:

- [circle](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/circle.ts) (Bresenham)
- [hline](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/hvline.ts)
- [vline](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/hvline.ts)
- [line](https://github.com/thi-ng/umbrella/tree/develop/packages/grid-iterators/src/line.ts) (Bresenham)

${status}

${supportPackages}

${relatedPackages}

${blogPosts}

## Installation

${pkg.install}

${pkg.size}

## Dependencies

${pkg.deps}

${examples}

## API

${docLink}

```ts
import * as gi from "@thi.ng/grid-iterators";

[...gi.zigzagRows2d(4, 4)]

// [
//   [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
//   [ 3, 1 ], [ 2, 1 ], [ 1, 1 ], [ 0, 1 ],
//   [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ],
//   [ 3, 3 ], [ 2, 3 ], [ 1, 3 ], [ 0, 3 ]
// ]
```

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}

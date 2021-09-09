<!-- This file is generated - DO NOT EDIT! -->

# ![transducers-hdom](https://media.thi.ng/umbrella/banners/thing-transducers-hdom.svg?203f11e2)

[![npm version](https://img.shields.io/npm/v/@thi.ng/transducers-hdom.svg)](https://www.npmjs.com/package/@thi.ng/transducers-hdom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/transducers-hdom.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Transducer based UI updater for [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom). This is a support package for [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers).

This package provides a single `updateDOM` function, a side-effecting &
stateful transducer which receives
[@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
component trees, diffs each against the previous value and applies any
required changes to the browser DOM, starting at given root element. By
default, incoming values are first normalized using @thi.ng/hdom's
`normalizeTree()` function. See [hdom's `start()`
function](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom#start)
for more details.

If the `hydrate` option is given, the first received tree is only used
to inject event listeners and initialize components with lifecycle
`init()` methods and expects an otherwise identical pre-existing DOM.
All succeeding trees are diffed then as usual.

This transducer is primarily intended for
[@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream)-based
dataflow graphs, where it can be used as final leaf subscription /
stream transformer to reflect UI changes back to the user, without using
the usual RAF update loop used by @thi.ng/hdom by default. In this
setup, DOM updates will only be performed if the stream this transducer
is attached to receives new values (i.e. hdom component trees).

Please also see the following hdom references for further details:

- [start()](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom/src/start.ts)
- [HDOMOpts](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom/src/api.ts#L19)

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Btransducers-hdom%5D+in%3Atitle)

### Related packages

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom) - Lightweight vanilla ES6 UI component trees with customizable branch-local behaviors
- [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/develop/packages/interceptors) - Interceptor based event bus, side effect & immutable state handling
- [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/develop/packages/rstream) - Reactive streams & subscription primitives for constructing dataflow graphs / pipelines

## Installation

```bash
yarn add @thi.ng/transducers-hdom
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/transducers-hdom"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const transducersHdom = await import("@thi.ng/transducers-hdom");
```

Package sizes (gzipped, pre-treeshake): ESM: 291 bytes

## Dependencies

- [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/develop/packages/hdom)
- [@thi.ng/hiccup](https://github.com/thi-ng/umbrella/tree/develop/packages/hiccup)
- [@thi.ng/transducers](https://github.com/thi-ng/umbrella/tree/develop/packages/transducers)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                                           | Description                                                                      | Live demo                                                 | Source                                                                                 |
|:-------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------------------|:----------------------------------------------------------|:---------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/adaptive-threshold.png" width="240"/>            | Interactive image processing (adaptive threshold)                                | [Demo](https://demo.thi.ng/umbrella/adaptive-threshold/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/adaptive-threshold)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/bitmap-font.gif" width="240"/>                   | Figlet-style bitmap font creation with transducers                               | [Demo](https://demo.thi.ng/umbrella/bitmap-font/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/bitmap-font)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/crypto-chart.png" width="240"/>                  | Basic crypto-currency candle chart with multiple moving averages plots           | [Demo](https://demo.thi.ng/umbrella/crypto-chart/)        | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/crypto-chart)        |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/gesture-analysis.png" width="240"/>              | Mouse gesture / stroke analysis, simplification, corner detection                | [Demo](https://demo.thi.ng/umbrella/gesture-analysis/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/gesture-analysis)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/hdom-canvas-draw.jpg" width="240"/>              | Interactive pattern drawing demo using transducers                               | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-draw/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-draw)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/hdom-canvas/hdom-canvas-shapes-results.png" width="240"/> | Various hdom-canvas shape drawing examples & SVG conversion / export             | [Demo](https://demo.thi.ng/umbrella/hdom-canvas-shapes/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/hdom-canvas-shapes)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/imgui/imgui-all.png" width="240"/>                        | Canvas based Immediate Mode GUI components                                       | [Demo](https://demo.thi.ng/umbrella/imgui/)               | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/imgui)               |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/mandelbrot.jpg" width="240"/>                    | Worker based, interactive Mandelbrot visualization                               | [Demo](https://demo.thi.ng/umbrella/mandelbrot/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/mandelbrot)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/markdown-parser.jpg" width="240"/>               | Minimal Markdown to Hiccup to HTML parser / transformer                          | [Demo](https://demo.thi.ng/umbrella/markdown/)            | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/markdown)            |
|                                                                                                                                      | Basic rstream-gestures multi-touch demo                                          | [Demo](https://demo.thi.ng/umbrella/multitouch/)          | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/multitouch)          |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/poly-spline.png" width="240"/>                   | Polygon to cubic curve conversion & visualization                                | [Demo](https://demo.thi.ng/umbrella/poly-spline/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/poly-spline)         |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rotating-voronoi.jpg" width="240"/>              | Animated Voronoi diagram, cubic splines & SVG download                           | [Demo](https://demo.thi.ng/umbrella/rotating-voronoi/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rotating-voronoi)    |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-event-loop.png" width="240"/>            | Minimal demo of using rstream constructs to form an interceptor-style event loop | [Demo](https://demo.thi.ng/umbrella/rstream-event-loop/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-event-loop)  |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/rstream-spreadsheet.png" width="240"/>           | rstream based spreadsheet w/ S-expression formula DSL                            | [Demo](https://demo.thi.ng/umbrella/rstream-spreadsheet/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-spreadsheet) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/talk-slides.png" width="240"/>                   | hdom based slide deck viewer & slides from my ClojureX 2018 keynote              | [Demo](https://demo.thi.ng/umbrella/talk-slides/)         | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/talk-slides)         |
|                                                                                                                                      | Transducer & rstream based hdom UI updates                                       | [Demo](https://demo.thi.ng/umbrella/transducers-hdom/)    | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/transducers-hdom)    |

## API

[Generated API docs](https://docs.thi.ng/umbrella/transducers-hdom/)

Code for the above linked [transducers-hdom](#transducers-hdom) example...

```ts
import * as rs from "@thi.ng/rstream";
import * as tx from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";

// root component function
const app = ({ ticks, clicks }) =>
    ["div",
        `${ticks} ticks and `,
        ["a",
            { href: "#", onclick: () => clickStream.next(0) },
            `${clicks} clicks`]
    ];

// click stream (click counter)
const clickStream = new rs.Stream().transform(tx.scan(tx.count(-1)));

// stream combinator
rs.sync({
    src: {
        ticks: rs.fromInterval(1000),
        clicks: clickStream,
    },
    reset: false,
}).transform(
    // transform into hdom component
    tx.map(app),
    // apply as DOM
    updateDOM({ root: document.body })
);

// kick off
clickStream.next(0);
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-transducers-hdom,
  title = "@thi.ng/transducers-hdom",
  author = "Karsten Schmidt",
  note = "https://thi.ng/transducers-hdom",
  year = 2018
}
```

## License

&copy; 2018 - 2021 Karsten Schmidt // Apache Software License 2.0

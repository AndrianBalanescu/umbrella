<!-- This file is generated - DO NOT EDIT! -->

# ![wasm-api-dom](https://media.thi.ng/umbrella/banners-20220914/thing-wasm-api-dom.svg?2d6e3998)

[![npm version](https://img.shields.io/npm/v/@thi.ng/wasm-api-dom.svg)](https://www.npmjs.com/package/@thi.ng/wasm-api-dom)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/wasm-api-dom.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Browser DOM bridge API for hybrid TypeScript & Zig applications. This is a support package for [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api).

## Status

**ALPHA** - bleeding edge / work-in-progress

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bwasm-api-dom%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/wasm-api-dom
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/wasm-api-dom"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```text
# with flag only for < v16
node --experimental-repl-await

> const wasmApiDom = await import("@thi.ng/wasm-api-dom");
```

Package sizes (gzipped, pre-treeshake): ESM: 2.13 KB

## Dependencies

- [@thi.ng/adapt-dpi](https://github.com/thi-ng/umbrella/tree/develop/packages/adapt-dpi)
- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/wasm-api](https://github.com/thi-ng/umbrella/tree/develop/packages/wasm-api)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                        | Description                                 | Live demo                                        | Source                                                                        |
|:------------------------------------------------------------------------------------------------------------------|:--------------------------------------------|:-------------------------------------------------|:------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/zig-canvas.png" width="240"/> | Zig-based DOM creation & canvas drawing app | [Demo](https://demo.thi.ng/umbrella/zig-canvas/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/zig-canvas) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/wasm-api-dom/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-wasm-api-dom,
  title = "@thi.ng/wasm-api-dom",
  author = "Karsten Schmidt",
  note = "https://thi.ng/wasm-api-dom",
  year = 2022
}
```

## License

&copy; 2022 Karsten Schmidt // Apache Software License 2.0

<!-- This file is generated - DO NOT EDIT! -->

# ![range-coder](https://media.thi.ng/umbrella/banners/thing-range-coder.svg?c1c2b462)

[![npm version](https://img.shields.io/npm/v/@thi.ng/range-coder.svg)](https://www.npmjs.com/package/@thi.ng/range-coder)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/range-coder.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Authors](#authors)
- [License](#license)

## About

Binary range encoder / decoder, based on [Java implementation
by Joe Halliwell](https://www.winterwell.com/software/compressor.php).

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Brange-coder%5D+in%3Atitle)

### Related packages

- [@thi.ng/bitstream](https://github.com/thi-ng/umbrella/tree/develop/packages/bitstream) - ES6 iterator based read/write bit streams with support for variable word widths
- [@thi.ng/rle-pack](https://github.com/thi-ng/umbrella/tree/develop/packages/rle-pack) - Binary run-length encoding packer w/ flexible repeat bit widths

## Installation

```bash
yarn add @thi.ng/range-coder
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/range-coder"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const rangeCoder = await import("@thi.ng/range-coder");
```

Package sizes (gzipped, pre-treeshake): ESM: 670 bytes

## Dependencies

- [@thi.ng/bitstream](https://github.com/thi-ng/umbrella/tree/develop/packages/bitstream)

## API

[Generated API docs](https://docs.thi.ng/umbrella/range-coder/)

```ts
import * as rc "@thi.ng/range-coder";

// prepare dummy data
src = new Uint8Array(1024);
src.set([1,1,1,1,1,2,2,2,2,3,3,3,4,4,5,4,4,3,3,3,2,2,2,2,1,1,1,1,1], 512);

// pack data
packed = rc.encodeBytes(src);

packed.length
// 146

packed.length/src.length
// 0.142578125

// unpack
dest = rc.decodeBytes(packed);
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-range-coder,
  title = "@thi.ng/range-coder",
  author = "Karsten Schmidt",
  note = "https://thi.ng/range-coder",
  year = 2017
}
```

## License

&copy; 2017 - 2021 Karsten Schmidt // Apache Software License 2.0

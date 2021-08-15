<!-- This file is generated - DO NOT EDIT! -->

# ![adjacency](https://media.thi.ng/umbrella/banners/thing-adjacency.svg?48d8da32)

[![npm version](https://img.shields.io/npm/v/@thi.ng/adjacency.svg)](https://www.npmjs.com/package/@thi.ng/adjacency)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/adjacency.svg)
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

Sparse & bitwise adjacency matrices and related functions for directed & undirected graphs.

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Badjacency%5D+in%3Atitle)

### Related packages

- [@thi.ng/dgraph](https://github.com/thi-ng/umbrella/tree/develop/packages/dgraph) - Type-agnostic directed acyclic graph (DAG) & graph operations

## Installation

```bash
yarn add @thi.ng/adjacency
```

```html
// ES module
<script type="module" src="https://unpkg.com/@thi.ng/adjacency?module" crossorigin></script>

// UMD
<script src="https://unpkg.com/@thi.ng/adjacency/lib/index.umd.js" crossorigin></script>
```

Package sizes (gzipped, pre-treeshake): ESM: 2.31 KB / CJS: 2.40 KB / UMD: 2.46 KB

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/arrays](https://github.com/thi-ng/umbrella/tree/develop/packages/arrays)
- [@thi.ng/bitfield](https://github.com/thi-ng/umbrella/tree/develop/packages/bitfield)
- [@thi.ng/dcons](https://github.com/thi-ng/umbrella/tree/develop/packages/dcons)
- [@thi.ng/errors](https://github.com/thi-ng/umbrella/tree/develop/packages/errors)
- [@thi.ng/sparse](https://github.com/thi-ng/umbrella/tree/develop/packages/sparse)

## Usage examples

Several demos in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package.

A selection:

| Screenshot                                                                                                              | Description                                                                      | Live demo                                              | Source                                                                              |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/geom-voronoi-mst.jpg" width="240"/> | Poisson-disk shape-aware sampling, Voronoi & Minimum Spanning Tree visualization | [Demo](https://demo.thi.ng/umbrella/geom-voronoi-mst/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/geom-voronoi-mst) |

## API

[Generated API docs](https://docs.thi.ng/umbrella/adjacency/)

TODO

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-adjacency,
  title = "@thi.ng/adjacency",
  author = "Karsten Schmidt",
  note = "https://thi.ng/adjacency",
  year = 2018
}
```

## License

&copy; 2018 - 2021 Karsten Schmidt // Apache Software License 2.0

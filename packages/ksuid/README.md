<!-- This file is generated - DO NOT EDIT! -->

# ![ksuid](https://media.thi.ng/umbrella/banners/thing-ksuid.svg?451df049)

[![npm version](https://img.shields.io/npm/v/@thi.ng/ksuid.svg)](https://www.npmjs.com/package/@thi.ng/ksuid)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/ksuid.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

- [About](#about)
  - [Status](#status)
  - [Related packages](#related-packages)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [API](#api)
- [Benchmarks](#benchmarks)
- [Authors](#authors)
- [License](#license)

## About

Configurable K-sortable unique IDs, ULIDs, binary & base-N encoded, 32/48/64bit time resolutions.

Idea based on [segmentio/ksuid](https://github.com/segmentio/ksuid), though the
added flexibility in terms of configuration & implementation also enables the
creation of [ULIDs](https://github.com/ulid/spec):

| Feature                               | KSUID default          | ULID default           |
|---------------------------------------|------------------------|------------------------|
| Configurable bit size                 | 160 bits               | 128 bits               |
| Base-N encoding scheme                | base62<sup>(1)</sup>   | base32 (Crockford)     |
| Timestamp resolution                  | seconds (32 bits)      | milliseconds (48 bits) |
|                                       | milliseconds (64 bits) |                        |
| Epoch start time offset               | approx. 2020-09-13     | none                   |
| Time-only base ID generation          | ✅                      | ✅                      |
| ID parsing / decomposition            | ✅                      | ✅                      |
| Configurable RNG source<sup>(2)</sup> | ✅                      | ✅                      |

- <sup>(1)</sup> See
  [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n)
  for alternatives
- <sup>(2)</sup> Default: `window.crypto`, `Math.random` as fallback

IDs generated w/ this package are composed of a 32, 48 or 64 bit Unix epochs (by
default time shifted to free up bits for future timestamps) and N additional
bits of a random payload (from a configurable source). IDs can be generated as
byte arrays or base-N encoded strings. For the latter, the JS runtime MUST
support
[`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).

![KSUID bit layout diagram](https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/ksuid/ksuid.png)

### Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bksuid%5D+in%3Atitle)

### Related packages

- [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n) - Arbitrary base-n conversions w/ presets for base16/32/36/58/62/64/85, support for arrays & bigints
- [@thi.ng/idgen](https://github.com/thi-ng/umbrella/tree/develop/packages/idgen) - Generator of opaque numeric identifiers with optional support for ID versioning and efficient re-use
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random) - Pseudo-random number generators w/ unified API, distributions, weighted choices, ID generation

## Installation

```bash
yarn add @thi.ng/ksuid
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/ksuid"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For NodeJS (v14.6+):

```text
node --experimental-specifier-resolution=node --experimental-repl-await

> const ksuid = await import("@thi.ng/ksuid");
```

Package sizes (gzipped, pre-treeshake): ESM: 812 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)
- [@thi.ng/base-n](https://github.com/thi-ng/umbrella/tree/develop/packages/base-n)
- [@thi.ng/random](https://github.com/thi-ng/umbrella/tree/develop/packages/random)
- [@thi.ng/strings](https://github.com/thi-ng/umbrella/tree/develop/packages/strings)

## API

[Generated API docs](https://docs.thi.ng/umbrella/ksuid/)

```ts
import { defKSUID32, defKSUID64, defULID } from "@thi.ng/ksuid";

// init 32bit epoch (resolution: seconds) w/ defaults
const id = defKSUID32();
// init 64bit epoch (resolution: milliseconds), same API
const id = defKSUID64();
// init 48bit epoch (resolution: milliseconds), same API
const id = defULID();

id.next();
// '05XCWbXa3akRqLDBUw4ogCVKGkd'

const a = id.nextBinary()
// Uint8Array(20) [
//     0, 160,  48, 77, 101, 251,
//   244,  17, 155, 97,  24, 101,
//    70,  71, 207, 23,  32,  21,
//   244, 116
// ]

// format a binary KSUID
id.format(a);
// '05XCZ32AaDZfZt0SWE2C22o6cqK'

id.parse("05XCZ32AaDZfZt0SWE2C22o6cqK")
// {
//   epoch: 1610498125000,
//   id: Uint8Array(16) [
//     101, 251, 244,  17, 155, 97,
//      24, 101,  70,  71, 207, 23,
//      32,  21, 244, 116
//   ]
// }

new Date(1610498125000).toISOString()
// '2021-01-13T00:35:25.000Z'
```

Creating custom IDs:

```ts
import { BASE36 } from "@thi.ng/base-n";

// no time shift, 64bit random
const id36 = defKSUID32({ base: BASE36, epoch: 0, bytes: 8 });
// '2VOUKH4K59AG0RXR4XH'
```

## Benchmarks

```text
yarn bench

benchmarking: b62, 128bit, n=10000
        warmup... 659.22ms (10 runs)
        executing...
        total: 6402.18ms, runs: 100
        mean: 64.02ms, median: 63.50ms, range: [59.98..96.15]
        q1: 62.64ms, q3: 64.41ms
        sd: 6.93%
benchmarking: b62, 64bit, n=10000
        warmup... 363.35ms (10 runs)
        executing...
        total: 3469.28ms, runs: 100
        mean: 34.69ms, median: 34.41ms, range: [32.61..56.58]
        q1: 33.35ms, q3: 35.41ms
        sd: 7.47%
benchmarking: b62, 32bit, n=10000
        warmup... 218.78ms (10 runs)
        executing...
        total: 2118.93ms, runs: 100
        mean: 21.19ms, median: 20.95ms, range: [20.20..25.74]
        q1: 20.71ms, q3: 21.30ms
        sd: 4.14%
```

## Authors

Karsten Schmidt

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-ksuid,
  title = "@thi.ng/ksuid",
  author = "Karsten Schmidt",
  note = "https://thi.ng/ksuid",
  year = 2020
}
```

## License

&copy; 2020 - 2021 Karsten Schmidt // Apache Software License 2.0

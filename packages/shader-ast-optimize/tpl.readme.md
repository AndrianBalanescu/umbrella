# ${pkg.banner}

[![npm version](https://img.shields.io/npm/v/${pkg.name}.svg)](https://www.npmjs.com/package/${pkg.name})
![npm downloads](https://img.shields.io/npm/dm/${pkg.name}.svg)
[![Twitter Follow](https://img.shields.io/twitter/follow/thing_umbrella.svg?style=flat-square&label=twitter)](https://twitter.com/thing_umbrella)

This project is part of the
[@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo.

<!-- TOC -->

## About

${pkg.description}

### Tree optimizations

Currently, only the following operations are supported / considered:

#### Constant folding

- scalar math operators
- scalar math built-in functions
- single component vector swizzling
- literal hoisting

```ts
import { $x, $y, add, defn, float, mul, neg, ret } from "@thi.ng/shader-ast";
import { targetGLSL } from "@thi.ng/shader-ast-glsl";
import { constantFolding } from "@thi.ng/shader-ast-optimize";

const foo = defn("float", "foo", ["float"], (x) => [
  ret(mul(x, add(neg(float(10)), float(42))))
]);

const bar = vec2(100, 200);

const prog = scope([
  foo,
  foo(add(float(1), float(2))),
  foo(add($x(bar), $y(bar)))
], true);

const glsl = targetGLSL();

// unoptimized AST as GLSL (see section above)
glsl(prog);

// float foo(in float _sym0) {
//   return (_sym0 * (-10.0 + 42.0));
// };
// foo((1.0 + 2.0));
// foo((vec2(100.0, 200.0).x + vec2(100.0, 200.0).y));

// same tree after constant folding optimizations
glsl(constantFolding(prog))

// float foo(in float _sym0) {
//   return (_sym0 * 32.0);
// };
// foo(3.0);
// foo(300.0);

const expr = mul(float(4), $x(vec2(2)))

glsl(expr)
// (4.0 * vec2(2.0).x)

glsl(constantFolding(expr))
// 8.0
```

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

TODO

## Authors

${authors}

${pkg.cite}

## License

&copy; ${copyright} // ${license}

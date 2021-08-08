# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.0.48](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.47...@thi.ng/dlogic@1.0.48) (2021-08-08)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.47](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.46...@thi.ng/dlogic@1.0.47) (2021-08-08)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.46](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.45...@thi.ng/dlogic@1.0.46) (2021-08-04)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.45](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.44...@thi.ng/dlogic@1.0.45) (2021-07-01)

**Note:** Version bump only for package @thi.ng/dlogic





## [1.0.44](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@1.0.43...@thi.ng/dlogic@1.0.44) (2021-06-08)

**Note:** Version bump only for package @thi.ng/dlogic





# [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/dlogic@0.1.2...@thi.ng/dlogic@1.0.0) (2019-01-21)

### Build System

* update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))

### BREAKING CHANGES

* enabled multi-outputs (ES6 modules, CJS, UMD)

- build scripts now first build ES6 modules in package root, then call
  `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
- all imports MUST be updated to only refer to package level
  (not individual files anymore). tree shaking in user land will get rid of
  all unused imported symbols.

# 0.1.0 (2018-10-17)

### Features

* **dlogic:** add [@thi](https://github.com/thi).ng/dlogic package ([405cf51](https://github.com/thi-ng/umbrella/commit/405cf51))

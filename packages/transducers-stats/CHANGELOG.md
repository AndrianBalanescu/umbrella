# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@2.0.3...@thi.ng/transducers-stats@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/transducers-stats





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@2.0.2...@thi.ng/transducers-stats@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/transducers-stats





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@2.0.1...@thi.ng/transducers-stats@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/transducers-stats





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@2.0.0...@thi.ng/transducers-stats@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/transducers-stats





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@1.1.74...@thi.ng/transducers-stats@2.0.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### BREAKING CHANGES

* discontinue CommonJS & UMD versions

- only ESM modules will be published from now on
- CJS obsolete due to ESM support in recent versions of node:
  - i.e. launch NodeJS via:
  - `node --experimental-specifier-resolution=node --experimental-repl-await`
  - in the node REPL use `await import(...)` instead of `require()`
- UMD obsolete due to widespread browser support for ESM

Also:
- normalize/restructure/reorg all package.json files
- cleanup all build scripts, remove obsolete
- switch from mocha to @thi.ng/testament for all tests






#  [1.1.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@1.0.19...@thi.ng/transducers-stats@1.1.0) (2019-07-07) 

###  Features 

- **transducers-stats:** enable TS strict compiler flags (refactor) ([33daa7f](https://github.com/thi-ng/umbrella/commit/33daa7f)) 

#  [1.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.4.23...@thi.ng/transducers-stats@1.0.0) (2019-01-21) 

###  Build System 

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703)) 

###  BREAKING CHANGES 

- enabled multi-outputs (ES6 modules, CJS, UMD) 
- build scripts now first build ES6 modules in package root, then call   `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib` 
- all imports MUST be updated to only refer to package level   (not individual files anymore). tree shaking in user land will get rid of   all unused imported symbols. 

#  [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.3.4...@thi.ng/transducers-stats@0.4.0) (2018-08-24) 

###  Features 

- **transducers-stats:** make xforms iterable if input given ([c9ac981](https://github.com/thi-ng/umbrella/commit/c9ac981)) 

##  [0.3.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.3.3...@thi.ng/transducers-stats@0.3.4) (2018-08-08) 

##  [0.3.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.3.0...@thi.ng/transducers-stats@0.3.1) (2018-07-25) 

###  Bug Fixes 

- **transducers-stats:** fix naming of MACD results ([#31](https://github.com/thi-ng/umbrella/issues/31)) ([a322e00](https://github.com/thi-ng/umbrella/commit/a322e00)) 

#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.2.0...@thi.ng/transducers-stats@0.3.0) (2018-07-25) 

###  Features 

- **transducers-stats:** add BollingerBand value interface ([c97cb75](https://github.com/thi-ng/umbrella/commit/c97cb75)) 
- **transducers-stats:** add MACD (fixes [#31](https://github.com/thi-ng/umbrella/issues/31)) ([b92aaa5](https://github.com/thi-ng/umbrella/commit/b92aaa5)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/transducers-stats@0.1.0...@thi.ng/transducers-stats@0.2.0) (2018-07-21) 

###  Features 

- **transducers-stats:** add stochastic oscillator, refactor ([0b0a7ca](https://github.com/thi-ng/umbrella/commit/0b0a7ca)) 

#  0.1.0 (2018-07-20) 

###  Features 

- **transducers-stats:** add [@thi](https://github.com/thi).ng/transducers-stats package ([7a5812f](https://github.com/thi-ng/umbrella/commit/7a5812f)) 
- **transducers-stats:** add other xforms ([7df3ce0](https://github.com/thi-ng/umbrella/commit/7df3ce0))

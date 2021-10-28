# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.6](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log-file@2.0.5...@thi.ng/rstream-log-file@2.0.6) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rstream-log-file





## [2.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log-file@2.0.4...@thi.ng/rstream-log-file@2.0.5) (2021-10-28)

**Note:** Version bump only for package @thi.ng/rstream-log-file





## [2.0.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log-file@2.0.3...@thi.ng/rstream-log-file@2.0.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/rstream-log-file





## [2.0.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log-file@2.0.2...@thi.ng/rstream-log-file@2.0.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rstream-log-file





## [2.0.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log-file@2.0.1...@thi.ng/rstream-log-file@2.0.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/rstream-log-file





## [2.0.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log-file@2.0.0...@thi.ng/rstream-log-file@2.0.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/rstream-log-file





# [2.0.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log-file@1.0.6...@thi.ng/rstream-log-file@2.0.0) (2021-10-12)


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






##  [1.0.5](https://github.com/thi-ng/umbrella/compare/@thi.ng/rstream-log-file@1.0.4...@thi.ng/rstream-log-file@1.0.5) (2021-08-22) 

**Note:** Version bump only for package @thi.ng/rstream-log-file 

#  0.1.0 (2019-03-19) 

###  Features 

- **rstream-log-file:** extract as new pkg from rstream-log ([7b76b37](https://github.com/thi-ng/umbrella/commit/7b76b37))

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.4](https://github.com/thi-ng/umbrella/compare/@thi.ng/markdown-table@0.2.3...@thi.ng/markdown-table@0.2.4) (2021-10-25)

**Note:** Version bump only for package @thi.ng/markdown-table





## [0.2.3](https://github.com/thi-ng/umbrella/compare/@thi.ng/markdown-table@0.2.2...@thi.ng/markdown-table@0.2.3) (2021-10-15)

**Note:** Version bump only for package @thi.ng/markdown-table





## [0.2.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/markdown-table@0.2.1...@thi.ng/markdown-table@0.2.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/markdown-table





## [0.2.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/markdown-table@0.2.0...@thi.ng/markdown-table@0.2.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/markdown-table





# [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/markdown-table@0.1.1...@thi.ng/markdown-table@0.2.0) (2021-10-12)


### Build System

* major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea9fab2a645d6c5f2bf2591459b939c09b6))


### Features

* **markdown-table:** allow fn keys for tableKeys() ([984ef8c](https://github.com/thi-ng/umbrella/commit/984ef8c85b7c20ceb1c798b48364bfb6f07d933d))


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






##  [0.1.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/markdown-table@0.1.0...@thi.ng/markdown-table@0.1.1) (2021-09-03) 

**Note:** Version bump only for package @thi.ng/markdown-table 

#  0.1.0 (2021-08-24) 

###  Features 

- **markdown-table:** import as new pkg ([4c8597e](https://github.com/thi-ng/umbrella/commit/4c8597ef271d5ccbd69e01b8abae3b0fa18e3ee3))

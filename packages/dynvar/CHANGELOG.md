# Change Log

- **Last updated**: 2023-02-10T14:03:10Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dynvar@0.3.0) (2021-11-17)

#### 🚀 Features

- Using workspaces for local tools ([bf7a404](https://github.com/thi-ng/umbrella/commit/bf7a404))
  Improving the overall build ergonomics
  - introduced a tools workspaces
  - imported it in all needed packages/examples
  - inclusive project root

#### ♻️ Refactoring

- testrunner to binary ([4ebbbb2](https://github.com/thi-ng/umbrella/commit/4ebbbb2))
  this commit reverts (partly) changes made in:
  ef346d7a8753590dc9094108a3d861a8dbd5dd2c
  overall purpose is better testament ergonomics:
  instead of having to pass NODE_OPTIONS with every invocation
  having a binary to handle this for us.

### [0.2.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/dynvar@0.2.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dynvar@0.2.0) (2021-10-12)

#### 🛑 Breaking changes

- major update of ALL pkgs (export maps, ESM only) ([0d1d6ea](https://github.com/thi-ng/umbrella/commit/0d1d6ea))
- BREAKING CHANGE: discontinue CommonJS & UMD versions
  - only ESM modules will be published from now on
  - CJS obsolete due to ESM support in recent versions of node:
    - i.e. launch NodeJS via:
    - `node --experimental-specifier-resolution=node --experimental-repl-await`
    - in the node REPL use `await import(...)` instead of `require()`
  - UMD obsolete due to widespread browser support for ESM
  Also:
  - normalize/restructure/reorg all package.json files
  - cleanup all build scripts, remove obsolete
  - switch from mocha to [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament) for all tests

#### ♻️ Refactoring

- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)
- update imports ([26b0298](https://github.com/thi-ng/umbrella/commit/26b0298))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger

### [0.1.23](https://github.com/thi-ng/umbrella/tree/@thi.ng/dynvar@0.1.23) (2020-09-13)

#### ♻️ Refactoring

- update imports ([6066de1](https://github.com/thi-ng/umbrella/commit/6066de1))

### [0.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/dynvar@0.1.2) (2020-02-25)

#### ♻️ Refactoring

- update imports ([db4dbad](https://github.com/thi-ng/umbrella/commit/db4dbad))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/dynvar@0.1.0) (2020-01-24)

#### 🚀 Features

- re-import & refactor as own pkg (MBP2010) ([0fabb57](https://github.com/thi-ng/umbrella/commit/0fabb57))

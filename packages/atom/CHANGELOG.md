# Change Log

- **Last updated**: 2022-07-19T15:36:12Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [5.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@5.1.0) (2021-11-17)

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

### [5.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@5.0.1) (2021-10-13)

#### ♻️ Refactoring

- update imports in all tests/pkgs ([effd591](https://github.com/thi-ng/umbrella/commit/effd591))
- update imports in all pkgs ([5fa2b6f](https://github.com/thi-ng/umbrella/commit/5fa2b6f))
  - add .js suffix for all relative imports

# [5.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@5.0.0) (2021-10-12)

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

- minor pkg restructure (various) ([47f88d2](https://github.com/thi-ng/umbrella/commit/47f88d2))
- update deps & imports in various pkgs ([e1cf29e](https://github.com/thi-ng/umbrella/commit/e1cf29e))
  - largely related to recent updates/restructuring of these packages:
    - api
    - defmulti
    - errors
    - logger
- update imports ([abe1675](https://github.com/thi-ng/umbrella/commit/abe1675))
- update all tests in _all_ pkgs ([8b582bc](https://github.com/thi-ng/umbrella/commit/8b582bc))
  - update all to use [@thi.ng/testament](https://github.com/thi-ng/umbrella/tree/main/packages/testament)

### [4.1.36](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@4.1.36) (2021-06-08)

#### ♻️ Refactoring

- add missing type hints (TS4.3) ([40459bf](https://github.com/thi-ng/umbrella/commit/40459bf))

### [4.1.24](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@4.1.24) (2020-12-07)

#### ♻️ Refactoring

- update type-only imports ([f1cee05](https://github.com/thi-ng/umbrella/commit/f1cee05))

### [4.1.20](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@4.1.20) (2020-09-13)

#### ♻️ Refactoring

- update imports ([78625d7](https://github.com/thi-ng/umbrella/commit/78625d7))
- update imports, use new Fn types in various pkgs ([ced1e5d](https://github.com/thi-ng/umbrella/commit/ced1e5d))

### [4.1.19](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@4.1.19) (2020-08-28)

#### ♻️ Refactoring

- update delete op (TS4.0) ([9c33410](https://github.com/thi-ng/umbrella/commit/9c33410))

## [4.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@4.1.0) (2020-04-01)

#### 🚀 Features

- protect Transacted against out-of-phase updates ([675a25b](https://github.com/thi-ng/umbrella/commit/675a25b))
  - add internal guard watch to throw error if parent
    is updated whilst active transaction
  - add `beginTransaction()`
  - add tests
  - update readme

# [4.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@4.0.0) (2020-03-28)

#### 🛑 Breaking changes

- update path value inference handling ([8c2aab2](https://github.com/thi-ng/umbrella/commit/8c2aab2))
- BREAKING CHANGE: update IReset, ISwap, SwapFn generics
  - use PathVal & OptPathVal for value type inference
- update types, API for supporting type-checked & unchecked paths ([82948b8](https://github.com/thi-ng/umbrella/commit/82948b8))
- BREAKING CHANGE: update types, API for supporting type-checked & unchecked paths
  - support path type checking for upto 8 levels (before falling back to `any`)
  - update `resetIn()` / `swapIn()` impls in all types to expect type-checked paths
  - add `resetInUnsafe()` / `swapInUnsafe()` for string-based / unchecked paths
  - remove support for non-atom-like Cursor parent states
  - simplify Cursor ctor
  - remove `IViewable` interface and `.addView()` impls (use `defView()` instead)
  - remove `ViewTransform` type alias
  - add factory fns for typed paths:
    - defAtom()
    - defCursor()
    - defHistory()
    - defTransacted()
    - defView()
  - add factory fns for untyped paths:
    - defCursorUnsafe()
    - defViewUnsafe()
- add typechecking for resetIn(), swapIn() impls ([f114e10](https://github.com/thi-ng/umbrella/commit/f114e10))
- BREAKING CHANGE: add typechecking for resetIn(), swapIn() impls
  The more stricter method signatures **could** lead to breaking changes
  in more lax existing code bases

#### 🩹 Bug fixes

- fix defViewUnsafe() type inference ([bb5593a](https://github.com/thi-ng/umbrella/commit/bb5593a))

#### ♻️ Refactoring

- update all to new [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/main/packages/paths) API ([016b5fe](https://github.com/thi-ng/umbrella/commit/016b5fe))
- simplify API & impls using new path types, fix View type inference ([b016378](https://github.com/thi-ng/umbrella/commit/b016378))

### [3.1.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@3.1.5) (2020-02-25)

#### ♻️ Refactoring

- update imports ([eb47092](https://github.com/thi-ng/umbrella/commit/eb47092))

### [3.1.3](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@3.1.3) (2020-01-24)

#### ♻️ Refactoring

- minor update IHistory (add IClear) ([3efaefb](https://github.com/thi-ng/umbrella/commit/3efaefb))

### [3.1.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@3.1.2) (2019-11-30)

#### ♻️ Refactoring

- re-use `Path` from [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) ([5476fc9](https://github.com/thi-ng/umbrella/commit/5476fc9))

## [3.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@3.1.0) (2019-09-21)

#### 🚀 Features

- update Transacted watch ID handling, update tests, readme ([93d9e1d](https://github.com/thi-ng/umbrella/commit/93d9e1d))
- add Transacted wrapper & tests ([8aaf6e6](https://github.com/thi-ng/umbrella/commit/8aaf6e6))

# [3.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@3.0.0) (2019-07-07)

#### 🛑 Breaking changes

- TS strictNullChecks ([493ea57](https://github.com/thi-ng/umbrella/commit/493ea57))
- BREAKING CHANGE: IView & IHistory methods can return undefined
  - Atom ctor requires an initial state now

#### 🚀 Features

- enable TS strict compiler flags (refactor) ([c5d2853](https://github.com/thi-ng/umbrella/commit/c5d2853))

### [2.0.5](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@2.0.5) (2019-03-10)

#### ♻️ Refactoring

- update Fn args in various packages ([e453ac3](https://github.com/thi-ng/umbrella/commit/e453ac3))

# [2.0.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@2.0.0) (2019-01-21)

#### 🛑 Breaking changes

- update package build scripts & outputs, imports in ~50 packages ([b54b703](https://github.com/thi-ng/umbrella/commit/b54b703))
- BREAKING CHANGE: enabled multi-outputs (ES6 modules, CJS, UMD)
  - build scripts now first build ES6 modules in package root, then call
    `scripts/bundle-module` to build minified CJS & UMD bundles in `/lib`
  - all imports MUST be updated to only refer to package level
    (not individual files anymore). tree shaking in user land will get rid of
    all unused imported symbols.

### [1.5.3-alpha.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@1.5.3-alpha.1) (2018-09-17)

#### 🩹 Bug fixes

- add .value getter to IView ([3e647a1](https://github.com/thi-ng/umbrella/commit/3e647a1))

## [1.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@1.5.0) (2018-08-27)

#### 🚀 Features

- add .value accessor aliases (for deref()/reset()) ([a0cbd2b](https://github.com/thi-ng/umbrella/commit/a0cbd2b))

## [1.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@1.4.0) (2018-05-30)

#### 🚀 Features

- provide prev/curr states to history event listeners ([7ac6227](https://github.com/thi-ng/umbrella/commit/7ac6227))
  - update undo()/redo() event value
    (now an object w/ `prev`/`curr` keys/states)
  - refactor/fix record(), only expunge history and truncate future
    if actually recording new state
- add INotify impl for History ([9422598](https://github.com/thi-ng/umbrella/commit/9422598))
  - add EVENT_UNDO/REDO/RECORD events
  - emit events from `undo()`, `redo()`, `record()`

### [1.3.8](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@1.3.8) (2018-05-10)

#### ♻️ Refactoring

- update deps & imports in all packages due to [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api) split ([bc45636](https://github.com/thi-ng/umbrella/commit/bc45636))

## [1.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@1.3.0) (2018-04-15)

#### 🚀 Features

- update History.record(), add IHistory interface ([cf42260](https://github.com/thi-ng/umbrella/commit/cf42260))
  - check changed() from record() if called without arg
  - add IHistory for alt implementations

## [1.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@1.2.0) (2018-03-21)

#### 🚀 Features

- consider parent validators in History update fns ([d93940a](https://github.com/thi-ng/umbrella/commit/d93940a))
- add CursorOpts and cursor validation, update ctor, add tests ([3b1d563](https://github.com/thi-ng/umbrella/commit/3b1d563))
- add optional validation predicate for Atom, add tests ([bae1647](https://github.com/thi-ng/umbrella/commit/bae1647))

#### ♻️ Refactoring

- update error handling ([ea7b175](https://github.com/thi-ng/umbrella/commit/ea7b175))

## [1.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@1.1.0) (2018-03-18)

#### 🚀 Features

- add optional support for eager views, update tests/readme ([c0ec274](https://github.com/thi-ng/umbrella/commit/c0ec274))

### [1.0.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@1.0.1) (2018-03-17)

#### 🛑 Breaking changes

- extract [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/main/packages/paths) & [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/main/packages/interceptors) functionality ([1273efb](https://github.com/thi-ng/umbrella/commit/1273efb))
  - delete obsolete sources
  - update deps
- BREAKING CHANGE: extract [@thi.ng/paths](https://github.com/thi-ng/umbrella/tree/main/packages/paths) & [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/main/packages/interceptors) functionality

## [0.13.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.13.0) (2018-03-16)

#### 🚀 Features

- add forwardSideFx() interceptor ([357c46e](https://github.com/thi-ng/umbrella/commit/357c46e))
- add FX_FETCH & FX_DELAY sidefx impl, update docs ([e52e7e5](https://github.com/thi-ng/umbrella/commit/e52e7e5))

### [0.12.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.12.1) (2018-03-11)

#### 🩹 Bug fixes

- ignore side fx with null values ([0ca0bf3](https://github.com/thi-ng/umbrella/commit/0ca0bf3))

## [0.12.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.12.0) (2018-03-09)

#### 🚀 Features

- add/extract StatelessEventBus ([3fae249](https://github.com/thi-ng/umbrella/commit/3fae249))
- update EventBus ctor, add deref() ([667691c](https://github.com/thi-ng/umbrella/commit/667691c))
- add IRelease impls ([9b3d91e](https://github.com/thi-ng/umbrella/commit/9b3d91e))
  - add IRelease to ReadonlyAtom
  - implement IRelease for Atom, Cursor, History, View

#### 🩹 Bug fixes

- add interceptors to re-exports ([59085e0](https://github.com/thi-ng/umbrella/commit/59085e0))

#### ♻️ Refactoring

- minor update event bus, add/update docs ([e96cc99](https://github.com/thi-ng/umbrella/commit/e96cc99))

## [0.11.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.11.0) (2018-03-09)

#### 🚀 Features

- add valueSetter/Updater() interceptors ([359c4f5](https://github.com/thi-ng/umbrella/commit/359c4f5))
- add default handlers, add/rename event/fx const values, add checks ([1fd43d7](https://github.com/thi-ng/umbrella/commit/1fd43d7))
  - add EV_SET_VALUE & EV_UPDATE_VALUE event handlers
  - add prefixes to built-in event/fx ID values to avoid name clashes w/ user IDs
  - refactor EventBus, add addBuiltIns()
  - display warnings if overriding existing handler/effect

#### ♻️ Refactoring

- update InterceptorFn handling ([443875c](https://github.com/thi-ng/umbrella/commit/443875c))
  - remove InterceptorContext arg from InterceptorFn
  - add EventBus.context() to obtain current InterceptorContext (rarely needed)
  - update docs

## [0.10.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.10.0) (2018-03-08)

#### 🚀 Features

- add async dispatch effect, update event bus & api types ([56866e0](https://github.com/thi-ng/umbrella/commit/56866e0))
  - add FX_DISPATCH_ASYNC effect for promise based effect execution
  - pass event bus instance as opt arg to icep/fx functions
  - add support for multiple vals per sidefx returned from iceps
  - add IDispatch, move IViewable from IAtom to ReadonlyAtom
  - add InterceptorContext interface for better type safety of interceptor results
  - fix typo in FX_DISPATCH_NOW
  - add docs

### [0.9.2](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.9.2) (2018-03-08)

#### 🩹 Bug fixes

- add EventBus to module re-exports, minor cleanup ([9e5239b](https://github.com/thi-ng/umbrella/commit/9e5239b))

### [0.9.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.9.1) (2018-03-07)

#### ♻️ Refactoring

- update InterceptorFn, ensureXXX(), update deps, add docs ([1ab803a](https://github.com/thi-ng/umbrella/commit/1ab803a))
  - pass collected sidefx obj to interceptors (as opt last arg), adv. use only
  - make EventDef/EffectDef type decl more flexible
  - add path extractor arg for ensureLessThan/GreaterThan()
  - remove DCons dep (again), update priority sorting
  - add various doc strings

## [0.9.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.9.0) (2018-03-07)

#### 🚀 Features

- re-add refactored EventBus & interceptor handling ([e01bf73](https://github.com/thi-ng/umbrella/commit/e01bf73))
  - add new types, interfaces & consts to api.ts
  - add EventBus class
  - add existing interceptors (ensurePred() etc.)

## [0.8.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.8.0) (2018-03-05)

#### 🚀 Features

- update IAtom, add resetIn() & swapIn() impls ([a7e61a4](https://github.com/thi-ng/umbrella/commit/a7e61a4))

### [0.7.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.7.1) (2018-03-01)

#### 🩹 Bug fixes

- re-export api.ts ([3e55a05](https://github.com/thi-ng/umbrella/commit/3e55a05))

#### ♻️ Refactoring

- include `path` in IView ([341255c](https://github.com/thi-ng/umbrella/commit/341255c))

## [0.7.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.7.0) (2018-03-01)

#### 🚀 Features

- add IView, IViewable, impl for Atom, Cursor, History ([9ad83b2](https://github.com/thi-ng/umbrella/commit/9ad83b2))
  - update IAtom to include IViewable
  - update View & ViewTransform generics
- add View type to create derrived views/value subscriptions ([8c0c621](https://github.com/thi-ng/umbrella/commit/8c0c621))

#### ⏱ Performance improvements

- add optimized setter() for path len < 5, fix toPath() ([55c6a7d](https://github.com/thi-ng/umbrella/commit/55c6a7d))
  - treat empty string as zero-length path
- add optimized getters for path len < 5 ([ed23376](https://github.com/thi-ng/umbrella/commit/ed23376))
  - benchmark (len=4) now: 57ms vs 3150ms (55x faster!)

#### ♻️ Refactoring

- update Path type references ([a0ce6e7](https://github.com/thi-ng/umbrella/commit/a0ce6e7))

## [0.6.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.6.0) (2018-02-18)

#### 🚀 Features

- add deleteIn() ([b593a9b](https://github.com/thi-ng/umbrella/commit/b593a9b))
- add getIn/setIn/updateIn ([6f6e7e5](https://github.com/thi-ng/umbrella/commit/6f6e7e5))

#### 🩹 Bug fixes

- empty path handling getter/setter ([fbc819e](https://github.com/thi-ng/umbrella/commit/fbc819e))

#### ♻️ Refactoring

- update history reset/swap, record before applying val ([2e34f38](https://github.com/thi-ng/umbrella/commit/2e34f38))
- use [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/main/packages/api)/equiv as default History predicate ([b5ee8e4](https://github.com/thi-ng/umbrella/commit/b5ee8e4))
- don't mutate getter/setter path args, update updateIn ([398c32a](https://github.com/thi-ng/umbrella/commit/398c32a))

## [0.5.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.5.0) (2018-02-01)

#### 🚀 Features

- add History.canUndo/Redo() ([c5b6e0f](https://github.com/thi-ng/umbrella/commit/c5b6e0f))

#### 🩹 Bug fixes

- truncate redo stack in record(), swap() return type ([8218814](https://github.com/thi-ng/umbrella/commit/8218814))
- cursor swap() return type ([36cc956](https://github.com/thi-ng/umbrella/commit/36cc956))

## [0.4.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.4.0) (2018-01-31)

#### 🚀 Features

- add full IAtom impl for History, update tests ([5538362](https://github.com/thi-ng/umbrella/commit/5538362))

## [0.3.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.3.0) (2018-01-31)

#### 🚀 Features

- add IReset/ISwap impls for History ([e1b57de](https://github.com/thi-ng/umbrella/commit/e1b57de))
- add History, add/update tests ([035c51a](https://github.com/thi-ng/umbrella/commit/035c51a))

#### 🩹 Bug fixes

- cursor ctor arg checks ([282d989](https://github.com/thi-ng/umbrella/commit/282d989))

#### ♻️ Refactoring

- extract IReset, ISwap from IAtom ([74ecdf1](https://github.com/thi-ng/umbrella/commit/74ecdf1))

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.2.0) (2018-01-29)

#### 🚀 Features

- add nested path getter / setter compilers ([5dce8a2](https://github.com/thi-ng/umbrella/commit/5dce8a2))
  - update cursor ctor to also accept paths
  - update readme example

### [0.1.1](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.1.1) (2018-01-29)

#### 🩹 Bug fixes

- cursor IWatch impls (replace stubs) ([cca801b](https://github.com/thi-ng/umbrella/commit/cca801b))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/atom@0.1.0) (2018-01-29)

#### 🚀 Features

- add Cursor, update interfaces, types, readme ([04c3d59](https://github.com/thi-ng/umbrella/commit/04c3d59))
- re-import atom package from MBP2010, update main readme ([fefc283](https://github.com/thi-ng/umbrella/commit/fefc283))

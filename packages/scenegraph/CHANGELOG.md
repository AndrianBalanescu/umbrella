# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.4.2](https://github.com/thi-ng/umbrella/compare/@thi.ng/scenegraph@0.4.1...@thi.ng/scenegraph@0.4.2) (2021-10-15)

**Note:** Version bump only for package @thi.ng/scenegraph





## [0.4.1](https://github.com/thi-ng/umbrella/compare/@thi.ng/scenegraph@0.4.0...@thi.ng/scenegraph@0.4.1) (2021-10-13)

**Note:** Version bump only for package @thi.ng/scenegraph





# [0.4.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/scenegraph@0.3.43...@thi.ng/scenegraph@0.4.0) (2021-10-12)


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






#  [0.3.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/scenegraph@0.2.1...@thi.ng/scenegraph@0.3.0) (2020-07-28) 

###  Features 

- **scenegraph:** add ICopy impls for Node2/3 ([fd6ffdb](https://github.com/thi-ng/umbrella/commit/fd6ffdb531886e53711de77c2df00c447ea65448)) 

#  [0.2.0](https://github.com/thi-ng/umbrella/compare/@thi.ng/scenegraph@0.1.27...@thi.ng/scenegraph@0.2.0) (2020-07-17) 

###  Features 

- **scenegraph:** update `.toHiccuo()` impls, update .scale type ([2f0a3cc](https://github.com/thi-ng/umbrella/commit/2f0a3cc6286bf8492c74c4497f13fe300980c353)) 

#  0.1.0 (2019-11-30) 

###  Features 

- **scenegraph:** add global/local point mapping methods ([3906c4c](https://github.com/thi-ng/umbrella/commit/3906c4c68c541aa84bc407235c3fe3fdf3e2debe)) 
- **scenegraph:** add new package ([84d2a8b](https://github.com/thi-ng/umbrella/commit/84d2a8b96aeb7e8dd119be4fbc0c8c8277dc1990))

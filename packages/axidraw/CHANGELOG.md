# Change Log

- **Last updated**: 2022-12-10T14:04:38Z
- **Generator**: [thi.ng/monopub](https://thi.ng/monopub)

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org/) for commit guidelines.

**Note:** Unlisted _patch_ versions only involve non-code or otherwise excluded changes
and/or version bumps of transitive dependencies.

## [0.2.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@0.2.0) (2022-12-10)

#### 🚀 Features

- major updates/additions ([eb41c28](https://github.com/thi-ng/umbrella/commit/eb41c28))
  - extract polyline() as standalone fn
  - add complete() syntax sugar
  - update UP/DOWN commands to accept opt. pen level/position
  - add RESET command
  - extract various draw commands into separate methods, simplify draw()
  - update draw() w/ FSM to pause/resume/cancel processing
  - add AxiDrawState FSM enum
  - add AxiDrawControl class, use as default controller
  - update AxiDrawOpts w/ new options
  - update connect() to throw error if unsuccessful
  - add SIGINT signal handler to handle Ctrl+C
- update .draw() to auto-wrap command seq ([60aaad2](https://github.com/thi-ng/umbrella/commit/60aaad2))
- add PolylineOpts, update polyline() ([c8a271f](https://github.com/thi-ng/umbrella/commit/c8a271f))

#### 🩹 Bug fixes

- fix polyline(), only apply custom speed for drawing ([c43b6f5](https://github.com/thi-ng/umbrella/commit/c43b6f5))
- update draw calls to disable cmd wrapping ([4cd5e53](https://github.com/thi-ng/umbrella/commit/4cd5e53))
- fix waiting for start/stop/home commands ([42bf4eb](https://github.com/thi-ng/umbrella/commit/42bf4eb))

#### ⏱ Performance improvements

- remove obsolete UP command (and delay) in polyline() ([f71c64b](https://github.com/thi-ng/umbrella/commit/f71c64b))

## [0.1.0](https://github.com/thi-ng/umbrella/tree/@thi.ng/axidraw@0.1.0) (2022-12-06)

#### 🚀 Features

- import as new pkg ([cc43e84](https://github.com/thi-ng/umbrella/commit/cc43e84))
- arbitrary unit support, measure draw time ([32e3212](https://github.com/thi-ng/umbrella/commit/32e3212))
  - add AxiDrawOpts.unitsPerInch to support any worldspace units
  - remove paperSize opt
  - add command constants for better mem use
  - update AxiDraw.draw() to measure & return time taken
  - add/update doc strings

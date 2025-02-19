import { timedResult } from "@thi.ng/bench/timed";
import { hueRgb } from "@thi.ng/color/rgb/hue-rgb";
import type { FloatSym, Vec2Sym, Vec3Sym } from "@thi.ng/shader-ast";
import { renderPixels, targetJS } from "@thi.ng/shader-ast-js";
import { fogExp2 } from "@thi.ng/shader-ast-stdlib/fog/exp2";
import {
	diffuseLighting,
	halfLambert,
} from "@thi.ng/shader-ast-stdlib/light/lambert";
import { clamp01 } from "@thi.ng/shader-ast-stdlib/math/clamp";
import { fit1101 } from "@thi.ng/shader-ast-stdlib/math/fit";
import { lookat } from "@thi.ng/shader-ast-stdlib/matrix/lookat";
import { raymarchAO } from "@thi.ng/shader-ast-stdlib/raymarch/ao";
import { raymarchDir } from "@thi.ng/shader-ast-stdlib/raymarch/direction";
import { raymarchNormal } from "@thi.ng/shader-ast-stdlib/raymarch/normal";
import { rayPointAt } from "@thi.ng/shader-ast-stdlib/raymarch/point-at";
import { raymarchScene } from "@thi.ng/shader-ast-stdlib/raymarch/scene";
import { sdfBox3 } from "@thi.ng/shader-ast-stdlib/sdf/box";
import { sdfRepeat3 } from "@thi.ng/shader-ast-stdlib/sdf/repeat";
import { sdfSmoothUnion } from "@thi.ng/shader-ast-stdlib/sdf/smooth-union";
import { sdfSphere } from "@thi.ng/shader-ast-stdlib/sdf/sphere";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { ifThen } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { float, vec2, vec3, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { gte, mul } from "@thi.ng/shader-ast/ast/ops";
import { program } from "@thi.ng/shader-ast/ast/scope";
import { $x, $xyz } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { mix } from "@thi.ng/shader-ast/builtin/math";
import { sma } from "@thi.ng/transducers-stats/sma";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { normRange } from "@thi.ng/transducers/norm-range";
import { slidingWindow } from "@thi.ng/transducers/sliding-window";
import { step } from "@thi.ng/transducers/step";
import { NUM_WORKERS, type WorkerJob, type WorkerResult } from "./api";

// color table to tint each worker's region
const COLORS = [...map((i) => hueRgb([], i), normRange(NUM_WORKERS))];

// shader AST functions from the shader-ast-raymarch example
const scene = defn("vec2", "scene", ["vec3"], (pos) => {
	let d1: FloatSym;
	let d2: FloatSym;
	let d3: FloatSym;
	let d4: FloatSym;
	return [
		assign(pos, sdfRepeat3(pos, vec3(2.1))),
		(d1 = sym(sdfSphere(pos, float(0.5)))),
		(d2 = sym(sdfBox3(pos, vec3(1, 0.2, 0.2)))),
		(d3 = sym(sdfBox3(pos, vec3(0.2, 0.2, 1)))),
		(d4 = sym(sdfBox3(pos, vec3(0.2, 1, 0.2)))),
		ret(
			vec2(
				sdfSmoothUnion(
					sdfSmoothUnion(
						sdfSmoothUnion(d1, d2, float(0.2)),
						d3,
						float(0.2)
					),
					d4,
					float(0.2)
				),
				1
			)
		),
	];
});

// main fragment shader function
// again uses several shader-ast std lib helpers
// the only difference to the original example is the addition of the `tint`
// color param to uniquely color each worker's computed region
const mainImage = defn(
	"vec4",
	"mainImage",
	["vec2", "vec2", "vec3", "vec3", "vec3"],
	(frag, res, eyePos, lightDir, tint) => {
		let dir: Vec3Sym;
		let result: Vec2Sym;
		let isec: Vec3Sym;
		let norm: Vec3Sym;
		let material: Vec3Sym;
		let diffuse: FloatSym;
		// background color
		const bg = vec3(0.9);
		const ambient = vec3(0.15);
		return [
			// compute ray dir from fragCoord, viewport res and FOV
			// then apply basic camera settings (eye, target, up)
			(dir = sym(
				$xyz(
					mul(
						lookat(eyePos, vec3(), vec3(0, 1, 0)),
						vec4(raymarchDir(frag, res, float(120)), 0)
					)
				)
			)),
			// perform raymarch
			(result = sym(
				// `raymarchScene` is a higher-order, configurable function which constructs
				// a raymarch function using our supplied scene fn
				raymarchScene(scene, { steps: 80, eps: 0.005 })(eyePos, dir)
			)),
			// early bailout if nothing hit
			ifThen(gte($x(result), float(10)), [ret(vec4(mul(bg, tint), 1))]),
			// set intersection pos
			(isec = sym(rayPointAt(eyePos, dir, $x(result)))),
			// surface normal
			(norm = sym(
				// higher-order fn to compute surface normal
				raymarchNormal(scene)(isec, float(0.01))
			)),
			// set material color
			(material = sym(fit1101(isec))),
			// compute diffuse term
			(diffuse = sym(
				mul(
					halfLambert(norm, lightDir),
					// higher order fn to compute ambient occlusion
					raymarchAO(scene)(isec, norm)
				)
			)),
			// combine lighting & material colors
			ret(
				vec4(
					mul(
						mix(
							clamp01(
								diffuseLighting(
									diffuse,
									material,
									vec3(1),
									ambient
								)
							),
							bg,
							fogExp2($x(result), float(0.2))
						),
						tint
					),
					1
				)
			),
		];
	}
);

// compile shader AST function to JS
const shaderFunc = targetJS().compile(program([mainImage])).mainImage;

// moving average transducer (MA period = 10, history = 24 frames)
const stats = step(comp(sma(10), slidingWindow(24)));

const $self: Worker = <any>self;
self.addEventListener("message", (e) => {
	const job = <WorkerJob>e.data;
	const h = job.y2 - job.y1;
	// render pixel shader function based on worker job spec
	const [buf, time] = timedResult(() =>
		renderPixels(
			(frag) =>
				shaderFunc(
					// frag coord
					frag,
					// image size
					[job.width, job.height],
					// camera / eye pos
					[
						Math.cos(job.time) * 2.5,
						Math.cos(job.time / 2) * 0.7,
						Math.sin(job.time) * 2.5,
					],
					// light dir
					[0.707, 0.707, 0],
					// worker color
					COLORS[job.id]
				),
			// pixel buffer
			new Uint32Array(job.width * h),
			// image size
			job.width,
			h,
			// region
			0,
			0,
			job.width,
			h,
			// buffer XY offset in image
			0,
			job.y1,
			// image height
			job.height
		)
	);
	// submit result
	$self.postMessage(<WorkerResult>{ buf, stats: stats(time) }, [buf.buffer]);
});

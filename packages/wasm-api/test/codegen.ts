import { writeText } from "@thi.ng/file-io";
import { fileFixture, fixturePath, group, TestCtx } from "@thi.ng/testament";
import * as assert from "assert";
import {
	C11,
	CodeGenOpts,
	DEFAULT_CODEGEN_OPTS,
	Enum,
	FuncPointer,
	generateTypes,
	ICodeGen,
	prepareTypes,
	Struct,
	TypeColl,
	TYPESCRIPT,
	ZIG,
} from "../src/index.js";

const stringTypes: TypeColl = {
	Bar: <Enum>{
		name: "Bar",
		type: "enum",
		values: ["a", { name: "b", value: 16 }, "c", { name: "d", value: 32 }],
	},
	Foo: <Struct>{
		name: "Foo",
		type: "struct",
		fields: [
			{ name: "single", type: "string" },
			{ name: "multi", type: "string", tag: "array", len: 2 },
			{ name: "singlePtr", type: "string", tag: "ptr" },
			{ name: "multiPtr", type: "string", tag: "ptr", len: 2 },
			{ name: "kind", type: "Bar" },
			{ name: "size", type: "usize" },
		],
	},
};

const checkFixture = (
	ctx: TestCtx,
	coll: TypeColl,
	gen: ICodeGen,
	opts: Partial<CodeGenOpts>,
	fname: string,
	regenerate = false
) => {
	const src = generateTypes(coll, gen, opts);
	regenerate && writeText(fixturePath(fname), src);
	assert.strictEqual(src, fileFixture(fname, ctx.logger));
};

const checkAll = (
	ctx: TestCtx,
	coll: TypeColl,
	opts: Partial<CodeGenOpts>,
	baseName: string,
	regenerate = false
) => {
	// prettier-ignore
	checkFixture(ctx, coll, C11({ typePrefix: "WASM_" }), opts, `${baseName}.c`, regenerate);
	checkFixture(ctx, coll, TYPESCRIPT(), opts, `${baseName}.ts`, regenerate);
	checkFixture(ctx, coll, ZIG(), opts, `${baseName}.zig`, regenerate);
};

group("codegen", {
	stringSlice: (ctx) => {
		const opts: Partial<CodeGenOpts> = {
			debug: true,
			header: false,
			stringType: "slice",
		};
		checkAll(ctx, stringTypes, opts, "string-slice");
		ctx.done();
	},

	stringPtr: (ctx) => {
		const opts: Partial<CodeGenOpts> = {
			debug: true,
			header: false,
			stringType: "ptr",
		};
		checkAll(ctx, stringTypes, opts, "string-ptr");
		ctx.done();
	},

	union: (ctx) => {
		const opts = { ...DEFAULT_CODEGEN_OPTS, header: false };
		const types = <TypeColl>{
			A: {
				name: "A",
				type: "struct",
				fields: [
					{ name: "a", type: "u8" },
					{ pad: 3 },
					{ name: "b", type: "u32" },
					{ name: "c", type: "u16", tag: "ptr", len: 3 },
					{ pad: 2 },
					{ name: "d", type: "f64" },
				],
			},
			B: {
				name: "B",
				type: "union",
				fields: [
					{ name: "a", type: "A", tag: "array", len: 3 },
					{ name: "b", type: "u64" },
				],
			},
		};
		assert.deepStrictEqual(prepareTypes(types, opts), {
			A: {
				name: "A",
				type: "struct",
				fields: [
					{
						name: "a",
						type: "u8",
						__align: 1,
						__offset: 0,
						__size: 1,
					},
					{
						pad: 3,
						__align: 1,
						__offset: 1,
						__size: 3,
					},
					{
						name: "b",
						type: "u32",
						__align: 4,
						__offset: 4,
						__size: 4,
					},
					{
						name: "c",
						type: "u16",
						tag: "ptr",
						len: 3,
						__align: 4,
						__offset: 8,
						__size: 4,
					},
					{
						pad: 2,
						__align: 1,
						__offset: 12,
						__size: 2,
					},
					{
						name: "d",
						type: "f64",
						__align: 8,
						__offset: 16,
						__size: 8,
					},
				],
				__align: 8,
				__size: 24,
			},
			B: {
				name: "B",
				type: "union",
				fields: [
					{
						name: "a",
						type: "A",
						tag: "array",
						len: 3,
						__align: 8,
						__offset: 0,
						__size: 72,
					},
					{
						name: "b",
						type: "u64",
						__align: 8,
						__offset: 0,
						__size: 8,
					},
				],
				__align: 8,
				__size: 72,
			},
		});
		checkAll(ctx, types, opts, "union");
		ctx.done();
	},

	opaque: (ctx) => {
		const opts = { ...DEFAULT_CODEGEN_OPTS, header: false };
		const coll = {
			A: <Struct>{
				name: "A",
				type: "struct",
				fields: [
					{ name: "a", type: "opaque" },
					{ name: "ptr", type: "opaque", tag: "ptr" },
					{ name: "slice", type: "opaque", tag: "slice" },
					{ name: "array", type: "opaque", tag: "array", len: 3 },
				],
			},
		};
		prepareTypes(coll, opts);
		assert.deepStrictEqual(coll, {
			A: {
				name: "A",
				type: "struct",
				fields: [
					{
						name: "a",
						type: "opaque",
						__align: 4,
						__offset: 0,
						__size: 4,
					},
					{
						name: "ptr",
						type: "opaque",
						tag: "ptr",
						__align: 4,
						__offset: 4,
						__size: 4,
					},
					{
						name: "slice",
						type: "opaque",
						tag: "slice",
						__align: 4,
						__offset: 8,
						__size: 8,
					},
					{
						name: "array",
						type: "opaque",
						tag: "array",
						len: 3,
						__align: 4,
						__offset: 16,
						__size: 12,
					},
				],
				__align: 4,
				__size: 28,
			},
		});
		checkAll(ctx, coll, opts, "opaque");
		ctx.done();
	},

	funcptr: (ctx) => {
		const opts = { ...DEFAULT_CODEGEN_OPTS, header: false };
		const coll = {
			A: <FuncPointer>{
				name: "A",
				type: "funcptr",
				rtype: "void",
				args: [
					{ name: "x", type: "usize", tag: "ptr" },
					{
						name: "y",
						type: "string",
						const: true,
					},
				],
			},
			B: <Struct>{
				name: "B",
				type: "struct",
				fields: [
					{ name: "a", type: "A" },
					{ name: "ptr", type: "A", tag: "ptr" },
					{ name: "array", type: "A", tag: "array", len: 2 },
					{ name: "slice", type: "A", tag: "slice" },
				],
			},
		};
		prepareTypes(coll, opts);
		assert.deepStrictEqual(coll, {
			A: {
				name: "A",
				type: "funcptr",
				rtype: "void",
				args: [
					{ name: "x", type: "u32", tag: "ptr", __align: 4 },
					{ name: "y", type: "string", const: true, __align: 4 },
				],
				__align: 4,
				__size: 4,
			},
			B: {
				name: "B",
				type: "struct",
				fields: [
					{
						name: "a",
						type: "A",
						__align: 4,
						__offset: 0,
						__size: 4,
					},
					{
						name: "ptr",
						type: "A",
						tag: "ptr",
						__align: 4,
						__offset: 4,
						__size: 4,
					},
					{
						name: "array",
						type: "A",
						tag: "array",
						len: 2,
						__align: 4,
						__offset: 8,
						__size: 8,
					},
					{
						name: "slice",
						type: "A",
						tag: "slice",
						__align: 4,
						__offset: 16,
						__size: 8,
					},
				],
				__align: 4,
				__size: 24,
			},
		});
		checkAll(ctx, coll, opts, "funcptr");
		ctx.done();
	},
});

import type { FloatType, Fn, Fn2 } from "@thi.ng/api";
import type { WasmBridge } from "./bridge.js";

export const PKG_NAME = "@thi.ng/wasm-api";

export type BigIntArray = bigint[] | BigInt64Array | BigUint64Array;

/**
 * Common interface for WASM/JS child APIs which will be used in combination
 * with a parent {@link WasmBridge}.
 *
 * @remarks
 * The generic type param is optional and only used if the API is requiring
 * certain exports declared by WASM module.
 */
export interface IWasmAPI<T extends WasmExports = WasmExports> {
	/**
	 * Called by {@link WasmBridge.init} to initialize all child APIs (async)
	 * after the WASM module has been instantiated. If the method returns false
	 * the overall initialization process will be stopped/terminated.
	 *
	 * @param parent
	 */
	init(parent: WasmBridge<T>): Promise<boolean>;
	/**
	 * Returns an object of this child API's declared WASM imports. Be aware
	 * imports from all child APIs will be merged into a single flat namespace,
	 * it's recommended to use naming prefixes to avoid clashes.
	 */
	getImports(): WebAssembly.ModuleImports;
}

/**
 * Base interface of exports declared by the WASM module. At the very least, the
 * module needs to export its memory and the functions defined in this
 * interface.
 *
 * @remarks
 * This interface is supposed to be extended with the concrete exports defined
 * by your WASM module and is used as generic type param for {@link WasmBridge}
 * and any {@link IWasmAPI} bridge modules. These exports can obtained via
 * {@link WasmBridge.exports} where they will be stored during the execution of
 * {@link WasmBridge.init}.
 */
export interface WasmExports {
	/**
	 * The WASM module's linear memory buffer. The `WasmBridge` automatically
	 * creates various typed views of that memory (i.e. u8, u16, u32, f32 etc.)
	 */
	memory: WebAssembly.Memory;
	/**
	 * Implementation specific memory allocation function (likely heap-based).
	 * If successful returns address of new memory block, or zero if
	 * unsuccessful.
	 *
	 * @remarks
	 * In the supplied Zig bindings (see `/zig/core.zig`), by default this is
	 * using the `std.heap.GeneralPurposeAllocator` (which also automatically
	 * handles growing the WASM memory), however as mentioned the underlying
	 * mechanism is purposefully left to the actual WASM-side implementation. In
	 * a C program, this would likely use `malloc()` or similar...
	 */
	_wasm_allocate(numBytes: number): number;
	/**
	 * Implementation specific function to free a previously allocated chunk of
	 * of WASM memory (allocated via {@link WasmExports._wasm_allocate}).
	 *
	 * @param addr
	 * @param numBytes
	 */
	_wasm_free(addr: number, numBytes: number): void;
}

export interface WasmMemViews {
	i8: Int8Array;
	u8: Uint8Array;
	i16: Int16Array;
	u16: Uint16Array;
	i32: Int32Array;
	u32: Uint32Array;
	i64: BigInt64Array;
	u64: BigUint64Array;
	f32: Float32Array;
	f64: Float64Array;
}

/**
 * Core API of WASM imports defined by the {@link WasmBridge}. The same
 * functions are declared as bindings in `/zig/core.zig`. Also see this file for
 * documentation of each function...
 */
export interface CoreAPI extends WebAssembly.ModuleImports {
	printI8: Fn<number, void>;
	printU8: Fn<number, void>;
	printU8Hex: Fn<number, void>;
	printI16: Fn<number, void>;
	printU16: Fn<number, void>;
	printU16Hex: Fn<number, void>;
	printI32: Fn<number, void>;
	printU32: Fn<number, void>;
	printU32Hex: Fn<number, void>;
	_printI64: Fn2<number, number, void>;
	_printU64: Fn2<number, number, void>;
	_printU64Hex: Fn2<number, number, void>;
	printF32: Fn<number, void>;
	printF64: Fn<number, void>;
	_printI8Array: (addr: number, len: number) => void;
	_printU8Array: (addr: number, len: number) => void;
	_printI16Array: (addr: number, len: number) => void;
	_printU16Array: (addr: number, len: number) => void;
	_printI32Array: (addr: number, len: number) => void;
	_printU32Array: (addr: number, len: number) => void;
	_printI64Array: (addr: number, len: number) => void;
	_printU64Array: (addr: number, len: number) => void;
	_printF32Array: (addr: number, len: number) => void;
	_printF64Array: (addr: number, len: number) => void;
	_printStr0: (addr: number) => void;
	_printStr: (addr: number, len: number) => void;
}

export interface WasmTypeBase {
	/**
	 * Base address in linear WASM memory.
	 */
	readonly __base: number;
	/**
	 * Obtain as byte buffer
	 */
	readonly __bytes: Uint8Array;
}

export interface WasmType<T> {
	readonly align: number;
	readonly size: number;
	instance: Fn<number, T>;
}

export type WasmTypeConstructor<T> = Fn<WasmMemViews, WasmType<T>>;

export type WasmInt = "i8" | "i16" | "i32" | "i64";
export type WasmUint = "u8" | "u16" | "u32" | "u64";
export type WasmFloat = FloatType;
export type WasmPrim = WasmInt | WasmUint | WasmFloat;

export type TypeColl = Record<string, TopLevelType>;

export interface TypeInfo {
	/**
	 * Auto-computed size (in bytes)
	 *
	 * @internal
	 */
	__size?: number;
	/**
	 * Auto-computed offset (in bytes) in parent struct
	 *
	 * @internal
	 */
	__offset?: number;
	/**
	 * Auto-computed alignment (in bytes)
	 *
	 * @internal
	 */
	__align?: number;
}

export interface TopLevelType extends TypeInfo {
	name: string;
	doc?: string;
	type: "struct" | "enum";
}

export interface Struct extends TopLevelType {
	type: "struct";
	fields: StructField[];
	/**
	 * If true, struct fields will be re-ordered in descending order based on
	 * their {@link TypeInfo.__align} size.
	 *
	 * @defaultValue false
	 */
	auto?: boolean;
}

export interface StructField extends TypeInfo {
	/**
	 * Field name (prefix: "__" is reserved)
	 */
	name: string;
	/**
	 * Field docstring (can be multiline, will be formatted)
	 */
	doc?: string;
	/**
	 * Field type tag/qualifier (note: `slice` & `vec` are only supported by
	 * Zig & TS)
	 *
	 * @defaultValue "scalar"
	 */
	tag?: "scalar" | "array" | "ptr" | "slice" | "vec";
	/**
	 * Field base type. If not a {@link WasmPrim} or `opaque`, the value is
	 * interpreted as another type name in the {@link TypeColl}.
	 *
	 * TODO `opaque` currently unsupported.
	 */
	type: WasmPrim | "opaque" | string;
	/**
	 * TODO currently unsupported!
	 */
	sentinel?: number;
	/**
	 * Array or vector length
	 */
	len?: number;
	/**
	 * TODO currently unsupported!
	 */
	default?: any;
}

export interface Enum extends TopLevelType {
	type: "enum";
	/**
	 * No u64 support, due to Typescript not supporting bigint enum values
	 */
	tag: Exclude<WasmUint, "u64">;
	values: (string | EnumValue)[];
}

export interface EnumValue {
	name: string;
	value?: number;
	doc?: string;
}

export interface ICodeGen {
	/**
	 * Optional prelude source, to be prepended before any generated type defs.
	 */
	pre?: string;
	/**
	 * Optional source code to be appended after any generated type defs.
	 */
	post?: string;

	doc: (
		doc: string,
		indent: string,
		acc: string[],
		topLevel?: boolean
	) => void;

	enum: (type: Enum, types: TypeColl, acc: string[]) => void;

	struct: (type: Struct, types: TypeColl, acc: string[]) => void;
}

/**
 * WASM usize type. Assuming wasm32 until wasm64 surfaces, then need an option.
 */
export const USIZE = "u32";
/**
 * Byte size of {@link USIZE}.
 */
export const USIZE_SIZE = 4;

// @ts-ignore possibly includes unused imports
import { MemorySlice, Pointer, WasmStringSlice, WasmTypeBase, WasmTypeConstructor } from "@thi.ng/wasm-api";

export interface A extends WasmTypeBase {
	/**
	 * WASM type: u8
	 */
	a: number;
	/**
	 * WASM type: u32
	 */
	b: number;
	/**
	 * WASM type: *[3]u16
	 */
	c: Pointer<Uint16Array>;
	/**
	 * WASM type: f64
	 */
	d: number;
}

export const $A: WasmTypeConstructor<A> = (mem) => ({
	get align() {
		return 8;
	},
	get size() {
		return 24;
	},
	instance: (base) => {
		let $c: Pointer<Uint16Array> | null = null;
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 24);
			},
			get a(): number {
				return mem.u8[base];
			},
			set a(x: number) {
				mem.u8[base] = x;
			},
			get b(): number {
				return mem.u32[(base + 4) >>> 2];
			},
			set b(x: number) {
				mem.u32[(base + 4) >>> 2] = x;
			},
			get c(): Pointer<Uint16Array> {
				return $c || ($c = new Pointer<Uint16Array>(mem, (base + 8), (base) => mem.u16.subarray(base >>> 1, (base >>> 1) + 3)));
			},
			get d(): number {
				return mem.f64[(base + 16) >>> 2];
			},
			set d(x: number) {
				mem.f64[(base + 16) >>> 2] = x;
			},
		};
	}
});

export interface B extends WasmTypeBase {
	a: A[];
	/**
	 * WASM type: u64
	 */
	b: bigint;
}

export const $B: WasmTypeConstructor<B> = (mem) => ({
	get align() {
		return 8;
	},
	get size() {
		return 72;
	},
	instance: (base) => {
		return {
			get __base() {
				return base;
			},
			get __bytes() {
				return mem.u8.subarray(base, base + 72);
			},
			get a(): A[] {
				const addr = base;
				const inst = $A(mem);
				const slice: A[] = [];
				for(let i = 0; i < 3; i++) slice.push(inst.instance(addr + i * 72));
				return slice;
			},
			get b(): bigint {
				return mem.u64[base >>> 3];
			},
			set b(x: bigint) {
				mem.u64[base >>> 3] = x;
			},
		};
	}
});

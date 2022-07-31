import { hasWASM } from "@thi.ng/checks";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	decodeSLEB128,
	decodeULEB128,
	encodeSLEB128,
	encodeULEB128,
} from "../src/index.js";

if (hasWASM()) {
	group("leb128", {
		signed: () => {
			let a;
			assert.deepStrictEqual(
				[...(a = encodeSLEB128(Number.MAX_SAFE_INTEGER))],
				[255, 255, 255, 255, 255, 255, 255, 15]
			);
			assert.deepStrictEqual(decodeSLEB128(a), [
				Number.MAX_SAFE_INTEGER,
				8,
			]);
			assert.deepStrictEqual(
				[...(a = encodeSLEB128(Number.MIN_SAFE_INTEGER))],
				[129, 128, 128, 128, 128, 128, 128, 112]
			);
			assert.deepStrictEqual(decodeSLEB128(a), [
				Number.MIN_SAFE_INTEGER,
				8,
			]);
			assert.deepStrictEqual(decodeSLEB128(encodeSLEB128(64)), [64, 2]);
			assert.deepStrictEqual(decodeSLEB128(encodeSLEB128(-64)), [-64, 1]);
		},

		unsigned: () => {
			let a;
			assert.deepStrictEqual(
				[...(a = encodeULEB128(Number.MAX_SAFE_INTEGER))],
				[255, 255, 255, 255, 255, 255, 255, 15]
			);
			assert.deepStrictEqual(decodeULEB128(a), [
				Number.MAX_SAFE_INTEGER,
				8,
			]);
			assert.deepStrictEqual(
				[...(a = encodeULEB128(Number.MIN_SAFE_INTEGER))],
				[0]
			);
			assert.deepStrictEqual(decodeULEB128(a), [0, 1]);
			assert.deepStrictEqual(decodeULEB128(encodeULEB128(127)), [127, 1]);
		},
	});
} else {
	console.warn("WASM not available, skipping tests...");
}

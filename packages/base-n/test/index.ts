import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	BASE32_HEX,
	BASE32_RFC4648,
	BASE36,
	BASE58,
	BASE62,
	BASE64,
	BASE85,
	IBase,
} from "../src/index.js";

group("base-n", {
	roundtrip: () => {
		const X = BigInt(2) ** BigInt(128) - BigInt(1);

		const check = (
			base: IBase,
			expected: string,
			id: string | number = base.N
		) => {
			assert.strictEqual(base.encodeBigInt(X), expected, `encode: ${id}`);
			assert.strictEqual(base.decodeBigInt(expected), X, `decode: ${id}`);
		};

		check(BASE32_RFC4648, "H7777777777777777777777777", "32rfc");
		check(BASE32_HEX, "7VVVVVVVVVVVVVVVVVVVVVVVVV", "32hex");
		check(BASE36, "F5LXX1ZZ5PNORYNQGLHZMSP33");
		check(BASE58, "YcVfxkQb6JRzqk5kF2tNLv");
		check(BASE62, "7n42DGM5Tflk9n8mt7Fhc7");
		check(BASE64, "3/////////////////////");
		check(BASE85, "=r54lj&NUUO~Hi%c2ym0");
	},
});

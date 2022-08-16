import type { NumOrString } from "@thi.ng/api";
import {
	BIGINT_ARRAY_CTORS,
	BigType,
	BIT_SHIFTS,
	Type,
	TYPEDARRAY_CTORS,
} from "@thi.ng/api/typedarray";
import { isString } from "@thi.ng/checks/is-string";
import {
	Enum,
	ICodeGen,
	PKG_NAME,
	Struct,
	StructField,
	USIZE,
	USIZE_SIZE,
	WasmPrim,
} from "../api.js";
import {
	isBigNumeric,
	isNumeric,
	isWasmPrim,
	isWasmString,
	prefixLines,
} from "./utils.js";

/**
 * TypeScript code generator options.
 */
export interface TSOpts {
	/**
	 * Indentation string
	 *
	 * @defaultValue "\t"
	 */
	indent: string;
	/**
	 * If true (default), forces uppercase enums
	 *
	 * @defaultValue true
	 */
	uppercaseEnums: boolean;
	/**
	 * Same as {@link CodeGenOpts.stringType}.
	 */
	stringType: "slice" | "ptr";
}

/**
 * TypeScript code generator. Call with options and then pass to
 * {@link generateTypes} (see its docs for further usage).
 *
 * @remarks
 * This codegen generates interface and enum definitions for a {@link TypeColl}
 * given to {@link generateTypes}. For structs it will also generate memory
 * mapped wrappers with fully typed accessors.
 *
 * @param opts
 */
export const TYPESCRIPT = (opts?: Partial<TSOpts>) => {
	const { indent, stringType, uppercaseEnums } = <TSOpts>{
		indent: "\t",
		stringType: "slice",
		uppercaseEnums: true,
		...opts,
	};
	const I = indent;
	const I2 = I + I;
	const I3 = I2 + I;

	const gen: ICodeGen = {
		pre: `import type { WasmTypeBase, WasmTypeConstructor } from "${PKG_NAME}";`,

		doc: (doc, indent, acc) => {
			if (doc.indexOf("\n") !== -1) {
				acc.push(
					indent + "/**",
					prefixLines(indent + " * ", doc),
					indent + " */"
				);
			} else {
				acc.push(`${indent}/** ${doc} */`);
			}
		},

		enum: (type, _, acc) => {
			const e = <Enum>type;
			acc.push(`export enum ${e.name} {`);
			for (let v of e.values) {
				let line = indent;
				if (!isString(v)) {
					v.doc && gen.doc(v.doc, indent, acc);
					line += uppercaseEnums ? v.name.toUpperCase() : v.name;
					if (v.value != null) line += ` = ${v.value}`;
				} else {
					line += uppercaseEnums ? v.toUpperCase() : v;
				}
				acc.push(line + ",");
			}
			acc.push("}\n");
			return acc;
		},

		struct: (type, types, acc) => {
			const struct = <Struct>type;
			const returnTypes: Record<string, string> = {};

			// interface definition
			acc.push(`export interface ${struct.name} extends WasmTypeBase {`);
			for (let f of struct.fields) {
				f.doc && gen.doc(f.doc, indent, acc);
				let line = `${indent}${f.name}: `;
				let rtype: string = "";
				if (f.tag == "array" || f.tag == "slice" || f.tag === "vec") {
					rtype = isNumeric(f.type)
						? TYPEDARRAY_CTORS[<Type>f.type].name
						: isBigNumeric(f.type)
						? BIGINT_ARRAY_CTORS[<BigType>f.type].name
						: f.type + "[]";
				} else if (!f.tag || f.tag === "scalar" || f.tag === "ptr") {
					rtype = isBigNumeric(f.type)
						? "bigint"
						: isNumeric(f.type)
						? "number"
						: f.type;
				}
				returnTypes[f.name] = rtype;
				acc.push(line + rtype + ";");
			}
			acc.push("}\n");

			// type implementation
			acc.push(
				`export const $${struct.name}: WasmTypeConstructor<${struct.name}> = (mem) => ({`,
				`${I}get align() { return ${struct.__align}; },`,
				`${I}get size() { return ${struct.__size}; },`,
				`${I}instance: (base) => ({`,
				`${I2}get __base() { return base; },`,
				`${I2}get __bytes() { return mem.u8.subarray(base, base + ${struct.__size}); },`
			);

			for (let f of struct.fields) {
				const offset = f.__offset || 0;
				acc.push(`${I2}get ${f.name}(): ${returnTypes[f.name]} {`);
				const isPrim = isWasmPrim(f.type);
				const isStr = isWasmString(f.type);
				if (f.tag === "ptr") {
					if (isPrim) {
						acc.push(
							`${I3}return mem.${f.type}[${__ptrShift(
								offset,
								f.type
							)}];`
						);
					} else if (isStr) {
						acc.push(
							// double deref
							stringType === "slice"
								? `${I3}return mem.getString(mem.${USIZE}[${__ptr(
										offset
								  )} >>> ${USIZE_SIZE}])`
								: `${I3}return mem.getString(${__ptr(offset)})`
						);
					} else {
						acc.push(
							`${I3}return $${f.type}.instance(${__ptr(offset)});`
						);
					}
				} else if (f.tag === "slice") {
					acc.push(`${I3}const len = ${__ptr(offset + 4)};`);
					if (isPrim) {
						acc.push(
							`${I3}const addr = ${__ptrShift(offset, f.type)};`,
							`${I3}return mem.${f.type}.subarray(addr, addr + len);`
						);
					} else if (isStr) {
						acc.push(
							`${I3}const addr = ${__ptr(offset)};`,
							__mapStringArray(I3, stringType)
						);
					} else {
						acc.push(
							`${I3}const addr = ${__ptr(offset)};`,
							__mapArray(f, I3)
						);
					}
				} else if (f.tag === "array" || f.tag === "vec") {
					if (isPrim) {
						acc.push(
							`${I3}const addr = ${__addrShift(offset, f.type)};`,
							`${I3}return mem.${f.type}.subarray(addr, addr + ${f.len});`
						);
					} else if (isStr) {
						acc.push(
							`${I3}const addr = ${__addr(offset)};`,
							__mapStringArray(I3, stringType, f.len)
						);
					} else {
						acc.push(
							`${I3}const addr = ${__addr(offset)};`,
							__mapArray(f, I3, f.len)
						);
					}
				} else {
					let setter: string;
					if (isPrim) {
						const addr = __mem(f.type, f.__offset!);
						acc.push(`${I3}return ${addr};`);
						setter = `${addr} = x`;
					} else if (isStr) {
						acc.push(`${I3}return mem.getString(${__ptr(offset)})`);
						setter =
							stringType === "slice"
								? `mem.setString(x, ${__ptr(offset)}, ${__ptr(
										offset + 4
								  )} + 1, true);`
								: `throw new Error("unsupported for raw string pointers")`;
					} else if (types[f.type].type === "enum") {
						const tag = (<Enum>types[f.type]).tag;
						const addr = __mem(tag, f.__offset!);
						acc.push(`${I3}return ${addr};`);
						setter = `${addr} = x`;
					} else {
						acc.push(
							`${I3}return $${f.type}(mem).instance(${__addr(
								offset
							)});`
						);
						setter = `mem.u8.set(x.__bytes, ${__addr(offset)})`;
					}
					// close getter
					acc.push(`${I2}},`);
					// setter
					acc.push(
						`${I2}set ${f.name}(x: ${returnTypes[f.name]}) {`,
						`${I3}${setter};`
					);
				}
				// close field accessor
				acc.push(`${I2}},`);
			}

			acc.push(`${I}})\n});\n`);
			return acc;
		},
	};
	return gen;
};

/** @internal */
const __shift = (type: string) => BIT_SHIFTS[<WasmPrim>type];

/** @internal */
const __addr = (offset: number) => (offset > 0 ? `(base + ${offset})` : "base");

/** @internal */
const __addrShift = (offset: number, shift: string) => {
	const bits = __shift(shift);
	return __addr(offset) + (bits ? " >>> " + bits : "");
};

/** @internal */
const __ptr = (offset: number) => `mem.${USIZE}[${__addrShift(offset, USIZE)}]`;

/** @internal */
const __ptrShift = (offset: number, shift: string) =>
	__ptr(offset) + " >>> " + __shift(shift);

const __mem = (type: string, offset: number) =>
	`mem.${type}[${__addrShift(offset!, type)}]`;

/** @internal */
const __mapArray = (f: StructField, indent: string, len: NumOrString = "len") =>
	prefixLines(
		indent,
		`const inst = $${f.type}(mem);
const slice: ${f.type}[] = [];
for(let i = 0; i < ${len}; i++) slice.push(inst.instance(addr + i * ${f.__size}));
return slice;`
	);

/** @internal */
const __mapStringArray = (
	indent: string,
	type: TSOpts["stringType"],
	len: NumOrString = "len"
) =>
	prefixLines(indent, [
		"const slice: string[] = [];",
		`for(let i = 0; i < ${len}; i++) slice.push(mem.getString(mem.${USIZE}[(addr + i * ${
			USIZE_SIZE * (type === "slice" ? 2 : 1)
		}) >>> ${__shift(USIZE)}]));`,
		"return slice;",
	]);

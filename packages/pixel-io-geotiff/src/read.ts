import { TypedArray, typedArrayType } from "@thi.ng/api";
import { FloatBuffer, floatBuffer, FLOAT_GRAY_RANGE } from "@thi.ng/pixel";
import { fromArrayBuffer } from "geotiff";

export const readGeoTiff = async (src: ArrayBufferView) => {
	const tiff = await fromArrayBuffer(src.buffer);
	const tiffImg = await tiff.getImage();
	const width = tiffImg.getWidth();
	const height = tiffImg.getHeight();
	const data = <TypedArray>(await tiffImg.readRasters({ samples: [0] }))![0];
	const type = typedArrayType(data);
	const [min, max] = (<Float32Array>data).reduce(
		(acc: number[], x) => {
			acc[0] = Math.min(acc[0], x);
			acc[1] = Math.max(acc[1], x);
			return acc;
		},
		[Infinity, -Infinity]
	);
	const fmt = FLOAT_GRAY_RANGE(min, max);
	let img: FloatBuffer;
	switch (type) {
		case "i8":
		case "u8":
		case "i16":
		case "u16":
		case "i32":
		case "u32":
			img = floatBuffer(width, height, fmt, new Float32Array(data));
			break;
		case "f32":
			img = floatBuffer(width, height, fmt, <Float32Array>data);
			break;
		case "f64":
			img = floatBuffer(width, height, fmt, new Float32Array(data));
			break;
	}
	return { img: img!, tiff: tiffImg };
};

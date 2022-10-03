import type { Fn0 } from "@thi.ng/api";
import { downloadCanvas } from "@thi.ng/dl-asset";
import { NULL_LOGGER } from "@thi.ng/logger";
import { randomID } from "@thi.ng/random";
import { IWasmAPI, WasmBridge, WasmExports } from "@thi.ng/wasm-api";
import { DOMExports, WasmDom } from "@thi.ng/wasm-api-dom";
import WASM_URL from "./main.wasm?url";

interface WasmApp extends WasmExports, DOMExports {
	start: Fn0<void>;
}

/**
 * Custom WASM API module for basic canvas drawing, i.e. the functions returned
 * by `getImports()` are being made available to the WASM binary.
 */
class DrawHandlers implements IWasmAPI<WasmApp> {
	parent!: WasmBridge<WasmApp>;
	dom!: WasmDom;

	async init(parent: WasmBridge<WasmApp>) {
		this.parent = parent;
		this.dom = <WasmDom>this.parent.modules.dom;
		return true;
	}

	getImports() {
		return {
			/**
			 * Clear canvas element for given ID handle.
			 * See thi.ng/wasm-api-dom for further details...
			 *
			 * @param canvasID
			 */
			clearCanvas: (canvasID: number) => {
				const canvas = <HTMLCanvasElement>(
					this.dom.elements.get(canvasID)
				);
				canvas.width = canvas.width;
			},

			/**
			 * Triggers PNG download of the given canvas.
			 *
			 * @param canvasID
			 */
			downloadCanvas: (canvasID: number) =>
				downloadCanvas(
					<HTMLCanvasElement>this.dom.elements.get(canvasID),
					`zig-canvas-${randomID()}`
				),

			/**
			 * Draw a stroke/polyline into given canvas. The polyline consists
			 * of `len` [2]u16 tuples starting from given address.
			 *
			 * @param canvasID
			 * @param addr
			 * @param len
			 */
			drawStroke: (canvasID: number, addr: number, len: number) => {
				const ctx = (<HTMLCanvasElement>(
					this.dom.elements.get(canvasID, false)
				)).getContext("2d")!;
				ctx.lineWidth = 3;

				addr >>= 1;
				const i16 = this.parent.i16;
				ctx.moveTo(i16[addr], i16[addr + 1]);
				addr += 2;
				for (; len-- > 1; ) {
					ctx.lineTo(i16[addr], i16[addr + 1]);
					addr += 2;
				}
				ctx.stroke();
			},
		};
	}
}

// main app initialization

(async () => {
	// create new WASM bridge with extra API modules
	const bridge = new WasmBridge<WasmApp>(
		{
			dom: new WasmDom(),
			app: new DrawHandlers(),
		}
		// uncomment to suppress logging messages
		// NULL_LOGGER
	);
	// instantiate WASM module & bindings
	await bridge.instantiate(fetch(WASM_URL));
	// call WASM main function to kick off
	bridge.exports.start();
})();

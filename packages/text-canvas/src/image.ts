import type { UIntArray } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import { isNumber } from "@thi.ng/checks";
import { clamp0 } from "@thi.ng/math";
import { ClipRect, ImageOpts, SHADES_BLOCK } from "./api";
import { canvas, Canvas } from "./canvas";
import { FMT_ANSI565 } from "./format";
import { toString } from "./string";
import { charCode, intersectRect } from "./utils";

export const blit = (canvas: Canvas, x: number, y: number, src: Canvas) => {
    x |= 0;
    y |= 0;
    const { buf: sbuf, width: sw, height: sh } = src;
    const { buf: dbuf, width: dw } = canvas;
    const { x1, y1, y2, w: iw, h: ih } = intersectRect(
        { x1: x, y1: y, x2: x + sw, y2: y + sh, w: sw, h: sh },
        peek(canvas.clipRects)
    );
    if (!iw || !ih) return;
    const sx = clamp0(x1 - x);
    const sy = clamp0(y1 - y);
    for (let yy = sy, dy = y1; dy < y2; yy++, dy++) {
        let sidx = sx + yy * sw;
        let didx = x1 + dy * dw;
        dbuf.set(sbuf.subarray(sidx, sidx + iw), didx);
    }
};

export const resize = (canvas: Canvas, newWidth: number, newHeight: number) => {
    if (canvas.width === newWidth && canvas.height === newHeight) return;
    const dest = new Canvas(newWidth, newHeight);
    dest.buf.fill(charCode(0x20, canvas.format));
    blit(dest, 0, 0, canvas);
    canvas.buf = dest.buf;
    canvas.width = newWidth;
    canvas.height = newHeight;
    canvas.clipRects = [
        {
            x1: 0,
            y1: 0,
            x2: newWidth,
            y2: newHeight,
            w: newWidth,
            h: newHeight,
        },
    ];
};

export const extract = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    const dest = new Canvas(w, h, canvas.format, peek(canvas.styles));
    blit(dest, -x, -y, canvas);
    return dest;
};

/**
 * Scrolls canvas vertically by `dy` lines. If `dy > 0` content moves
 * upward, if `dy < 0` downward. The new empty space will be filled with
 * `clear` char (default: ` `).
 *
 * @param canvas
 * @param dy
 * @param clear
 */
export const scrollV = (canvas: Canvas, dy: number, clear = 0x20) => {
    const { buf, width } = canvas;
    const ch = charCode(clear, canvas.format);
    dy *= width;
    if (dy < 0) {
        buf.copyWithin(-dy, 0, dy);
        buf.fill(ch, 0, -dy);
    } else if (dy > 0) {
        buf.copyWithin(0, dy);
        buf.fill(ch, -dy);
    }
};

/**
 *
 * @param canvas
 * @param x
 * @param y
 * @param w
 * @param h
 * @param pixels
 * @param opts
 */
export const image = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number,
    pixels: ArrayLike<number>,
    opts?: Partial<ImageOpts>
) => {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    const { buf, width } = canvas;
    const { x1, y1, x2, y2, sx, sy, w: iw, h: ih } = imgRect(
        canvas,
        x,
        y,
        w,
        h
    );
    if (!iw || !ih) return;
    const { chars, format, gamma, invert, bits } = {
        chars: SHADES_BLOCK,
        format: canvas.format,
        gamma: 1,
        invert: false,
        bits: 8,
        ...opts,
    };
    const fmt = isNumber(format) ? () => format : format;
    const max = (1 << bits) - 1;
    const mask = invert ? max : 0;
    const norm = 1 / max;
    const num = chars.length - 1;
    for (let yy = sy, dy = y1; dy < y2; yy++, dy++) {
        let sidx = sx + yy * w;
        let didx = x1 + dy * width;
        for (let xx = sx, dx = x1; dx < x2; xx++, dx++) {
            const col = Math.pow((pixels[sidx++] ^ mask) * norm, gamma);
            buf[didx++] = charCode(chars[(col * num + 0.5) | 0], fmt(col));
        }
    }
};

/**
 * Optimized version of {@link image}, which only uses a single char for all
 * pixels and applies pixel values directly as formatting data (for each pixel).
 *
 * @param canvas
 * @param x
 * @param y
 * @param w
 * @param h
 * @param pixels
 * @param char
 */
export const imageRaw = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number,
    pixels: ArrayLike<number>,
    char = "█"
) => {
    x |= 0;
    y |= 0;
    w |= 0;
    h |= 0;
    const { buf, width } = canvas;
    const { x1, y1, x2, y2, sx, sy, w: iw, h: ih } = imgRect(
        canvas,
        x,
        y,
        w,
        h
    );
    if (!iw || !ih) return;
    const code = char.charCodeAt(0);
    for (let yy = sy, dy = y1; dy < y2; yy++, dy++) {
        let sidx = sx + yy * w;
        let didx = x1 + dy * width;
        for (let xx = sx, dx = x1; dx < x2; xx++, dx++) {
            buf[didx++] = code | ((pixels[sidx++] & 0xffff) << 16);
        }
    }
};

/**
 * Syntax sugar for {@link imageRaw}. Takes a thi.ng/pixel compatible 16bit
 * pixel buffer in RGB565 format and converts it into a new {@link canvas}. The
 * optional `char` will be used as character for each pixel.
 *
 * @param src
 * @param char
 */
export const imageCanvas565 = (
    src: { width: number; height: number; pixels: UIntArray },
    char?: string
) => {
    const dest = canvas(src.width, src.height);
    imageRaw(dest, 0, 0, src.width, src.height, src.pixels, char);
    return dest;
};

/**
 * Same as {@link imageCanvas565}, but returns resulting canvas as 24bit ANSI
 * string.
 *
 * @param src
 * @param char
 */
export const imageString565 = (
    src: { width: number; height: number; pixels: UIntArray },
    char?: string
) => toString(imageCanvas565(src, char), FMT_ANSI565);

const imgRect = (
    canvas: Canvas,
    x: number,
    y: number,
    w: number,
    h: number
) => {
    const rect: ClipRect & { sx: number; sy: number } = <any>(
        intersectRect(
            { x1: x, y1: y, x2: x + w, y2: y + h, w, h },
            peek(canvas.clipRects)
        )
    );
    rect.sx = clamp0(rect.x1 - x);
    rect.sy = clamp0(rect.y1 - y);
    return rect;
};

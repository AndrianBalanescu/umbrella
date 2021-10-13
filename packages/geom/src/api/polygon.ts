import type { IHiccupShape } from "@thi.ng/geom-api";
import { __copyShape } from "../internal/copy.js";
import { APC } from "./apc.js";

export class Polygon extends APC implements IHiccupShape {
    get type() {
        return "poly";
    }

    copy(): Polygon {
        return <Polygon>__copyShape(Polygon, this);
    }

    toHiccup() {
        return ["polygon", this.attribs, this.points];
    }
}

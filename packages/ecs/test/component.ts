import { equiv } from "@thi.ng/equiv";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { ECS, MemMappedComponent } from "../src/index.js"

let ecs: ECS<any>;

group(
    "component",
    {
        "defComponent (minimal)": () => {
            const a = ecs.defComponent({ id: "a", type: "f32" });
            assert.ok(a instanceof MemMappedComponent);
            assert.ok(a.dense instanceof Uint8Array);
            assert.ok(a.sparse instanceof Uint8Array);
            assert.ok(a.vals instanceof Float32Array);
            assert.strictEqual(a.dense.length, ecs.idgen.capacity);
            assert.strictEqual(a.sparse.length, ecs.idgen.capacity);
            assert.strictEqual(a.vals.length, ecs.idgen.capacity);
            assert.strictEqual(a.size, 1);
            assert.strictEqual(a.stride, 1);
        },

        "defComponent (w/ type)": () => {
            const a = ecs.defComponent({ id: "a", type: "u8" })!;
            assert.ok(a.vals instanceof Uint8Array);
            assert.strictEqual(a.dense.length, ecs.idgen.capacity);
            assert.strictEqual(a.sparse.length, ecs.idgen.capacity);
            assert.strictEqual(a.vals.length, ecs.idgen.capacity);
            assert.strictEqual(a.size, 1);
            assert.strictEqual(a.stride, 1);
        },

        "defComponent (w/ size)": () => {
            const a = ecs.defComponent({ id: "a", type: "f32", size: 2 })!;
            assert.ok(a.vals instanceof Float32Array);
            assert.strictEqual(a.vals.length, ecs.idgen.capacity * 2);
            assert.strictEqual(a.size, 2);
            assert.strictEqual(a.stride, 2);
            const b = ecs.defComponent({
                id: "b",
                type: "f32",
                size: 3,
                stride: 4,
            })!;
            assert.strictEqual(b.vals.length, ecs.idgen.capacity * 4);
            assert.strictEqual(b.size, 3);
            assert.strictEqual(b.stride, 4);
        },

        "add (w/ default val)": () => {
            const a = ecs.defComponent({
                id: "a",
                type: "f32",
                size: 2,
                default: [1, 2],
            })!;
            assert.ok(a.add(8));
            assert.ok(a.add(9, [10, 20]));
            assert.ok(!a.add(16));
            assert.deepStrictEqual([...a.get(8)!], [1, 2]);
            assert.deepStrictEqual([...a.get(9)!], [10, 20]);
            assert.ok(!a.add(8, [-1, -2]));
            assert.deepStrictEqual([...a.get(8)!], [1, 2]);
        },

        "values / packedValues": () => {
            const a = ecs.defComponent({
                id: "a",
                type: "f32",
                size: 2,
                default: [1, 2],
            })!;
            assert.ok(a.add(8));
            assert.ok(a.add(9, [10, 20]));
            assert.deepStrictEqual([...a.packedValues()], [1, 2, 10, 20]);
            assert.ok(
                equiv(
                    [...a.values()],
                    [
                        [10, 20],
                        [1, 2],
                    ]
                )
            );
        },

        resize: () => {
            const a = ecs.defComponent({
                id: "a",
                type: "f32",
                size: 2,
                default: [1, 2],
            })!;
            const b = ecs.defComponent({ id: "b", default: "red" })!;
            const g = ecs.defGroup([a, b], [a, b]);
            const eid = ecs.defEntity([a, b]);
            assert.deepStrictEqual(g.getEntity(eid), {
                a: new Float32Array([1, 2]),
                b: "red",
                id: 0,
            });
            assert.strictEqual(a.sparse.length, 16);
            assert.strictEqual(b.sparse.length, 16);
            ecs.setCapacity(32);
            assert.strictEqual(a.sparse.length, 32);
            assert.strictEqual(b.sparse.length, 32);
            assert.deepStrictEqual(g.getEntity(eid), {
                a: new Float32Array([1, 2]),
                b: "red",
                id: 0,
            });
        },
    },
    {
        beforeEach: () => {
            ecs = new ECS({ capacity: 16 });
        },
    }
);

import { anaid, anaidFactory, hashInt } from "./anaid.ts";
import { HOURS_IN_50_YEARS } from "./constant.ts";
import { assert } from "https://deno.land/std/assert/mod.ts";
Deno.test("hashInt", () => {
    const ids = {} as Record<string, boolean>;
    for (let i = 1; i < HOURS_IN_50_YEARS; i++) {
        const hash = hashInt(i);
        assert(
            ids[hash] === undefined,
            `collision detected at ${i.toLocaleString()}th iterations, ${
                (HOURS_IN_50_YEARS - i).toLocaleString()
            } left (${
                ((HOURS_IN_50_YEARS - i) / HOURS_IN_50_YEARS * 100).toPrecision(
                    3,
                )
            }%)`,
        );
        assert(hash.length === 4, hash + "f");
        ids[hash] = true;
    }
});

Deno.test("anaid", () => {
    for (let i = 10; i < 20; i++) {
        const id = anaid(i);
        console.log(id, id.length, i);
        assert(id.length === i, "length not equal to expected");
    }
});

Deno.test("prefix", () => {
    const anaid = anaidFactory(
        {
            foo: "foo_",
        },
    );

    const id = anaid("foo");
    assert(
        id.startsWith("foo_"),
        "id does not contains prefix, returned: " + id,
    );
});

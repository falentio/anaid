import { anaidFactory } from "./anaid.ts";
import { assert } from "https://deno.land/std@0.221.0/assert/mod.ts";

Deno.test("anaid", () => {
    const anaid = anaidFactory();
    for (let i = 11; i < 20; i++) {
        const id = anaid(i);
        assert(id.length === i, "length not equal to expected");
    }
});

Deno.test("prefix", () => {
    const anaid = anaidFactory(
    );

    const id = anaid("foo_");
    assert(
        id.startsWith("foo_"),
        "id does not contains prefix, returned: " + id,
    );
});

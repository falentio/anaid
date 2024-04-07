import { anaid, hashInt } from "./anaid.ts";
import { HOURS_IN_50_YEARS } from "./constant.ts";
import { assert } from "https://deno.land/std/assert/mod.ts";
Deno.test("hashInt", () => {
    const ids = {} as Record<string, boolean>;
    let i = 0;
    while (true) {
        const id = hashInt(i);
        if (ids[id]) {
            break;
        }
        ids[id] = true;
        i++;
        if (i > HOURS_IN_50_YEARS) break;
    }
    console.log(i, HOURS_IN_50_YEARS - i, HOURS_IN_50_YEARS);
    assert(i > HOURS_IN_50_YEARS, "not enough cycle times");
});

Deno.test("anaid", () => {
    for (let i = 10; i < 20; i++) {
        const id = anaid(i);
        console.log(id);
        assert(id.length === i, "length not equal to expected");
    }
});

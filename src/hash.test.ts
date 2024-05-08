import { assert } from "https://deno.land/std@0.221.0/assert/assert.ts";
import { intHash } from "./hash.ts";

Deno.test("hashInt", () => {
    const idxs = {} as Record<string, boolean>;
    for (let i = 0; i < 31771; i++) {
        const h = intHash(i);
        assert(idxs[h] !== true, `Fail on ${i}th iterations`);
        idxs[h] = true;
        if (i < 1e3) console.log(h);
    }
});

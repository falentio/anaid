import { anaid } from "./anaid.ts";

Deno.bench("anaid", () => {
    anaid();
});

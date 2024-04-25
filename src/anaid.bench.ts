import { anaidFactory } from "./anaid.ts";

const anaid = anaidFactory();
Deno.bench("anaid", () => {
    anaid();
});

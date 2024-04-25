import type { AnaidFn } from "./src/anaid.ts";
import { anaidFactory } from "./src/anaid.ts";

// deno-lint-ignore ban-types
export const anaid: AnaidFn<{}> = anaidFactory();

export { anaidFactory } from "./src/anaid.ts";
export type { AnaidFactoryOptions, AnaidFn } from "./src/anaid.ts";
export { cryptoGenerator, type RandomNumberGenerator } from "./src/random.ts";

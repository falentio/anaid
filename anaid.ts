import { MILLISECONDS_IN_HOURS } from "./constant.ts";
import { cryptoGenerator } from "./random.ts";

export type AnaidFactoryOptions = {
    defaultLen?: number;
    prefix?: string;
    timestamp?: boolean;
    bufferSize?: number;
};

export type AnaidFn<T extends Record<string, string>> = {
    (l?: number): string;
    (prefix: keyof T | undefined, l?: number): string;
};
export function anaidFactory<T extends Record<string, string>>(
    prefixes: T = {} as T,
    defaultLen: number = 16,
    timestamp = true,
    generator: () => Generator<number> = cryptoGenerator(1024),
): AnaidFn<T> {
    const fn: AnaidFn<T> = (
        maybeLenOrPrefix: keyof T | number | undefined = undefined,
        len = defaultLen,
    ) => {
        if (typeof maybeLenOrPrefix === "number") {
            return fn(undefined, maybeLenOrPrefix);
        }
        const prefix = maybeLenOrPrefix && prefixes[maybeLenOrPrefix];
        let result = prefix || "";
        if (timestamp) {
            const days = (Date.now() / MILLISECONDS_IN_HOURS) | 0;
            result += hashInt(days);
        }
        for (const b of generator()) {
            result += (b % 32).toString(32);
            if (result.length === len) return result;
        }
        return result;
    };
    return fn;
}

// deno-lint-ignore ban-types
export const anaid: AnaidFn<{}> = anaidFactory();
/** @internal exported for testing */
export function hashInt(n: number) {
    n = ((n >>> 5) | (n << (32 - 5))) >>> 0;
    n = Math.imul(n, 11 ** 8) >>> 0;
    return (n % 1048571)
        .toString(32)
        .padStart(4, "0");
}

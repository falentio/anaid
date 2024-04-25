import { EIGHT_HOURS } from "./constant.ts";
import { cryptoGenerator } from "./random.ts";

export type AnaidFactoryOptions = {
    defaultLen?: number;
    prefix?: string;
    timestamp?: boolean;
    bufferSize?: number;
};

// deno-lint-ignore ban-types
export type AnaidFn<T extends Record<string, string> = {}> = {
    (l?: number): string;
    (prefix: keyof T | undefined, l?: number): string;
};

export function anaidFactory<T extends Record<string, string>>(
    prefixes: T = {} as T,
    defaultLen: number = 16,
    timestamp = true,
    generator: () => Iterable<number> = cryptoGenerator(1024),
): AnaidFn<T> {
    return function fn(
        maybeLenOrPrefix: keyof T | number | undefined = undefined,
        len: number = defaultLen,
    ) {
        if (typeof maybeLenOrPrefix === "number") {
            len = maybeLenOrPrefix;
            maybeLenOrPrefix = undefined;
        }
        let result = maybeLenOrPrefix && prefixes[maybeLenOrPrefix] || "";
        if (timestamp) {
            const h = ((Date.now() - 1409904000000) / EIGHT_HOURS) | 0;
            result += h.toString(32).padStart(3, "0");
        }
        for (const b of generator()) {
            result += (b % 32).toString(32);
            if (result.length >= len) return result;
        }
        return result;
    };
}

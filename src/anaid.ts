import { timestampHash } from "./hash.ts";
import { cryptoGenerator } from "./random.ts";

export type AnaidFactoryOptions = {
    defaultLen?: number;
    prefix?: string;
    timestamp?: boolean;
    bufferSize?: number;
};

export type AnaidFn<T extends string> = {
    (l?: number): string;
    (prefix: T, l?: number): string;
};

export function anaidFactory<T extends string = string>(
    defaultLen: number = 16,
    timestamp = true,
    generator: () => Iterable<number> = cryptoGenerator(1024),
): AnaidFn<T> {
    return function (
        maybeLenOrPrefix: T | number | undefined = undefined,
        len: number = defaultLen,
    ) {
        let prefix = maybeLenOrPrefix as string | undefined
        if (typeof maybeLenOrPrefix === "number") {
            len = maybeLenOrPrefix;
            prefix = undefined;
        }
        let result = prefix || "";
        result += timestamp ? timestampHash() : "";
        for (const b of generator()) {
            result += ((b / 255 * 46656) % 36 | 0).toString(36);
            if (result.length >= len) return result;
        }
        return result;
    };
}

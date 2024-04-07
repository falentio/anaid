import { MILLISECONDS_IN_HOURS } from "./constant.ts";

export type AnaidFactoryOptions = {
    defaultLen?: number;
    prefix?: string;
    timestamp?: boolean;
    bufferSize?: number;
};

export type AnaidFn = (l?: number) => string;

export function anaidFactory(opts: AnaidFactoryOptions = {}): AnaidFn {
    const {
        defaultLen = 16,
        prefix = "",
        timestamp = true,
        bufferSize = 1024,
    } = opts;
    let bytes = crypto.getRandomValues(
        new Uint8Array(
            new ArrayBuffer(bufferSize),
        ),
    );
    let offset = 0;
    return (l = defaultLen) => {
        let result = prefix;
        if (timestamp) {
            const days = (Date.now() / MILLISECONDS_IN_HOURS) | 0;
            result += hashInt(days);
        }
        const over = result.length;
        const size = Math.ceil(l - over);
        let remain = 0;
        for (let i = 0; i < l; i++) {
            let b = bytes[i + offset];
            b += remain * 36;
            remain = b % 36;
            b -= remain;
            b /= 36;
            result += b.toString(36);
            offset++;
            if (offset === bufferSize) {
                bytes = crypto.getRandomValues(bytes);
                offset = 0;
            }
        }
        return result.slice(0, l);
    };
}

export const anaid: AnaidFn = anaidFactory();

/** @internal exported for testing */
export function hashInt(n: number) {
    n = ((n >>> 5) | (n << (32 - 5))) >>> 0;
    n = Math.imul(n, 11 ** 8) >>> 0;
    return (n % 1679616)
        .toString(36)
        .padStart(4, "0");
}

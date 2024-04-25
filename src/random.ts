export type RandomNumberGenerator = () => Generator<number>;

export function cryptoGenerator(bufferSize = 1024): () => Iterable<number> {
    const bytes = new Uint8Array(bufferSize);
    let offset = bufferSize;
    return function* () {
        while (true) {
            if (offset === bufferSize) {
                crypto.getRandomValues(bytes);
                offset = 0;
            }
            yield bytes[offset++];
        }
    };
}

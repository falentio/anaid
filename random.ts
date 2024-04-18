export type RandomNumberGenerator = () => Generator<number>;

export function cryptoGenerator(bufferSize = 1024): () => Generator<number> {
    let bytes = new Uint8Array(bufferSize);
    let offset = bufferSize;
    return function* () {
        while (true) {
            if (offset === bufferSize) {
                bytes = crypto.getRandomValues(bytes);
                offset = 0;
            }
            yield bytes[offset++];
        }
    };
}

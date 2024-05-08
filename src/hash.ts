export function intHash(i: number) {
    return ((i * 377771) % 31771).toString(32).padStart(3, "0");
}

const HOUR = 60 * 60 * 1000;
export function timestampHash(now = Date.now()) {
    return intHash(now / HOUR | 0);
}

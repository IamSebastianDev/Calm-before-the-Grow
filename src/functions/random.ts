/** @format */

export const random = <T>(iterable: T[]) => {
    return iterable[Math.floor(Math.random() * iterable.length) * 1];
};

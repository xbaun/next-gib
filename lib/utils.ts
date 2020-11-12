export const isBrowser = () => {
    return typeof window !== 'undefined';
};

export const containsText = (base: string | undefined, test: string | RegExp) => {
    return !!~(base?.search(test) || -1);
};

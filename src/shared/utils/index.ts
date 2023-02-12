export const debounce = <T>(fn: (...args: T[]) => any, timeout = 1000) => {
    let timer: NodeJS.Timeout;

    const clear = () => {
        timer && clearTimeout(timer);
    };

    const run = (..._args: T[]) => {
        clear();

        timer = setTimeout(() => {
            fn();
        }, timeout);
    };

    return { run, clear };
};

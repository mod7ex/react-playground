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

export let slow = <T>(fn: () => T, time: number) => {
    return new Promise<T>((resolve) => {
        setTimeout(() => resolve(fn()), time);
    });
};

export let sleep = <T>(time: number) => {
    return new Promise<T>((resolve) => {
        setTimeout(resolve, time);
    });
};

export const forever = new Promise((resolve) => {});

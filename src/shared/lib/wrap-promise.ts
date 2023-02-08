enum STATUS {
    IDLE = "idle",
    PENDING = "pending",
    SUCCESS = "success",
    ERROR = "error",
}

export default function <T>(fn: (...args: any[]) => Promise<T>) {
    let status = STATUS.IDLE;
    let response: T | null;
    let error: unknown;

    const reset = () => {
        status = STATUS.IDLE;
        response = null;
        error = null;
    };

    const handler = {
        idle: () => {
            throw Promise.resolve();
        },
        pending: () => {
            throw Promise.resolve();
        },
        error: () => {
            throw error;
        },
        success: () => response,
    };

    const start = function <A>(...args: A[]) {
        if (status !== STATUS.IDLE) return;

        status = STATUS.PENDING;

        fn(...args)
            .then((res) => {
                if (status === STATUS.IDLE) return;
                status = STATUS.SUCCESS;
                response = res;
            })
            .catch((e) => {
                if (status === STATUS.IDLE) return;
                status = STATUS.ERROR;
                error = e;
            });
    };

    const read = <A>({ auto, args }: { auto?: boolean; args?: A[] } = {}) => {
        if (auto) start(...(args ?? []));
        return handler[status]()!;
    };

    return { read, start, reset };
}

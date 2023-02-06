type Statuses = "pending" | "error" | "success" | "idle";

export default function <T>(fn: (...args: any[]) => Promise<T>) {
    let status: Statuses = "idle";
    let response: T | null;
    let error: unknown;

    const reset = () => {
        status = "idle";
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
        if (status !== "idle") return;

        status = "pending";

        fn(...args).then(
            (res) => {
                if (status !== "idle") {
                    status = "success";
                    response = res;
                }
            },
            (e) => {
                if (status !== "idle") {
                    status = "error";
                    error = e;
                }
            }
        );
    };

    const read = <A>({ auto, args }: { auto?: Boolean; args?: A[] } = {}) => {
        if (auto) start(...(args ?? []));
        return handler[status]()!;
    };

    return { read, start, reset };
}

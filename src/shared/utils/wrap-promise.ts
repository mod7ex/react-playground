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
        status = "pending";

        fn(...args).then(
            (res) => {
                status = "success";
                response = res;
            },
            (e) => {
                status = "error";
                error = e;
            }
        );
    };

    const read = () => {
        return handler[status]()!;
    };

    return { read, start, reset };
}

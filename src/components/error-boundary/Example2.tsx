import { useCallback, useEffect, useState } from "react";
import ErrorBoundary from "~/shared/lib/error-boundary/ErrorBoundary";

const Corrupted: React.FC<{ count: number; inc: () => void }> = ({ inc, count }) => {
    if (count === 3) throw Error("some thing went wrong");

    return (
        <div>
            <h1>Hello {count}</h1>
            <button onClick={inc}>increment</button>
        </div>
    );
};

const Fallback: React.ComponentProps<typeof ErrorBoundary>["FallbackComponent"] = ({ resetErrorBoundary, error }) => {
    return (
        <div>
            <h1>{error?.message}</h1>
            <button onClick={resetErrorBoundary}>retry</button>
        </div>
    );
};

export default () => {
    const [count, setCount] = useState(0);

    const onReset = useCallback(() => setCount(0), []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCount((v) => v + 1);
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    });

    return (
        <div>
            <button onClick={() => setCount(4)}>change reset keys to re-render or clear error</button>

            <ErrorBoundary onReset={onReset} FallbackComponent={Fallback} resetKeys={[count]}>
                <Corrupted count={count} inc={() => setCount((v) => v + 1)} />
            </ErrorBoundary>
        </div>
    );
};

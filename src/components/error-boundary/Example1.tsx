import { useCallback, useState } from "react";
import ErrorBoundary from "~/shared/lib/error-boundary";

const Corrupted: React.FC<{ count: number; increment: () => void }> = ({ increment, count }) => {
    if (count === 3) throw Error("some thing went wrong");

    return (
        <div>
            <h1>Hello {count}</h1>
            <button onClick={increment}>increment</button>
        </div>
    );
};

const Fallback: React.ComponentProps<typeof ErrorBoundary>["Fallback"] = ({ reset, error }) => {
    return (
        <div>
            <h1>{error?.message}</h1>
            <button onClick={reset}>retry</button>
        </div>
    );
};

export default () => {
    const [count, setCount] = useState(0);

    const onReset = useCallback(() => setCount(0), []);

    return (
        <ErrorBoundary Fallback={Fallback} onReset={onReset}>
            <Corrupted count={count} increment={() => setCount((v) => v + 1)} />
        </ErrorBoundary>
    );
};

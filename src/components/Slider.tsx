import { useState, Children, useEffect, useMemo, useCallback } from "react";

/**
 * Children.toArray
 *
 */

const Slider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [current, set] = useState<number>(0);

    const _children = Children.toArray(children);

    const total = _children.length;

    const next = useCallback(() => {
        // both work
        // set((v) => (v + 1) % (total || 1));
        set((v) => total && (v + 1) % total);
    }, [total]);

    useEffect(() => {
        if (total > 1) {
            const timer = setInterval(next, 1000);

            // IDEMPOTENCE
            return () => clearTimeout(timer);
        }
    }, [next]);

    if (total === 0) return <></>;

    const bullets = Array<string>(total).fill("○");
    bullets[current] = "●";

    return (
        <>
            {_children[current!]}
            <br />
            <ul
                style={{
                    display: "flex",
                    listStyle: "none",
                }}
            >
                {bullets.map((v, i) => (
                    <li key={i}>
                        <h1>{v}</h1>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Slider;

// Usage

/*
import { useState } from "react";
import Slider from "./components/Slider";

function App() {
    const [is, setIs] = useState(false);

    const [count, setCount] = useState(0);

    const items = Array<number>(count).fill(0);

    return (
        <>
            {is ? "yes" : "no"} / count: {count}
            <hr />
            {is && (
                <Slider>
                    {items.map((_, v) => (
                        <h1 key={v}>{v}</h1>
                    ))}
                </Slider>
            )}
            <hr />
            <button onClick={() => setIs((v) => !v)}>toggle</button>
            <br />
            <button onClick={() => setCount((v) => v + 1)}>increment</button>
        </>
    );
}

export default App;
*/

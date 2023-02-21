import { Suspense, useCallback, useState, useTransition } from "react";
import { suspend } from "~/shared/lib";
import { slow } from "~/shared/utils";
import { DelayRender } from "~/components";

const LIST_SIZE = 300000;

const Example1 = () => {
    const [isPending, startTransition] = useTransition();

    const [input, setInput] = useState("");

    const [list, setList] = useState<string[]>([]);

    const handelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setInput(v);

        startTransition(() => {
            // Concurrency Feature
            // Low priority code
            const l = [];
            for (let i = 0; i < LIST_SIZE; i++) l.push(v);
            setList(l);
        });
    }, []);

    return (
        <>
            <input type="text" value={input} onChange={handelChange} />
            {isPending
                ? "Loading..."
                : list.map((item, i) => {
                      return <div key={i}>{item}</div>;
                  })}
        </>
    );
};

// ******************************************************************************************************************************

const data = [
    { id: 0, items: ["Pizza-0 0", "Pizza-0 1", "Pizza-0 2"], delay: 1000 },
    { id: 1, items: ["Pizza-1 0", "Pizza-1 1", "Pizza-1 2"], delay: 2000 },
    { id: 2, items: ["Pizza-2 0", "Pizza-2 1", "Pizza-2 2"], delay: 1500 },
];

const usePizza = (id: number) => {
    const pizza = data.find((_) => id === _.id);

    const load = () => slow(() => pizza, pizza?.delay ?? 1000);

    return suspend(load, id.toString());
};

const Gallery: React.FC<{ pizza: typeof data[number] }> = ({ pizza }) => {
    const [current, setCurrent] = useState(0);

    const items = pizza.items;

    const next = useCallback(() => {
        setCurrent((v) => (v + 1) % items.length);
    }, []);

    const previous = useCallback(() => {
        setCurrent((v) => (v + items.length - 1) % items.length);
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <button onClick={() => previous()}>previous</button>
            <div>{items[current]}</div>
            <button onClick={() => next()}>next</button>
        </div>
    );
};

const Pizza = () => {
    const [id, setId] = useState(data[0].id);

    const [pending, startTransition] = useTransition();

    const pizza = usePizza(id);

    const next = useCallback(() => {
        startTransition(() => {
            setId((v) => (v + 1) % data.length);
        });
    }, []);

    const previous = useCallback(() => {
        startTransition(() => {
            setId((v) => (v + data.length - 1) % data.length);
        });
    }, []);

    return (
        <>
            <div>
                <button onClick={() => previous()}>previous</button>
                <button onClick={() => next()}>next</button>
            </div>

            <br />
            {pending && (
                <DelayRender delay={50}>
                    <p>... loading</p>
                </DelayRender>
            )}
            <br />

            {/* @ts-ignore */}
            <Gallery pizza={pizza!} />
        </>
    );
};

export default () => {
    return (
        <Suspense fallback={"loading ..."}>
            <Pizza />
        </Suspense>
    );
};

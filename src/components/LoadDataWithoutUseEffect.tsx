import { Suspense, useEffect, useState } from "react";
import { suspend, wrapPromise } from "~/shared/lib";

const fetchData = () =>
    new Promise<string>((resolve) => {
        console.log("Loading started ...");
        setTimeout(() => {
            resolve("Data list");
        }, 2000);
    });

const resource = wrapPromise(fetchData);

const Data = () => {
    const data = resource.read({ auto: true });

    useEffect(() => {
        return () => resource.reset();
    });

    return <h1>{data}</h1>;
};

const SomeData = () => {
    const data = suspend(fetchData, "some-key");

    useEffect(() => {
        return () => resource.reset();
    });

    return <h1>{data}</h1>;
};

export default () => {
    const [isUp, toggle] = useState(false);

    return (
        <>
            {isUp && (
                <Suspense fallback={"loading ..."}>
                    <SomeData />
                    {/* <Data / */}
                </Suspense>
            )}

            <button onClick={() => toggle((v) => !v)}>click</button>
        </>
    );
};

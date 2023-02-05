import { Suspense, useState } from "react";
import { wrapPromise } from "~/shared/utils";

const fetchData = () =>
    new Promise<string>((resolve) => {
        console.log("Loading started ...");
        setTimeout(() => {
            resolve("Data list");
        }, 2000);
    });

const resource = wrapPromise(fetchData);

const Data = () => {
    const data = resource.read();

    return <h1>{data}</h1>;
};

export default () => {
    const [isUp, toggle] = useState(false);

    const onClick = () => {
        !isUp && resource.start(); // start loading data

        toggle((v) => !v);
    };

    return (
        <>
            {isUp && (
                <Suspense fallback={"loading ..."}>
                    <Data />
                </Suspense>
            )}

            <button onClick={onClick}>click</button>
        </>
    );
};

/*

export default () => {
    throw new Promise((resolve) => {
        setTimeout(() => {
            resolve("Cool");
        }, 2000);
    });

    // return <>other</>; 
};

*/

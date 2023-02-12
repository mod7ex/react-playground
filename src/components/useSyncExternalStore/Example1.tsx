import { useSyncExternalStore } from "react";

const subscribe: (l: () => void) => () => void = (listener) => {
    addEventListener("resize", listener);

    return () => {
        removeEventListener("resize", listener);
    };
};

const getSnapshot = () => {
    return window.innerWidth;
};

export default () => {
    const width = useSyncExternalStore(subscribe, getSnapshot);

    return <h1>width: {width}</h1>;
};

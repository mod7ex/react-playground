import { useSyncExternalStore } from "react";

type Tfn = () => void;

const subscribe: (l: Tfn) => Tfn = (notify) => {
    addEventListener("resize", notify);

    return () => {
        removeEventListener("resize", notify);
    };
};

const getSnapshot = () => {
    return window.innerWidth;
};

export default () => {
    const width = useSyncExternalStore(subscribe, getSnapshot);

    return <h1>width: {width}</h1>;
};

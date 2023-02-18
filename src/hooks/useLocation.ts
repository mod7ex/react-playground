import { useSyncExternalStore } from "react";

// Enable <onpushstate> in config

const subscribe = (notify: () => void) => {
    /* window.addEventListener("popstate", notify); */
    // @ts-ignore
    history.onpushstate = (v) => {
        console.log(v);
        notify();
    };

    /* return () => removeEventListener("popstate", notify); */
    return () => {
        // @ts-ignore
        delete history.onpushstate;
    };
};

const getSnapShot = () => {
    return document.location.href;
};

export default () => useSyncExternalStore(subscribe, getSnapShot);

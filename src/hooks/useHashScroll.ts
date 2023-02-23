import { useEffect } from "react";

const scrollToHash = (top: number) => {
    if ("scrollBehavior" in document.documentElement.style) return window.scrollTo({ top, behavior: "smooth" });
    else window.scrollTo(0, top);
};

const createFinder = () => {
    let timer: NodeJS.Timeout;

    const clear = () => {
        timer && clearInterval(timer);
    };

    const find = (hash: string) => {
        return new Promise<Element | null>((resolve) => {
            const el = document.querySelector(hash);
            if (el) {
                clear();
                resolve(el);
            }

            timer = setInterval(() => {
                console.log("Trial");
                const _el = document.querySelector(hash);
                if (_el) {
                    clear();
                    resolve(_el);
                }
            }, 100);
        });
    };

    return {
        clear,
        find,
    };
};

const useHashScroll = (hash: string | undefined) => {
    const { clear, find } = createFinder();

    useEffect(() => {
        if (hash) {
            find(hash).then((el) => {
                // @ts-ignore
                el && scrollToHash(el.offsetTop);
            });

            return () => {
                clear();
            };
        }
    });
};

export default useHashScroll;

import { useEffect } from "react";

const scrollToHash = (top: number) => {
    if ("scrollBehavior" in document.documentElement.style) return window.scrollTo({ top, behavior: "smooth" });
    else window.scrollTo(0, top);
};

const createFinder = (max_count = 50) => {
    let timer: NodeJS.Timeout;
    let count = 0;

    const clear = () => {
        timer && clearInterval(timer);
    };

    const find = (hash: string) => {
        return new Promise<Element | null>((resolve) => {
            const el = document.querySelector(hash);
            count++;
            if (el) {
                clear();
                resolve(el);
            } else {
                timer = setInterval(() => {
                    console.log("retry");
                    const _el = document.querySelector(hash);
                    count++;
                    if (_el) {
                        clear();
                        resolve(_el);
                    }
                    if (max_count < count) clear();
                }, 100);
            }
        });
    };

    return {
        clear,

        find,
    };
};

const useHashScroll = (hash: string | undefined) => {
    useEffect(() => {
        if (hash) {
            const { clear, find } = createFinder();

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

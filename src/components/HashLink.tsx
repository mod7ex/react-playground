import { useEffect } from "react";

const scrollToHash = (top: number) => {
    if ("scrollBehavior" in document.documentElement.style) return window.scrollTo({ top, behavior: "smooth" });
    else window.scrollTo(0, top);
};

const createFinder = (max_count = 50) => {
    let timer: NodeJS.Timeout;
    let count = 0;

    const clear = () => {
        count = 0;
        timer && clearInterval(timer);
    };

    const scroll = (hash: string) => {
        const el = document.querySelector(hash);
        count++;
        if (el) {
            clear();
            // @ts-ignore
            scrollToHash(el.offsetTop);
        } else {
            timer = setInterval(() => {
                console.log(`${count} - Trial`);
                const _el = document.querySelector(hash);
                count++;
                if (_el) {
                    clear();
                    // @ts-ignore
                    scrollToHash(_el.offsetTop);
                }
                if (max_count < count) clear();
            }, 1000);
        }
    };

    return {
        clear,
        scroll,
    };
};

const { clear, scroll } = createFinder();

const HashLink: React.FC<React.ComponentProps<"a"> & { hash: string }> = ({ children, hash, onClick, ...props }) => {
    useEffect(() => {
        if (hash) {
            return () => {
                clear();
            };
        }
    });

    const handelClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onClick?.(e);
        e.preventDefault();
        if (hash) {
            clear();
            scroll(hash);
        }
    };

    return (
        <a href="!#" onClick={(e) => handelClick(e)} {...props}>
            {children}
        </a>
    );
};

export default HashLink;

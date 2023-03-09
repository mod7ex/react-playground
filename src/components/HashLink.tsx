import { useEffect } from "react";
import { Link } from "react-router-dom";

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

const HashLink: React.FC<React.ComponentProps<typeof Link>> = ({ to, children, onClick, ...props }) => {
    let hash = "";
    if (typeof to === "string") hash = new URL(to, location.origin).hash;
    else hash = to.hash ?? "";

    useEffect(() => {
        if (hash) {
            return () => {
                clear();
            };
        }
    });

    const handelClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onClick?.(e);
        /* e.preventDefault(); // TODO */
        if (hash) {
            clear();
            scroll(hash);
        }
    };

    return (
        <Link to={to} onClick={(e) => handelClick(e)} {...props}>
            {children}
        </Link>
    );
};

export default HashLink;

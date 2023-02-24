import { useEffect } from "react";
import { Link } from "react-router-dom";

const scrollToHash = (top: number) => {
    if ("scrollBehavior" in document.documentElement.style) return window.scrollTo({ top, behavior: "smooth" });
    else window.scrollTo(0, top);
};

const createFinder = () => {
    let timer: NodeJS.Timeout;

    const clear = () => {
        timer && clearInterval(timer);
    };

    const scroll = (hash: string) => {
        const el = document.querySelector(hash);
        if (el) {
            clear();
            // @ts-ignore
            scrollToHash(el.offsetTop);
        } else {
            timer = setInterval(() => {
                console.log("Trial");
                const _el = document.querySelector(hash);
                if (_el) {
                    clear();
                    // @ts-ignore
                    scrollToHash(_el.offsetTop);
                }
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
    const hash = typeof to === "string" ? to.split("#")[1] : "";

    const scrollToHash = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onClick?.(e);
        e.preventDefault();
        if (hash) scroll(`#${hash}`);
    };

    useEffect(() => {
        if (hash) {
            return () => {
                clear();
            };
        }
    });

    return (
        <Link to={to} onClick={(e) => scrollToHash(e)} {...props}>
            {children}
        </Link>
    );
};

export default HashLink;

import { useEffect, useState } from "react";

const DelayRender: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setShow(true);
        }, delay);

        return () => clearTimeout(id);
    });

    if (!show) return null;

    return <>{children}</>;
};

export default DelayRender;

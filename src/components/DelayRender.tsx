import { useEffect, useState } from "react";

const DelayRender: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => {
            setShow(true);
        }, delay);

        // idempotence
        return () => clearTimeout(id);
    });

    if (show) return <>{children}</>;

    return null;
};

export default DelayRender;

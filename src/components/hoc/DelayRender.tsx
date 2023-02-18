import { useEffect, useState } from "react";

const DelayRender = <T extends {}>(Comp: React.FC<T>, delay: number = 500) => {
    return (props: T) => {
        const [show, setShow] = useState(false);

        useEffect(() => {
            const id = setTimeout(() => {
                setShow(true);
            }, delay);

            return () => clearTimeout(id);
        });

        if (!show) return null;

        return <Comp {...props} />;
    };
};

export default DelayRender;

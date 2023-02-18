import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";

const target = document.getElementById("modal")!;

const Modal: React.FC<{ up: boolean; onClose: () => void; marker: string }> = ({ up, onClose, marker }) => {
    const container = useMemo(() => {
        const _container = document.createElement("div");
        _container.dataset.marker = marker;
        return _container;
    }, [marker]);

    useEffect(() => {
        if (!up) return;

        target.appendChild(container);

        // IDEMPOTENCE
        return () => {
            target.removeChild(container);
        };
    });

    const _onClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLDivElement).dataset.role === "overlay") onClose();
    };

    if (!up) return null;

    return createPortal(
        <div className={styles.overlay} data-role="overlay" onClick={(e) => _onClose(e)}>
            <div role="dialog" className={styles.container}>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
        </div>,
        container
    );
};

export default () => {
    const [up, setUp] = useState(false);

    return (
        <>
            <button onClick={() => setUp(true)}>click</button>
            <Modal up={up} onClose={() => setUp(false)} marker="some-data" />
        </>
    );
};

import { useEffect, useRef } from "react";

export default () => {
    const stateRef = useRef(1);
    const isDirty = useRef(false); // for Strict Mode [useEffect is ran twice]

    useEffect(() => {
        stateRef.current++;

        return () => {
            // should run only in DEV
            if (isDirty.current) return;

            stateRef.current--;

            isDirty.current = true;
        };
    });

    return stateRef.current;
};

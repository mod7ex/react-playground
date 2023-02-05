import { useRef } from "react";

export default () => {
    const stateRef = useRef(true);

    if (stateRef.current) {
        stateRef.current = false;

        return true;
    }

    return stateRef.current;
};

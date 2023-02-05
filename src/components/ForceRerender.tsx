import { useReducer, useState } from "react";

export default () => {
    const [_, forceUpdate] = useReducer((v) => v + 1, 0);

    const [state, setState] = useState(0);

    const onChange = () => {
        setState((v) => v);
        forceUpdate();
    };

    return (
        <>
            {state}
            <br />
            <button onClick={onChange}>click</button>
        </>
    );
};

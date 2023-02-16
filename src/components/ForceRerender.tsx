import { useReducer, useState } from "react";

export default () => {
    const [_, forceUpdate] = useReducer((v) => v + 1, 0);

    const [state, setState] = useState(0);

    console.log("re-render just took place");

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

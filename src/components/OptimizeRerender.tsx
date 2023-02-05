import { memo, useCallback, useState } from "react";

const Input = memo<{ id: number; value: string; onChange: (id: number, v: string) => void }>(({ id, value, onChange }) => {
    return (
        <div style={{ border: "1px solid black" }}>
            <h1>{id}</h1>
            <br />
            <input type="text" value={value} onChange={(e) => onChange(id, e.target.value)} />
        </div>
    );
});

export default () => {
    const [state, setState] = useState([
        {
            id: 1,
            value: "",
        },
        {
            id: 2,
            value: "",
        },
        {
            id: 3,
            value: "",
        },
    ]);

    const onChange = useCallback((id: number, payload: string) => {
        setState((_state) => {
            _state[state.findIndex(({ id: _id }) => id === id)].value = payload;
            return [..._state];
        });
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <h1>Inputs</h1>
            <p>{JSON.stringify(state)}</p>
            <hr />
            <div style={{ display: "flex", gap: "1rem" }}>
                {state.map(({ id, value }) => (
                    <Input id={id} value={value} key={id} onChange={onChange} />
                ))}
            </div>
        </div>
    );
};

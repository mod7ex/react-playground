import { createContext, useContext } from "react";

type RawContextState = { checked?: boolean; onChange?: (v: boolean) => void; id?: string };

const Context = createContext<null | RawContextState>(null);

export const Input = () => {
    const state = useContext(Context);

    if (!state) throw Error("Input should be wrapped inside a <CheckBox /> component");

    const { checked, onChange, id } = state;

    const _onChange = onChange ?? (() => {});

    return <input id={id} type="checkbox" checked={checked} onChange={(e) => _onChange(e.target.checked)} />;
};

export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const state = useContext(Context);

    if (!state) throw Error("Input should be wrapped inside a <CheckBox /> component");

    const { id } = state;

    return <label htmlFor={id ?? ""}>{children}</label>;
};

interface Props extends RawContextState {
    children: React.ReactNode;
}

export const CheckBox: React.FC<Props> = ({ children, id, onChange, checked }) => {
    return (
        <Context.Provider value={{ checked, onChange, id }}>
            {checked ? "checked" : "unchecked"}
            <br />
            {children}
        </Context.Provider>
    );
};

// Usage

/*

import { useState } from "react";
import { CheckBox, Input, Label } from "./components/CompoundComponentsContext";

function App() {
  const [checked, setChecked] = useState(false);

  const log = (v: boolean) => {
    console.log(v);
    setChecked(v);
  };

  return (
    <>
      <CheckBox id="input" checked={checked} onChange={log}>
        <Label>check me out</Label>
        <div>
          <Input />
        </div>
      </CheckBox>

      <hr />

      <button onClick={() => setChecked((v) => !v)}>click</button>
    </>
  );
}

export default App;

*/

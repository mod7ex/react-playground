import { Children, cloneElement, useId } from "react";

interface InputProps {
    id?: string;
    checked?: boolean;
    onChange?: (c: boolean) => void;
}

export const Input: React.FC<InputProps> = ({ checked, onChange, id }) => {
    return <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />;
};

type LabelProps = React.PropsWithChildren<{ id?: string }>;

export const Label: React.FC<LabelProps> = ({ children, id }) => {
    return <label htmlFor={id}>{children}</label>;
};

type Props = React.PropsWithChildren<{
    id?: string;
    onChange?: (v: boolean) => void;
    checked?: boolean;
}>;

export const CheckBox: React.FC<Props> = ({ children, id, onChange, checked }) => {
    if (!id) id = useId();

    const _children = Children.map(children, (child, _) => {
        // @ts-ignore
        if (child?.type === Input) {
            // @ts-ignore
            return cloneElement(child, {
                checked,
                onChange,
                id,
            });
        }

        // @ts-ignore
        if (child?.type === Label) return cloneElement(child, { id });

        return null; // whitelisting
    });

    return (
        <>
            {checked ? "checked" : "unchecked"}
            <br />
            {_children}
        </>
    );
};

// Usage

/*

import { CheckBox, Input, Label } from "./components/CompoundComponents";

function App() {
  const [checked, setChecked] = useState(false);

  const log = (v: boolean) => {
    console.log(v);
    setChecked(v);
  };

  return (
    <>
      <CheckBox id="input" checked={checked} onChange={log}>
        <Label id="some-Id">check me out</Label>
        <Input />
      </CheckBox>

      <hr />

      <button onClick={() => setChecked((v) => !v)}>click</button>
    </>
  );
}

export default App;

*/

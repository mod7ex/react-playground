import { useCallback, useState } from "react";

type Props = { count: number; increment: () => void };

const HOC = (Comp: React.FC<Props>) => {
    // share State-Logic
    return () => {
        const [count, setCount] = useState(0);

        const increment = useCallback(() => setCount((v) => v + 1), []);

        return <Comp count={count} increment={increment} />;
    };
};

const User1: React.FC<Props> = ({ count, increment }) => {
    return (
        <div>
            <h2>User 1 is {count} years old</h2>

            <button onClick={increment}>increment the age of user 1 </button>
        </div>
    );
};

const User2: React.FC<Props> = ({ count, increment }) => {
    return (
        <div>
            <h2>User 2 is {count} years old</h2>

            <button onClick={increment}>increment the age of user 2 </button>
        </div>
    );
};

const StateFullUser1 = HOC(User1);
const StateFullUser2 = HOC(User2);

export default () => {
    return (
        <>
            <StateFullUser1 />
            <hr />
            <StateFullUser2 />
        </>
    );
};

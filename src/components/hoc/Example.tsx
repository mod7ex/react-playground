import { useState } from "react";

type Props = { count: number; increment: () => void };

const HOC = (Comp: React.FC<Props>) => {
    return () => {
        const [count, setCount] = useState(0);

        return <Comp count={count} increment={() => setCount((v) => v + 1)} />;
    };
};

const User1: React.FC<Props> = ({ count, increment }) => {
    return (
        <>
            <h2>User 1 is {count} years old</h2>

            <button onClick={() => increment()}>increment the age of user 1 </button>
        </>
    );
};

const User2: React.FC<Props> = ({ count, increment }) => {
    return (
        <>
            <h2>User 2 is {count} years old</h2>

            <button onClick={() => increment()}>increment the age of user 2 </button>
        </>
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

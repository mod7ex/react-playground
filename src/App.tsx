// https://www.youtube.com/watch?v=f2mMOiCSj5c&ab_channel=CodingTech [IMPORTANT]

import { cloneElement } from "react";

const Row: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => {
    return <h1 title={title}>{children}</h1>;
};

// prettier-ignore
const clonedElement = cloneElement(
  <Row title="Cabbage">
    Hello
  </Row>,
  { isHighlighted: true, title: 'Something else' },
  'Goodbye'
);

console.log(clonedElement);

function App() {
    return (
        <>
            <Row title="Hi">Hi</Row>

            <br />

            {clonedElement}
        </>
    );
}

export default App;

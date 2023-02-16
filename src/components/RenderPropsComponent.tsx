import useAsync from "~/hooks/useAsync";

/**
 * Render props is basically passing a function (as prop) that will take care of rendering
 */

interface Props {
    resource: string;
    children: (v: ReturnType<typeof useAsync>) => React.ReactNode;
    // render: (v: ReturnType<typeof useAsync>) => React.ReactNode; // in this case we have only one item so we use children
}

const Raw: React.FC<Props> = ({ resource, children }) => {
    // Takes care of state & logic
    // UI-agnostic

    const state = useAsync(async () => {
        const response = await fetch(resource);
        if (!response.ok) throw Error("Something went wrong");
        return response.json();
    });

    return <>{children(state)}</>;
};

export default () => {
    // Takes care of rendering

    return (
        <Raw resource="https://jonplaceholder.typicode.com/todos/1">
            {({ pending, error, result }) => {
                // @ts-ignore
                if (error) return <h1>Something went wrong: {error?.message}</h1>;

                if (pending) return <h1>pending ...</h1>;

                return <p>{JSON.stringify(result)}</p>;
            }}
        </Raw>
    );
};

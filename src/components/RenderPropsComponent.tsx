import useAsync from "../hooks/useAsync";

// UI-agnostic

interface Props {
    resource: string;
    children: (v: ReturnType<typeof useAsync>) => React.ReactNode;
    // render: (v: ReturnType<typeof useAsync>) => React.ReactNode;
}

const Raw: React.FC<Props> = ({ resource, children }) => {
    const state = useAsync(async () => {
        const response = await fetch(resource);
        if (!response.ok) throw Error("Something went wrong");
        return response.json();
    });

    return <>{children(state)}</>;
};

export default Raw;

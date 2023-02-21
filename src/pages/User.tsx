import { useLoaderData } from "react-router-dom";

const User = () => {
    const user = useLoaderData() as any;

    return (
        <div>
            <h1>User {user.id}</h1>
            <hr />
            <h2>
                {user.name} - {user.email}
            </h2>
        </div>
    );
};

export default User;

import { useLoaderData, Link } from "react-router-dom";

const Dashboard = () => {
    const data = useLoaderData() as {
        name: string;
        email: string;
        id: number;
    }[];

    return (
        <div>
            <h1>Dashboard</h1>
            <hr />
            {data.map(({ name, email, id }, index) => (
                <div key={index}>
                    <h2>
                        <Link to={`/user/${id}`}>
                            USER: {id} / {name} - {email}
                        </Link>
                    </h2>
                    <br />
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Dashboard;

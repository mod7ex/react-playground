import { useEffect } from "react";
import { wrapPromise } from "~/shared/lib";
import { mockUsersList } from "~/shared/mocks";
import { Link } from "react-router-dom";

const fetchData = () =>
    new Promise<ReturnType<typeof mockUsersList>>((resolve) => {
        setTimeout(() => {
            resolve(mockUsersList());
        }, 2000);
    });

const resource = wrapPromise(fetchData);

const Contact = () => {
    const data = resource.read({ auto: true });

    useEffect(() => {
        return () => resource.reset();
    });

    return (
        <div>
            <h1>Contact ('wrapPromise & Suspense' is used for loading data)</h1>
            <hr />
            <br />
            <br />
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

export default Contact;

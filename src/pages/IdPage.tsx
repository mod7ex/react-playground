import { useEffect } from "react";
import { wrapPromise } from "~/shared/lib";
import { mockUsersList } from "~/shared/mocks";
import { Link } from "react-router-dom";
import { useHashScroll } from "~/hooks";

const fetchData = () =>
    new Promise<ReturnType<typeof mockUsersList>>((resolve) => {
        setTimeout(() => {
            resolve(mockUsersList());
        }, 3000);
    });

const resource = wrapPromise(fetchData);

const IdPage = () => {
    useHashScroll("#page-section-16");

    const _ = resource.read({ auto: true });

    const items = Array(30).fill(0);

    useEffect(() => {
        return () => {
            resource.reset();
        };
    });

    return (
        <div>
            <h1>Id Page</h1>

            <h2>
                Visit :<Link to={`/id-page#page-section-16`}>Page ID 16 Section</Link>
            </h2>

            <br />

            {items.map((_, index) => {
                return (
                    <div key={`page-section-${index + 1}`} id={`page-section-${index + 1}`}>
                        <hr />
                        <br />
                        <h2>Section {index + 1}</h2>
                        <br />
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores reiciendis voluptatum recusandae! A inventore facere perferendis, modi vel ad magni voluptatibus fuga fugit iste. Placeat vero dolorum earum natus fugiat!</p>
                        <br />
                        <hr />
                    </div>
                );
            })}
        </div>
    );
};

export default IdPage;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((v) => (v + 1) % 30);
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    });

    return (
        <div>
            <h1>Home</h1>
            <br />
            <hr />
            <br />
            <h2>
                Visit :<Link to={`/id-page#page-section-${current + 1}`}>Page ID Section {current + 1}</Link>
            </h2>
            <br />
            <br />
            <h2>
                Visit :<Link to={`/id-page#page-section-16`}>Page ID 16 Section</Link>
            </h2>
            <br />
            <hr />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quas saepe illum quod rerum nisi ipsam illo unde nam exercitationem</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quas saepe illum quod rerum nisi ipsam illo unde nam exercitationem</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quas saepe illum quod rerum nisi ipsam illo unde nam exercitationem</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quas saepe illum quod rerum nisi ipsam illo unde nam exercitationem</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quas saepe illum quod rerum nisi ipsam illo unde nam exercitationem</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita quas saepe illum quod rerum nisi ipsam illo unde nam exercitationem</p>
        </div>
    );
};

export default Home;

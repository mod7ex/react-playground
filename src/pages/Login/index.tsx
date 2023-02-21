import styles from "~/pages/Login/index.module.scss";
import { Form } from "react-router-dom";

const Dashboard = () => {
    return (
        <Form method="post" action="/login" className={styles.container}>
            <h1>Login</h1>

            <br />
            <hr />
            <br />

            <input name="username" type="text" placeholder="username" />
            <input name="password" type="password" placeholder="password" />

            <br />

            <input type="submit" value="Login" />
        </Form>
    );
};

export default Dashboard;

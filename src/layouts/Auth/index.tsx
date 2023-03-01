import { Outlet } from "react-router-dom";
import styles from "~/layouts/Auth/index.module.scss";

const AuthLayout = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>auth layout</h1>

            <hr />
            <Outlet />
        </div>
    );
};

export default AuthLayout;

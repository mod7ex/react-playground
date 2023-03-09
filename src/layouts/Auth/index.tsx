import { Outlet, Navigate } from "react-router-dom";
import styles from "~/layouts/Auth/index.module.scss";
import { useAuth } from "~/hooks";
import { memo } from "react";

const AuthLayout = memo(() => {
    const authenticated = useAuth();

    if (authenticated) return <Navigate to="/dashboard" replace />;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>auth layout</h1>

            <hr />
            <Outlet />
        </div>
    );
});

export default AuthLayout;

import { Outlet, NavLink, Form, useNavigation, ScrollRestoration } from "react-router-dom";
import styles from "~/layouts/Root/index.module.scss";
import { useAuth } from "~/hooks";
import { Spinner } from "~/components";
import { Loader } from "~/layouts";

let activeStyle = {
    textDecoration: "underline",
};

const confirmLogout: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (!confirm("Please confirm you want to log out")) {
        e.preventDefault();
    }
};

const NavList = () => {
    const isAuthenticated = useAuth();

    return (
        <nav className={styles.container}>
            <ul className={styles.nav}>
                <li>
                    {/* prettier-ignore */}
                    <NavLink
                        to="/"
                        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
                    >
                        {({ isActive }) => <span>{isActive ? "@Home" : "Home"}</span>}
                    </NavLink>
                </li>

                {isAuthenticated && (
                    <>
                        <li>
                            {/* prettier-ignore */}
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            {/* prettier-ignore */}
                            <NavLink
                                to="/id-page"
                                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
                            >
                                {({ isActive }) => <span>{isActive ? "@id-page" : "id page"}</span>}
                            </NavLink>
                        </li>
                        <li>
                            {/* prettier-ignore */}
                            <NavLink
                                to="/contact"
                                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            {/* prettier-ignore */}
                            <NavLink
                                to="/private-page"
                                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                Private Page
                            </NavLink>
                        </li>
                    </>
                )}

                <li>
                    {isAuthenticated ? (
                        <Form method="post" action="/logout" onSubmit={confirmLogout}>
                            <button className={styles.logout} type="submit">
                                Logout
                            </button>
                        </Form>
                    ) : (
                        <NavLink to="/login" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}>
                            Login
                        </NavLink>
                    )}
                </li>
            </ul>
        </nav>
    );
};

const AppNavigationState = () => {
    let navigation = useNavigation();

    const is_logging_out = navigation.state === "submitting" && navigation.formAction === "/logout";

    return (
        <div
            style={{
                backgroundColor: "black",
                color: "white",
                textAlign: "center",
                padding: "5px",
                marginBottom: "1rem",
            }}
        >
            <p>{navigation.state}</p>
            <p>{is_logging_out && "Logging out ..., see you soon"}</p>
        </div>
    );
};

export const RawRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <header className={styles.header}>
                <NavList />
            </header>

            <main className={styles.content}>
                <AppNavigationState />
                <Loader>{children}</Loader>
            </main>

            <footer className={styles.footer}>
                <p>Copyright 2023</p>
            </footer>

            <ScrollRestoration getKey={(location, _) => location.key /* default behavior */} />
        </>
    );
};

export const Fallback = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            padding: "3rem",
        }}
    >
        <Spinner />
    </div>
);

const Root = () => {
    console.log("hello");
    return (
        <RawRoot>
            <Outlet />
        </RawRoot>
    );
};

export default Root;

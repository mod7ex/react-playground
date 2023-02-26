import { Outlet, NavLink, Form, useNavigation, ScrollRestoration } from "react-router-dom";
import styles from "~/layouts/Root/index.module.scss";
import { useAuth } from "~/hooks";
import { Spinner } from "~/components";
import { Suspense } from "react";

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
                                to="/id-page"
                                className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`}
                            >
                                {({ isActive }) => <span>{isActive ? "@id-page" : "id page"}</span>}
                            </NavLink>
                        </li>
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
                                Contact
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

const LogOutSignal = () => {
    const navigation = useNavigation();

    const is_logging_out = navigation.state === "submitting" && navigation.formAction === "/logout";

    if (is_logging_out)
        return (
            <>
                <hr />
                <span>Logging out ..., see you soon</span>
                <hr />
                <br />
                <br />
            </>
        );

    return null;
};

const RawRoot: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <header className={styles.header}>
                <NavList />
            </header>

            <main className={styles.content}>
                <LogOutSignal />
                {children}
            </main>

            <footer className={styles.footer}>
                <p>Copyright 2023</p>
            </footer>
        </>
    );
};

export const Fallback = () => (
    <div>
        <Spinner />
    </div>
);

const Root: React.FC<React.PropsWithChildren> = ({ children }) => {
    const navigation = useNavigation();

    const isLoading = navigation.state === "loading";

    if (isLoading)
        return (
            <RawRoot>
                <Spinner />
            </RawRoot>
        );

    return (
        <RawRoot>
            <Suspense fallback={<Fallback />}>{children ? children : <Outlet />}</Suspense>
            <ScrollRestoration
                getKey={(location, matches) => location.key} // default behavior
            />
        </RawRoot>
    );
};

export default Root;

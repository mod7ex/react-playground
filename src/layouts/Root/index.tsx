import { Outlet, NavLink } from "react-router-dom";
import styles from "~/layouts/Root/index.module.scss";

let activeStyle = {
    textDecoration: "underline",
};

const NavList = () => {
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
                        to="/login"
                        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ""}`} style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    >
                        Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

const Root = () => (
    <>
        <header className={styles.header}>
            <NavList />
        </header>

        <main className={styles.content}>
            <Outlet />
        </main>

        <footer className={styles.footer}>
            <p>Copyright 2023</p>
        </footer>
    </>
);

export default Root;

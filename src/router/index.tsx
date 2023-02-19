import { createBrowserRouter, createRoutesFromElements, Route, type ActionFunctionArgs } from "react-router-dom";
import { Root, AuthLayout } from "~/layouts";
import { Contact, Dashboard, Login, Home } from "~/pages";

const redirectIfUser = () => {};
const logoutUser = ({}: ActionFunctionArgs) => {};

export default createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route
                path="dashboard"
                element={<Dashboard />}
                loader={({ request }) =>
                    fetch("/api/dashboard.json", {
                        signal: request.signal,
                    })
                }
            />
            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} loader={redirectIfUser} />
                <Route path="logout" action={logoutUser} />
            </Route>
        </Route>
    )
);

/*

createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                loader: ({ request }) =>
                    fetch("/api/dashboard.json", {
                        signal: request.signal,
                    }),
            },
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <Login />,
                        loader: redirectIfUser,
                    },
                    {
                        path: "logout",
                        action: logoutUser,
                    },
                ],
            },
        ],
    },
]);

*/

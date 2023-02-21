import { createBrowserRouter, createRoutesFromElements, Route, type ActionFunctionArgs, redirect, useRouteError, type LoaderFunction } from "react-router-dom";
import { Contact, Dashboard, Login, Home, User } from "~/pages";
import { Root, AuthLayout } from "~/layouts";
import auth_service from "~/services/auth";
import { sleep } from "~/shared/utils";
import { mockUsersList } from "~/shared/mocks";

const getUserById = (v: number) => {
    const users = mockUsersList();
    return users.find(({ id }) => v === id);
};

const loadUsers = async () => {
    await sleep(2000);
    return mockUsersList();
};

const loadUser: LoaderFunction = async ({ params }) => {
    if (!auth_service.authenticated) return redirect("/login");

    const user_id = parseInt(params?.id!);

    if (!user_id) return redirect("/");

    const user = getUserById(user_id);

    if (!user) return redirect("/");

    return user;
};

const redirectIfAuthenticated = async () => {
    if (auth_service.authenticated) return redirect("/");
    return null;
};

const logoutAction = async ({}: ActionFunctionArgs) => {
    await sleep(1000);
    auth_service.log_out();
    return redirect("/");
};

const loginAction = async ({ request }: ActionFunctionArgs) => {
    await sleep(1000);

    const _form = await request.formData();

    const username = _form.get("username");
    const password = _form.get("password");

    if (password === "Pa$$w0rd!" && username) {
        auth_service.log_in();
        return redirect("/dashboard");
    }

    return null;
};

function ErrorPage() {
    const error = useRouteError() as Error;
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                {/* @ts-ignore */}
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Root />}
            errorElement={
                <Root>
                    <ErrorPage />
                </Root>
            }
        >
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="dashboard" element={<Dashboard />} loader={loadUsers} />
            <Route path="user/:id" element={<User />} loader={loadUser} />
            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} action={loginAction} loader={redirectIfAuthenticated} />
                <Route path="logout" action={logoutAction} />
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
                        loader: redirectIfAuthenticated,
                    },
                    {
                        path: "logout",
                        action: logoutAction,
                    },
                ],
            },
        ],
    },
]);
*/

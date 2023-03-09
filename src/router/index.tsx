// prettier-ignore
import {
    Route,
    redirect,
    useRouteError,
    createBrowserRouter,
    type LoaderFunction,
    type ActionFunctionArgs,
    createRoutesFromElements,
    json,
} from "react-router-dom";
import { lazy, memo, Suspense } from "react";
import { Root, RawRoot, AuthLayout, RequireAuth, Loader, Fallback } from "~/layouts";
import auth_service from "~/services/auth";
import { sleep } from "~/shared/utils";
import { mockUsersList } from "~/shared/mocks";
import { pathFromPayload } from "./utils";

const getUserById = (v: number) => {
    const users = mockUsersList();
    return users.find(({ id }) => v === id);
};

// -------------------------------- Loaders

const protectedLoader = (fn: LoaderFunction): LoaderFunction => {
    return (...args) => {
        if (!auth_service.authenticated) return null;

        return fn(...args);
    };
};

const loadUsers = protectedLoader(async () => {
    await sleep(2000);
    return json(mockUsersList(), { status: 200 });
});

const loadUser = protectedLoader(async ({ params }) => {
    const user_id = parseInt(params?.id!);

    if (!user_id) return redirect("/");

    const user = getUserById(user_id);

    if (!user) return redirect("/");

    return json(user, { status: 200 });
});

// -------------------------------- Actions

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

    const errors = {} as any;

    if (!username) errors.username = "Username is required";
    if (password !== "Pa$$w0rd!") errors.password = "Wrong password";

    if (Object.keys(errors).length) return json(errors, { status: 405 });

    auth_service.log_in();

    let to = "/dashboard";

    if (history.state.usr?.from) to = pathFromPayload(history.state.usr.from);

    return redirect(to); // check if state contains a <from>
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

// *********************************************************************

const wrapLazyPage = (Item: React.LazyExoticComponent<() => JSX.Element>) => {
    return (
        <Suspense fallback={<Fallback />}>
            <Item />
        </Suspense>
    );
};

const LazyHome = wrapLazyPage(lazy(() => import("~/pages/Home")));
const LazyDashboard = wrapLazyPage(lazy(() => import("~/pages/Dashboard")));
const LazyContact = wrapLazyPage(lazy(() => import("~/pages/Contact")));
const LazyUser = wrapLazyPage(lazy(() => import("~/pages/User")));
const LazyIdPage = wrapLazyPage(lazy(() => import("~/pages/IdPage")));
const LazyLogin = wrapLazyPage(lazy(() => import("~/pages/Login/index")));

// *********************************************************************

const PrivatePage = memo(() => {
    alert("from page");
    return <h1>Private page</h1>;
});

/*
 *
 * <RequireAuth /> is called too late after loaders,
 * so we should protect loaders also (it doesn't protect loaders)
 * (NB: page code is never called (pages are protected) -> check <private-page>)
 *
 * <LazyLogin /> is protected using just a loader
 */
export default createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Root />}
            errorElement={
                <RawRoot>
                    <ErrorPage />
                </RawRoot>
            }
        >
            <Route index element={LazyHome} />
            <Route element={<RequireAuth />}>
                <Route path="dashboard" element={LazyDashboard} loader={loadUsers} />
                <Route path="user/:id" element={LazyUser} loader={loadUser} />
                <Route path="contact" element={LazyContact} />
                <Route path="id-page" element={LazyIdPage} />
                <Route
                    path="private-page"
                    element={<PrivatePage />}
                    loader={() => {
                        alert("from loader");
                        return null;
                    }}
                />
                <Route path="logout" action={logoutAction} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="login" element={LazyLogin} action={loginAction} />
            </Route>
        </Route>
    )
);

/*

export default createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: (
            <Root>
                <ErrorPage />
            </Root>
        ),
        children: [
            {
                index: true,
                element: <LazyHome />,
            },
            {
                element: <RequireAuth />,
                children: [
                    { path: "dashboard", element: <LazyDashboard />, loader: loadUsers },
                    { path: "contact", element: <LazyContact /> },
                    { path: "id-page", element: <LazyIdPage /> },
                    { path: "user/:id", element: <LazyUser />, loader: loadUser },
                    {
                        path: "private-page",
                        element: <PrivatePage />,
                        loader: () => {
                            alert("from loader");
                            return null;
                        },
                    },
                ],
            },
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "login",
                        element: <LazyLogin />,
                        action: loginAction,
                    },
                ],
            },
            {
                path: "logout",
                action: logoutAction,
            },
        ],
    },
]);

*/

import { RouterProvider } from "react-router-dom";
import router from "~/router";
import { Fallback } from "~/layouts";

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

const App = () => {
    return <RouterProvider router={router} fallbackElement={<Fallback />} />;
};

export default App;

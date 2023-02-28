import { memo } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Spinner } from "~/components";

const Loader = memo(() => {
    alert("from loader layout");

    const navigation = useNavigation();

    const isLoading = navigation.state === "loading";

    if (isLoading) return <Spinner />;

    return <Outlet />;
});

export default Loader;

import { memo } from "react";
import { useNavigation } from "react-router-dom";
import { Spinner } from "~/components";

const Loader = memo<React.PropsWithChildren>(({ children }) => {
    const navigation = useNavigation();

    const loading = navigation.state === "loading";

    if (loading) return <Spinner />;

    return <>{children}</>;
});

export default Loader;

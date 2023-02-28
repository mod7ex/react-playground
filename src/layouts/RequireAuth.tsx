import { memo } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "~/hooks";

const RequireAuth = memo(() => {
    const authenticated = useAuth();

    const location = useLocation();

    if (!authenticated) return <Navigate to="/login" state={{ from: location }} replace />;

    return <Outlet />;
});

export default RequireAuth;

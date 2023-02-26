import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "~/hooks";

const RequireAuth = () => {
    const authenticated = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        if (!authenticated) navigate("/login", { replace: true, state: { from: location } });
    });

    if (!authenticated) return null;

    return <Outlet />;
};

export default RequireAuth;

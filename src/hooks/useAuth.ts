import { useSyncExternalStore } from "react";
import auth from "~/services/auth";

const subscribe = (notify: () => void) => auth.subscribe(notify);
const getSnapShot = () => auth.authenticated;

const useAuth = () => {
    return useSyncExternalStore(subscribe, getSnapShot);
};

export default useAuth;

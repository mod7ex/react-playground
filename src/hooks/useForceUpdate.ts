import { useReducer } from "react";

export default () => {
    return useReducer((v) => v + 1, 0);
};

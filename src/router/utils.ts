import { type Location } from "react-router-dom";

export const pathFromPayload = ({ hash, pathname, search }: Location) => {
    if (search) pathname += `${search}`;
    if (hash) pathname += `${hash}`;
    return pathname;
};

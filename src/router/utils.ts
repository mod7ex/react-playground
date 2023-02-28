type Payload = {
    hash: string;
    pathname: string;
    search: string;
};

export const pathFromPayload = ({ hash, pathname, search }: Payload) => {
    if (search) pathname += `${search}`;
    if (hash) pathname += `${hash}`;

    return pathname;
};

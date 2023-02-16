enum STATUS {
    IDLE = "idle",
    PENDING = "pending",
    SUCCESS = "success",
    ERROR = "error",
}

interface STATE_MACHINE<T, E = unknown> {
    value?: T;
    error?: E;
    status?: STATUS;
}

const cache = new Map<string, STATE_MACHINE<any, unknown>>();

const throwable = Promise.resolve();

export let suspend = <T>(fn: () => Promise<T>, key: string) => {
    if (!cache.has(key)) {
        const _state: STATE_MACHINE<T> = { status: STATUS.IDLE };

        cache.set(key, _state);

        _state.status = STATUS.PENDING;

        fn()
            .then((v) => {
                _state.value = v;
                _state.status = STATUS.SUCCESS;
            })
            .catch((e) => {
                _state.error = e;
                _state.status = STATUS.ERROR;
            });

        // throw throwable;
    }

    const _state_machine: STATE_MACHINE<T> = cache.get(key)!;

    const _status = _state_machine?.status!;

    if (_status === STATUS.PENDING) throw throwable;
    if (_status === STATUS.IDLE) throw throwable;
    if (_status === STATUS.ERROR) {
        cache.delete(key);
        throw _state_machine.error;
    }
    return _state_machine.value!;
};

export let slow = <T>(fn: () => T, time: number) => {
    return new Promise<T>((resolve) => {
        setTimeout(() => resolve(fn()), time);
    });
};

export const forever = new Promise((resolve) => {});

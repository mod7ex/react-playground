import { useState, useSyncExternalStore } from "react";

type Tfn = () => void;

class TimeStore {
    private _now = Date.now();

    private subscribers = new Set<Tfn>();

    constructor() {
        setInterval(() => {
            this.update();
        }, 1000);
    }

    get now() {
        return this.getSnapshot();
    }

    update() {
        this._now = Date.now();
        this.notify();
    }

    subscribe(notify: Tfn) {
        this.subscribers.add(notify);

        return () => this.subscribers.delete(notify);
    }

    getSnapshot() {
        return this._now;
    }

    notify() {
        this.subscribers.forEach((fn) => fn());
    }
}

const store = new TimeStore();

const subscribe = (notify: Tfn) => store.subscribe(notify);
const getSnapshot = () => store.getSnapshot();

const Timer = () => {
    const now = useSyncExternalStore(subscribe, getSnapshot);

    return <h1>now: {now}</h1>;
};

export default () => {
    const [up, setUp] = useState(false);

    return (
        <div>
            {up && <Timer />}
            <Timer />

            <br />

            <button onClick={() => setUp((v) => !v)}>toggle</button>
        </div>
    );
};

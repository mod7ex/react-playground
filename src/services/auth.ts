const LOCALSTORAGE_KEY = "is_authenticated";

class AuthService {
    private static instance?: AuthService;

    private _subscribers = new Set<() => void>();

    constructor() {
        if (!AuthService.instance) AuthService.instance = this;

        return AuthService.instance;
    }

    get authenticated() {
        return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) ?? "false");
    }

    log_in() {
        localStorage.setItem(LOCALSTORAGE_KEY, "true");
        this.notify();
    }

    log_out() {
        localStorage.setItem(LOCALSTORAGE_KEY, "false");
        this.notify();
    }

    subscribe(notify: () => void) {
        this._subscribers.add(notify);

        return () => this._subscribers.delete(notify);
    }

    notify() {
        this._subscribers.forEach((fn) => fn());
    }
}

export default new AuthService();

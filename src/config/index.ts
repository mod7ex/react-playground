/*

((history: History) => {
    const pushState = history.pushState;

    history.pushState = function (...args) {
        if ("onpushstate" in history && typeof history.onpushstate == "function") {
            history.onpushstate(args);
        }

        return pushState.apply(history, args);
    };
})(window.history);

*/

export default {};

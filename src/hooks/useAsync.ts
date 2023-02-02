import { useReducer, type Reducer, type DependencyList, useEffect } from "react";

/*
 *
 * State machine
 *
 */

interface State<T, E> {
    pending: boolean;
    error?: E;
    result?: T;
    // dirty: boolean
}

enum ACTIONS {
    START,
    SET_RESULT,
    SET_ERROR,
    END,
}

interface Action<T, E> {
    type: ACTIONS;
    payload?: { error?: E; result?: T };
}

const reducer = <T, E>(state: State<T, E>, { type, payload }: Action<T, E>) => {
    switch (type) {
        case ACTIONS.START:
            return { ...state, pending: true };
        case ACTIONS.END:
            return { ...state, pending: false };
        case ACTIONS.SET_RESULT:
            return {
                ...state,
                error: undefined,
                result: payload?.result,
            };
        case ACTIONS.SET_ERROR:
            return {
                ...state,
                error: payload?.error,
            };
        default:
            throw new Error();
    }
};

export default <T, E = unknown>(fn: () => Promise<T>, dependencies: DependencyList = []) => {
    const [state, dispatch] = useReducer<Reducer<State<T, E>, Action<T, E>>>(reducer, { pending: false });

    useEffect(() => {
        dispatch({ type: ACTIONS.START });

        fn()
            .then((result) => {
                dispatch({ type: ACTIONS.SET_RESULT, payload: { result } });
            })
            .catch((error) => {
                dispatch({ type: ACTIONS.SET_ERROR, payload: { error } });
            })
            .finally(() => {
                dispatch({ type: ACTIONS.END });
            });
    }, dependencies);

    return state;
};

// USAGE

/*
import RenderPropsComponent from "./components/RenderPropsComponent";

function App() {
    return (
        <RenderPropsComponent resource="https://jonplaceholder.typicode.com/todos/1">
            {({ pending, error, result }) => {
                if (error) return <h1>Something went wrong: {error?.message}</h1>;

                if (pending) return <h1>pending ...</h1>;

                return <p>{JSON.stringify(result)}</p>;
            }}
        </RenderPropsComponent>
    );
}

export default App;
*/

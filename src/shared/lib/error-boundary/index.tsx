import { Component } from "react";

interface State {
    error?: Error | null;
}

type FallbackProps = { error: State["error"]; reset: () => void };

interface Props {
    Fallback: React.ComponentType<FallbackProps>;
    onReset?: () => void;
}

const initialState = { error: null };

export default class ErrorBoundary extends Component<React.PropsWithChildren<Props>, State> {
    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    static getDerivedStateFromError(error: NonNullable<State["error"]>) {
        // Update state so the next render will show the fallback UI.
        return { error };
    }

    componentDidCatch(error: NonNullable<State["error"]>, errorInfo: React.ErrorInfo) {
        // You can also log the error to an error reporting service
        /* logErrorToMyService(error, errorInfo); */
        console.log(error, errorInfo);
    }

    clear() {
        this.props.onReset?.();
        this.setState(initialState);
    }

    render() {
        const { Fallback, children } = this.props;
        const { error } = this.state;

        // You can render any custom fallback UI
        if (error != null) return <Fallback reset={() => this.clear()} error={error} />;

        return children;
    }
}

/**
 * https://github.com/bvaughn/react-error-boundary/blob/master/src/index.tsx
 */
import React, { useState } from "react";

const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) => a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));

interface FallbackProps {
    error: Error;
    resetErrorBoundary: (...args: Array<unknown>) => void;
}

interface RawErrorBoundaryProps {
    onResetKeysChange?: (prevResetKeys: Array<unknown> | undefined, resetKeys: Array<unknown> | undefined) => void;
    onReset?: (...args: Array<unknown>) => void;
    onError?: (error: Error, info: { componentStack: string }) => void;
    resetKeys?: Array<unknown>;
}

interface ErrorBoundaryPropsWithComponent extends RawErrorBoundaryProps {
    fallback?: never;
    FallbackComponent: React.ComponentType<FallbackProps>;
    fallbackRender?: never;
}

declare function FallbackRender(props: FallbackProps): React.ReactElement<unknown, string | React.FunctionComponent | typeof React.Component> | null;

interface ErrorBoundaryPropsWithRender extends RawErrorBoundaryProps {
    fallback?: never;
    FallbackComponent?: never;
    fallbackRender: typeof FallbackRender;
}

interface ErrorBoundaryPropsWithFallback extends RawErrorBoundaryProps {
    fallback: React.ReactElement<unknown, string | React.FunctionComponent | typeof React.Component> | null;
    FallbackComponent?: never;
    fallbackRender?: never;
}

type ErrorBoundaryProps = ErrorBoundaryPropsWithFallback | ErrorBoundaryPropsWithComponent | ErrorBoundaryPropsWithRender;

type ErrorBoundaryState = { error: Error | null };

const initialState: ErrorBoundaryState = { error: null };

export default class ErrorBoundary extends React.Component<React.PropsWithRef<React.PropsWithChildren<ErrorBoundaryProps>>, ErrorBoundaryState> {
    state = initialState;

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    resetErrorBoundary = (...args: Array<unknown>) => {
        this.props.onReset?.(...args);
        this.reset();
    };

    reset() {
        this.setState(initialState);
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.props.onError?.(error, info);
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
        const { error } = this.state;
        const { resetKeys } = this.props;

        // There's an edge case where if the thing that triggered the error
        // happens to *also* be in the resetKeys array, we'd end up resetting
        // the error boundary immediately. This would likely trigger a second
        // error to be thrown.
        // So we make sure that we don't check the resetKeys on the first call
        // of cDU after the error is set

        if (error !== null && prevState.error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
            this.props.onResetKeysChange?.(prevProps.resetKeys, resetKeys);
            this.reset();
        }
    }

    render() {
        const { error } = this.state;

        const { fallbackRender, FallbackComponent, fallback } = this.props;

        if (error !== null) {
            const props = { error, resetErrorBoundary: this.resetErrorBoundary };

            if (React.isValidElement(fallback)) {
                return fallback;
            } else if (typeof fallbackRender === "function") {
                return fallbackRender(props);
            } else if (FallbackComponent) {
                return <FallbackComponent {...props} />;
            } else {
                throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");
            }
        }

        return this.props.children;
    }
}

/**
 * HOC
 */
export function withErrorBoundary<P>(Component: React.ComponentType<P>, errorBoundaryProps: ErrorBoundaryProps): React.FC<P> {
    const Wrapped: React.FC<P> = (props) => {
        return (
            <ErrorBoundary {...errorBoundaryProps}>
                {/* @ts-ignore */}
                <Component {...props} />
            </ErrorBoundary>
        );
    };

    // Format for display in DevTools
    const name = Component.displayName || Component.name || "Unknown";
    Wrapped.displayName = `withErrorBoundary(${name})`;

    return Wrapped;
}

// ---------------------------------------------------------------------------------------------------------------- Hook

/*
From docs
https://reactjs.org/docs/error-boundaries.html
https://github.com/bvaughn/react-error-boundary/blob/master/src/index.tsx

Note

Error boundaries do not catch errors for:

* Event handlers (learn more)
* Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
* Server side rendering
* Errors thrown in the error boundary itself (rather than its children)

------------------------------------------------------------------------

+ well for this reason we need this hook
+ so we can also catch these errors in these situations
+ and hand them over to the error boundary
*/

export const useErrorHandler = (givenError?: unknown) => {
    const [error, setError] = useState();
    if (givenError != null) throw givenError;
    if (error != null) throw error;
    return setError as (error: unknown) => void;
};

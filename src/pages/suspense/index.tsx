import { Suspense } from "react";
import { Spinner } from "~/components";

export const Fallback = () => (
    <div>
        <Spinner />
    </div>
);

const PageSuspense: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Suspense fallback={<Fallback />}>{children}</Suspense>;
};

export function withSuspense<P>(Component: React.ComponentType<P>): React.FC<P> {
    const Wrapped: React.FC<P> = (props) => {
        return (
            <PageSuspense>
                {/* @ts-ignore */}
                <Component {...props} />
            </PageSuspense>
        );
    };

    // Format for display in DevTools
    const name = Component.displayName || Component.name || "Unknown";
    Wrapped.displayName = `withSuspense(${name})`;

    return Wrapped;
}

export default PageSuspense;

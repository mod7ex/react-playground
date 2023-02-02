/* eslint-disable import/export */

// https://github.com/modex98/adnovado-setup/blob/master/test-utils.tsx

import { type ReactElement } from "react";
import { render, type RenderOptions, renderHook, type RenderHookOptions, type Queries, queries } from "@testing-library/react";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

const _render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => render(ui, { wrapper: Providers, ...options });

// prettier-ignore
const _renderHook = 
    <
        Result,
        Props,
        Q extends Queries = typeof queries,
        Container extends Element | DocumentFragment = HTMLElement,
        BaseElement extends Element | DocumentFragment = Container,
    >(
        hook: (initialProps: Props) => Result,
        options?: Omit<RenderHookOptions<Props, Q, Container, BaseElement>, 'wrapper'>
    ) => renderHook(hook, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export * from "@testing-library/dom";
export { _render as render }; // override the render function
export { _renderHook as renderHook }; // override the renderHook function
export { default as userEvent } from "@testing-library/user-event";

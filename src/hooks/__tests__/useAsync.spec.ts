import { renderHook, waitFor } from "~/test-utils";
import useAsync from "~/hooks/useAsync";

const VALUE = "Something";

const effect = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve(VALUE), 1500);
    });

describe("useAsync", () => {
    test("works", async () => {
        const { result } = renderHook(() => useAsync(effect));

        expect(result.current.pending).toBe(true);

        await waitFor(
            () => {
                expect(result.current.pending).toBe(false);
            },
            { timeout: 2000 }
        );

        expect(result.current.result).toBe(VALUE);

        expect(result.current.error).toBeUndefined();
    });
});

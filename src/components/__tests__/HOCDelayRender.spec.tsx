import { render, screen, waitFor } from "~/test-utils";
import { HOCDelayRender } from "~/components";

const Example = () => <p role="paragraph">{"data"}</p>;

const DelayedExample = HOCDelayRender(Example);

describe("HOCDelayRender", () => {
    it("works as expected", async () => {
        render(<DelayedExample />);

        let paragraph = screen.queryByRole("paragraph");

        expect(paragraph).toBeNull();

        await waitFor(() => {
            paragraph = screen.getByRole("paragraph");
            expect(paragraph).toBeInTheDocument();
            expect(paragraph).toBeInTheDocument();
            expect(paragraph).toHaveTextContent("data");
        });
    });
});

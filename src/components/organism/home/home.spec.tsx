import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "./home";

const getSearchMock = vi.fn();

vi.mock("../../molecules/autocomplete/autocomplete", () => ({
  Autocomplete: ({
    handlerSelectOption,
    handlerChange,
    options,
    value,
    loading,
  }: any) => {
    const eventSelection = () => {
      handlerSelectOption({ name: "test", id: 4 });
    };

    const eventChange = () => {
      handlerChange("str");
    };

    return (
      <>
        <input data-testid="input" />
        <button
          data-testid="handlerSelection"
          onClick={eventSelection}
        ></button>
        <button data-testid="handlerChange" onClick={eventChange}></button>

        {options?.map((op: any, i: number) => (
          <div data-testid="options" key={i}>
            option
          </div>
        ))}
        <div data-testid="value">{value}</div>
        {loading && <div data-testid="loading">loading</div>}
      </>
    );
  },
}));

vi.mock("../../molecules/header/header", () => ({
  Header: () => <></>,
}));

vi.mock("../../molecules/cardShow/cardShow", () => ({
  CardShow: ({ id }: any) => {
    return <div data-testid={"id-" + id}>{"id-" + id}</div>;
  },
}));

vi.mock("../../../hooks/useShow", () => ({
  useShow: () => ({ getSearch: getSearchMock }),
}));

describe("Home Component", () => {
  test("displays the header", () => {
    const { getByRole } = render(<Home />);
    expect(getByRole("heading", { name: /welcome/i })).toBeDefined();
  });

  test("should set Value  and show loading text ", async () => {
    // arrange
    getSearchMock.mockResolvedValue([
      { show: { name: "name", id: 4 } },
      { show: { name: "name 2", id: 5 } },
    ]);
    render(<Home />);

    //act
    const buttonHandlerChange = screen.getByTestId("handlerChange");
    const user = userEvent.setup();
    await user.click(buttonHandlerChange);

    //expect
    expect(screen.getByText("str")).toBeDefined();
    expect(screen.getByText("loading")).toBeDefined();

    await waitFor(() => {
      expect(getSearchMock).toHaveBeenCalledWith("str");
      expect(screen.getAllByTestId("options").length).toEqual(2);
    });
  });

  test("should set selection from enter or click", async () => {
    // arrange
    getSearchMock.mockResolvedValue([{ show: { name: "name", id: 4 } }]);
    render(<Home />);

    //act
    const buttonHandlerSelect = screen.getByTestId("handlerSelection");
    const user = userEvent.setup();
    await user.click(buttonHandlerSelect);

    //expect
    expect(screen.getByTestId("id-4")).toBeDefined();

    await waitFor(() => {
      expect(getSearchMock).toHaveBeenCalledWith("str");
    });
  });

  test("should handler and show modal error", async () => {
    // arrange
    getSearchMock.mockRejectedValue({ message: "error" });
    render(<Home />);

    //act
    const buttonHandlerChange = screen.getByTestId("handlerChange");
    const user = userEvent.setup();
    await user.click(buttonHandlerChange);

    //expect

    await waitFor(() => {
      expect(getSearchMock).toHaveBeenCalledWith("str");
      expect(screen.getByText("Ops try again.")).toBeDefined();
    });
  });
});

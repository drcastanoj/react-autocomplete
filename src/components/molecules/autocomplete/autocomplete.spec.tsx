import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Autocomplete } from "./autocomplete";

describe("Autocomplete Component", () => {
  let props: any;

  beforeEach(() => {
    props = {
      options: [{ name: "name", id: 1 }],
      handlerChange: vi.fn(),
      handlerSelectOption: vi.fn(),
      value: "",
      loading: false,
      limit: 10,
    };
  });

  test("should renders without crashing", () => {
    render(<Autocomplete {...props} />);
    expect(screen.getByRole("combobox")).toBeDefined();
  });

  test("should calls handlerChange on input change", () => {
    render(<Autocomplete {...props} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New value" } });
    expect(props.handlerChange).toHaveBeenCalled();
  });

  test("should handles keyboard navigation and selection", () => {
    render(<Autocomplete {...props} />);
    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(props.handlerSelectOption).toHaveBeenCalledWith(props.options[0]);
  });

  test("should closes dropdown when clicking outside", () => {
    render(<Autocomplete {...props} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(document);
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  test("should displays loading indicator when loading is true", () => {
    props.loading = true;
    render(<Autocomplete {...props} />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  test("should displays 'No Results' when options are empty", () => {
    props.options = [];
    render(<Autocomplete {...props} />);
    expect(screen.getByText("Not Results")).toBeDefined();
  });
});

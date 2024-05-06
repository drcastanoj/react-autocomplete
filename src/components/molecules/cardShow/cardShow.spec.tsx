import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CardShow } from "./cardShow"; // Adjust the import according to your file structure

const getShowMock = vi.fn();

vi.mock("../../../hooks/useShow", () => ({
  useShow: () => ({
    getShow: getShowMock,
  }),
}));

describe("CardShow Component", () => {
  const mockShow = {
    name: "Breaking Bad",
    genres: ["Drama", "Crime", "Thriller"],
    rating: { average: 9.5 },
    type: "Series",
  };

  it("should renders the show information after fetching data", async () => {
    getShowMock.mockResolvedValue(mockShow);
    render(<CardShow id={123} />);
    expect(await screen.findByText(`Name: Breaking Bad`)).toBeDefined();
    expect(screen.getByText("Genres: Drama Crime Thriller")).toBeDefined();
    expect(screen.getByText("Rating : 9.5")).toBeDefined();
    expect(screen.getByText("Type: Series")).toBeDefined();
  });
});

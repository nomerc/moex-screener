import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { sortData } from "../app/shared/lib/utils";

describe("Sort", () => {
  it("Sorts array assending", () => {
    const a = [
      [3, 3, 2],
      [2, 3, 1],
      [1, 1, 5],
    ];
    const b = [
      [1, 1, 5],
      [2, 3, 1],
      [3, 3, 2],
    ];
    sortData(0, a);
    expect(a).toEqual(b);
  });
});

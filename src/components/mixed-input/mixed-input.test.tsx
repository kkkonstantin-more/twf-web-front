import React from "react";
import MixedInput from "./mixed-input.component";
import {
  convertMathInput,
  MathInputFormat,
} from "../../utils/kotlin-lib-functions";
import {
  render,
  fireEvent,
  getByText,
  RenderResult,
  screen,
} from "@testing-library/react";

describe("MixedInput", () => {
  it("switching mode with empty structure string input doesn't throw error", () => {
    render(
      <MixedInput initialFormat={MathInputFormat.STRUCTURE_STRING} value={""} />
    );
    fireEvent.click(screen.getByText("TEX"));
  });
});

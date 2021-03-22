// libs and hooks
import React from "react";
// custom components
import MixedInput from "../mixed-input/mixed-input.component";
// types
import { MathInputFormat } from "../../utils/kotlin-lib-functions";
// assets
import gifTexDemo from "../../assets/math-quill-hint.gif";
// styles
import "./hints-block.styles.scss";

interface HintsBlockProps {
  format: MathInputFormat;
  expression: string;
}

const HintsBlock = ({ format, expression }: HintsBlockProps) => {
  return (
    <div className="hints-block">
      <div className="hints-block__gif-container">
        <h1>Как писать в TEX:</h1>
        <img
          src={gifTexDemo}
          alt="latex editor hint"
          width="100%"
          height="auto"
        />
      </div>
      <h1>Редактируемая задача:</h1>
      <MixedInput format={format} expression={expression} />
    </div>
  );
};

export default HintsBlock;

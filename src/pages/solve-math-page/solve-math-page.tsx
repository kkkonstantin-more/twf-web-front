import React, { useState } from "react";
// @ts-ignore
import Stepper from "react-stepper-horizontal";

import "./solve-math-page.scss";
import MathQuillEditor from "../../components/math-quill-editor/math-quill-editor";

const SolveMathPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps: any[] = [];
  for (let i = 0; i < 5; i++) {
    steps.push({
      title: `Задача ${i + 1}`,
    });
  }
  const levels: string[] = ["2+2", "3+3", "4+4", "5+5", "6+6"];
  return (
    <div className="solve-math">
      <div className="solve-math__stepper">
        <Stepper steps={steps} activeStep={activeStep} />
      </div>
      <div className="solve-math__editor">
        <MathQuillEditor
          inputRef={React.createRef()}
          width={"60vw"}
          startingLatexExpression={levels[activeStep] + "=..."}
        />
      </div>
      <div className="solve-math__actions">
        <div>
          <button
            className="btn u-mr-sm"
            onClick={() => {
              if (activeStep !== 0) {
                setActiveStep(activeStep - 1);
              }
            }}
          >
            назад
          </button>
          <button
            className="btn"
            onClick={() => {
              if (activeStep !== steps.length - 1) {
                setActiveStep(activeStep + 1);
              }
            }}
          >
            далее
          </button>
        </div>
        <button className="btn">завершить</button>
      </div>
    </div>
  );
};

export default SolveMathPage;

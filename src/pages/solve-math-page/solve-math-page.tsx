// libs and hooks
import React, { useState } from "react";
// components
import MathQuillEditor from "../../components/math-quill-editor/math-quill-editor";
import ServerResponseAlert from "../../components/server-response-alert/server-response-alert.component";
// utils
import { checkTex } from "../../utils/kotlin-lib-functions";
// styles
import "./solve-math-page.scss";

const SolveMathPage: React.FC = () => {
  const inputRef: React.Ref<HTMLInputElement> = React.createRef();
  const inputRef2: React.Ref<HTMLInputElement> = React.createRef();
  const [currentTexExp, setCurrentTexExp] = useState("2+2=4");
  const [errMsg, setErrMsg] = useState<null | string>(null);
  const [successMsg, setSuccessMsg] = useState<null | "Правильно!">(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [solution, setSolution] = useState<string>("");

  return (
    <div className="solve-math">
      <input type="text" ref={inputRef} />
      {!showSolution && (
        <div className="solve-math__editor">
          <MathQuillEditor
            inputRef={inputRef}
            width={"60vw"}
            startingLatexExpression={currentTexExp}
            updateValue={(value: string) => setCurrentTexExp(value)}
          />
        </div>
      )}
      {showSolution && (
        <div
          style={{ display: showSolution ? "block" : "none" }}
          className="solve-math__editor"
        >
          <MathQuillEditor
            inputRef={inputRef2}
            width={"60vw"}
            startingLatexExpression={solution}
          />
          <ServerResponseAlert errorMsg={errMsg} successMsg={successMsg} />
        </div>
      )}
      <div className="solve-math__actions">
        <div>
          <button className="btn u-mr-sm" onClick={() => {}}>
            назад
          </button>
          <button className="btn" onClick={() => {}}>
            далее
          </button>
        </div>
        <button className="btn">завершить</button>
        <button
          className="btn"
          onClick={() => {
            const res = checkTex(currentTexExp);
            setSolution(res.validatedSolution);
            setShowSolution(true);
            if (res.errorMessage !== "") {
              setSuccessMsg(null);
              setErrMsg(res.errorMessage);
            } else {
              setErrMsg(null);
              setSuccessMsg("Правильно!");
            }
          }}
        >
          Проверить
        </button>
        <button
          className="btn"
          onClick={() => {
            setShowSolution(false);
          }}
        >
          вернуться к решению
        </button>
      </div>
    </div>
  );
};

export default SolveMathPage;

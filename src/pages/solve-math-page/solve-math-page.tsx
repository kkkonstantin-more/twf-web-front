// libs and hooks
import React, { useEffect, useState } from "react";
// lib components
import { Steps } from "antd";
// custom components
import MathQuillEditor from "../../components/math-quill-editor/math-quill-editor";
import ServerResponseAlert from "../../components/server-response-alert/server-response-alert.component";
import ActionButton from "../../components/action-button/action-button.component";
import AppSpinner from "../../components/app-spinner/app-spinner";
// utils
import { checkTex } from "../../utils/kotlin-lib-functions";
import TaskSetConstructorRequestsHandler from "../../constructors/task-set-constructor/task-set-constructor.requests-handler";
import { TaskSetConstructorReceivedForm } from "../../constructors/task-set-constructor/task-set-constructor.types";
// types
import { TaskConstructorReceivedForm } from "../../constructors/task-constructor/task-constructor.types";
// styles
import "./solve-math-page.scss";
import "antd/dist/antd.compact.min.css";
// icons
import { mdiArrowLeftBoldBox, mdiArrowRightBoldBox } from "@mdi/js";

const { Step } = Steps;

const SolveMathPage: React.FC = () => {
  const [isTaskSetFetched, setIsTaskSetFetched] = useState<boolean>(false);
  const [taskSet, setTaskSet] = useState<TaskSetConstructorReceivedForm>();
  const [currentTaskIdx, setCurrentTaskIdx] = useState<number>(0);
  const [solutions, setSolutions] = useState<string[]>([]);
  const [checkedSolution, setCheckedSolution] = useState<string>("");
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<null | string>(null);
  const [successMsg, setSuccessMsg] = useState<null | "Правильно!">(null);

  useEffect(() => {
    TaskSetConstructorRequestsHandler.getOne("trigo_demo").then(
      (res: TaskSetConstructorReceivedForm) => {
        setTaskSet(res);
        setSolutions(
          res.tasks.map(
            (task: TaskConstructorReceivedForm) =>
              task.originalExpressionTex + "=...=" + task.goalExpressionTex
          )
        );
        setIsTaskSetFetched(true);
      }
    );
  }, []);

  const rerenderComponent = async () => {
    await setIsTaskSetFetched(false);
    await setIsTaskSetFetched(true);
  };

  if (isTaskSetFetched) {
    return (
      <div className="solve-math">
        <h1 className="u-text-center u-mt-sm">Набор задач {taskSet?.nameRu}</h1>
        <div style={{ width: "80%", margin: "2rem auto 0 auto" }}>
          <Steps
            progressDot={true}
            current={currentTaskIdx}
            direction={"horizontal"}
          >
            {taskSet?.tasks.map(
              (task: TaskConstructorReceivedForm, i: number) => {
                return (
                  <Step
                    key={i}
                    title={
                      <b
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          await setCurrentTaskIdx(i);
                          await rerenderComponent();
                        }}
                      >
                        {task.nameRu}
                      </b>
                    }
                  />
                );
              }
            )}
          </Steps>
        </div>
        {!showSolution && solutions[currentTaskIdx] && (
          <div className="solve-math__editor">
            <input type="text" style={{ display: "none" }} />
            <MathQuillEditor
              width={"60vw"}
              startingLatexExpression={solutions[currentTaskIdx]}
              updateValue={(value: string) =>
                setSolutions((prevState) =>
                  prevState.map((solution, i) =>
                    i === currentTaskIdx ? value : solution
                  )
                )
              }
            />
          </div>
        )}
        {showSolution && (
          <div className="solve-math__editor">
            <MathQuillEditor
              width={"60vw"}
              startingLatexExpression={checkedSolution}
            />
            <ServerResponseAlert errorMsg={errMsg} successMsg={successMsg} />
          </div>
        )}
        <div className="solve-math__actions">
          {!showSolution && (
            <div>
              <ActionButton
                mdiIconPath={mdiArrowLeftBoldBox}
                size={2}
                margin={"0 1rem 0 0"}
                action={async () => {
                  if (currentTaskIdx !== 0) {
                    setCurrentTaskIdx((prevState) => --prevState);
                    await rerenderComponent();
                  }
                }}
              />
              <ActionButton
                mdiIconPath={mdiArrowRightBoldBox}
                size={2}
                action={async () => {
                  if (currentTaskIdx !== solutions.length - 1) {
                    setCurrentTaskIdx((prevState) => ++prevState);
                    await rerenderComponent();
                  }
                }}
              />
            </div>
          )}
          <div>
            <button
              className="btn u-mr-sm"
              onClick={async () => {
                if (!showSolution) {
                  if (taskSet?.tasks[currentTaskIdx]) {
                    const res = checkTex(
                      solutions[currentTaskIdx],
                      taskSet?.tasks[currentTaskIdx]
                        .originalExpressionStructureString,
                      taskSet?.tasks[currentTaskIdx]
                        .goalExpressionStructureString
                    );
                    setCheckedSolution(res.validatedSolution);
                    setShowSolution(true);
                    if (res.errorMessage !== "") {
                      setSuccessMsg(null);
                      setErrMsg(res.errorMessage);
                    } else {
                      setErrMsg(null);
                      setSuccessMsg("Правильно!");
                    }
                  }
                } else {
                  await rerenderComponent();
                  setShowSolution(false);
                }
              }}
            >
              {showSolution ? "Вернуться к решению" : "Проверить"}
            </button>
            <button
              className="btn"
              onClick={() => {
                console.log(solutions);
              }}
            >
              Завершить
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <AppSpinner loading={!isTaskSetFetched} />;
  }
};

export default SolveMathPage;

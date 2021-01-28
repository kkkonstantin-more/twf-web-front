// libs and hooks
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// lib components
import { Steps } from "antd";
import { EditableMathField, MathField } from "react-mathquill";
// custom components
import ServerResponseAlert from "../../components/server-response-alert/server-response-alert.component";
import ActionButton from "../../components/action-button/action-button.component";
import AppSpinner from "../../components/app-spinner/app-spinner";
import TexEditorActionsTab from "../../components/tex-editor-actions-tab/tex-editor-actions-tab";
// utils
import { checkTex } from "../../utils/kotlin-lib-functions";
import TaskSetConstructorRequestsHandler from "../../constructors/task-set-constructor/task-set-constructor.requests-handler";
import { TaskSetConstructorReceivedForm } from "../../constructors/task-set-constructor/task-set-constructor.types";
import { addStyles } from "react-mathquill";
// types
import { TaskConstructorReceivedForm } from "../../constructors/task-constructor/task-constructor.types";
// icons
import { mdiArrowLeftBoldBox, mdiArrowRightBoldBox } from "@mdi/js";
// styles
import "./solve-math-page.scss";
import "antd/dist/antd.compact.min.css";

// adding mathquill styles
addStyles();

const SolveMathPage: React.FC = () => {
  const { Step } = Steps;

  const [isTaskSetFetched, setIsTaskSetFetched] = useState<boolean>(false);
  const [taskSet, setTaskSet] = useState<TaskSetConstructorReceivedForm>();
  const [currentTaskIdx, setCurrentTaskIdx] = useState<number>(0);
  const [solutions, setSolutions] = useState<string[]>([]);
  const [errMessages, setErrMessages] = useState<(string | null)[]>([]);
  const [successMessages, setSuccessMessages] = useState<
    ("Правильно!" | null)[]
  >([]);
  const [mathField, setMathField] = useState<MathField>();

  const { taskSetCode } = useParams();

  // fetching taskSet
  useEffect(() => {
    TaskSetConstructorRequestsHandler.getOne(taskSetCode).then(
      (res: TaskSetConstructorReceivedForm) => {
        setTaskSet(res);
        setSolutions(
          res.tasks.map(
            (task: TaskConstructorReceivedForm) =>
              task.originalExpressionTex + "=...=" + task.goalExpressionTex
          )
        );
        setSolutions(
          res.tasks.map((task: TaskConstructorReceivedForm) => {
            return (
              task.originalExpressionTex + "=...=" + task.goalExpressionTex
            );
          })
        );
        setIsTaskSetFetched(true);
      }
    );
  }, []);

  const updateSolutions = (solutionIdx: number, mathField: MathField) => {
    setSolutions((prevState: string[]) =>
      prevState.map((solution: string, i: number) =>
        i === solutionIdx ? mathField.latex() : solution
      )
    );
  };

  const onCheckTex = (solutionInTex: string) => {
    if (taskSet?.tasks[currentTaskIdx]) {
      const res = checkTex(
        solutionInTex,
        taskSet?.tasks[currentTaskIdx].originalExpressionStructureString,
        taskSet?.tasks[currentTaskIdx].goalExpressionStructureString
      );
      if (res.errorMessage) {
        setSuccessMessages((prevState) => {
          const newState = [...prevState];
          newState[currentTaskIdx] = null;
          return newState;
        });
        setErrMessages((prevState) => {
          const newState = [...prevState];
          newState[currentTaskIdx] = res.errorMessage;
          return newState;
        });
      } else {
        setErrMessages((prevState) => {
          const newState = [...prevState];
          newState[currentTaskIdx] = null;
          return newState;
        });
        setSuccessMessages((prevState) => {
          const newState = [...prevState];
          newState[currentTaskIdx] = "Правильно!";
          return newState;
        });
      }
      setSolutions((prevState: string[]) =>
        prevState.map((solution: string, i: number) =>
          i === currentTaskIdx ? res.validatedSolution : solution
        )
      );
    }
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
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCurrentTaskIdx((prevIdx) => {
                        if (mathField) {
                          updateSolutions(prevIdx, mathField);
                        }
                        return i;
                      });
                    }}
                    title={<b>{task.nameRu}</b>}
                  />
                );
              }
            )}
          </Steps>
        </div>
        <div className="solve-math__tex-solution u-mt-md">
          {mathField && <TexEditorActionsTab mathField={mathField} />}
          <EditableMathField
            latex={solutions[currentTaskIdx]}
            mathquillDidMount={(mathField: MathField) => {
              setMathField(mathField);
            }}
            style={{
              minWidth: "40rem",
              maxWidth: window.innerWidth - 100 + "px",
            }}
          />
        </div>
        <ServerResponseAlert
          errorMsg={errMessages[currentTaskIdx]}
          successMsg={successMessages[currentTaskIdx]}
          style={{ marginTop: "2rem", maxWidth: window.innerWidth / 2 }}
        />
        <div className="solve-math__buttons">
          <div>
            <ActionButton
              mdiIconPath={mdiArrowLeftBoldBox}
              size={2}
              margin={"0 1rem 0 0"}
              action={async () => {
                if (currentTaskIdx !== 0) {
                  setCurrentTaskIdx((prevState) => --prevState);
                }
              }}
            />
            <ActionButton
              mdiIconPath={mdiArrowRightBoldBox}
              size={2}
              action={async () => {
                if (currentTaskIdx !== solutions.length - 1) {
                  setCurrentTaskIdx((prevState) => ++prevState);
                }
              }}
            />
          </div>
          <div>
            <button
              className="btn u-mr-sm"
              onClick={() => {
                if (mathField) {
                  onCheckTex(mathField?.latex());
                }
              }}
            >
              Проверить
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

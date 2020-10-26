// libs and hooks
import React, { Dispatch, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
// custom hooks
import useMockConstructorToEdit from "../hooks/use-mock-constructor-to-edit";
// lib components
import Draggable from "react-draggable";
import Select from "react-select";
// custom components
import MathQuillEditor from "../../components/math-quill-editor/math-quill-editor";
import TaskConstructor from "../task-constructor/task-constructor.component";
import AppModal from "../../components/app-modal/app-modal.component";
import SelectConstructorItemList from "../../components/filterable-select-list/filterable-select-list.component";
// types
import { FilterableSelectListItem } from "../../components/filterable-select-list/filterable-select-list.types";
import {
  TaskLinkInput,
  TaskSetConstructorInputs,
} from "./task-set-constructor.types";
// data
import { mockTasks } from "../task-constructor/task-constructor.mock-data";
import { mockTaskSets } from "./task-set-constructor.mock-data";
import { subjectTypes } from "./task-set-constructor.data";
// icons
import Icon from "@mdi/react";
import {
  mdiCloseCircle,
  mdiCommentQuestion,
  mdiFormatListBulleted,
  mdiPlus,
  mdiRobot,
  mdiTable,
  mdiTableLarge,
  mdiWrench,
} from "@mdi/js";
// styles
import "./task-set-constructor.styles.scss";
import { createStructuredSelector } from "reselect";
import { RootState } from "../../redux/root-reducer";
import { RulePackConstructorInputs } from "../rule-pack-constructor/rule-pack-constructor.types";
import {
  selectRulePackJSON,
  selectTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.selectors";
import {
  UpdateRulePackJSONAction,
  UpdateTaskSetJSONAction,
} from "../../redux/constructor-jsons/constructor-jsons.types";
import {
  updateRulePackJSON,
  updateTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.actions";
import { connect, ConnectedProps } from "react-redux";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import ConstructorForm from "../../components/constructor-form/constructor-form.component";

export enum VisualizationMode {
  TABLE = "TABLE",
  LIST = "LIST",
}

const filterSubjectTypes = (
  str: string | undefined
):
  | {
      label: string;
      value: string;
    }[]
  | undefined => {
  return str ? str.split(",").map((e) => ({ label: e, value: e })) : undefined;
};

const TaskSetConstructor = ({
  taskSetJSON,
  updateTaskSetJSON,
}: ConnectedProps<typeof connector>): JSX.Element => {
  const [showHintsBlock, setShowHintsBlock] = useState(false);
  const [startExpressionHint, setStartExpressionHint] = useState("");
  const [goalExpressionHint, setGoalExpressionHint] = useState("");
  const [hintsDeltaX, setHintsDeltaX] = useState(0);
  const [showSelectModal, setShowSelectModal] = useState(false);

  const taskSetToEdit = useMockConstructorToEdit<TaskSetConstructorInputs>(
    mockTaskSets
  );

  const defaultValues: TaskSetConstructorInputs =
    taskSetToEdit && taskSetJSON === CONSTRUCTOR_JSONS_INITIAL_STATE.taskSet
      ? taskSetToEdit
      : taskSetJSON;

  updateTaskSetJSON(defaultValues);

  // const tasks =
  //   taskSetToEdit?.tasks.map((taskLink: TaskLinkInput) => {
  //     return mockTasks[taskLink.taskCode];
  //   }) || [];

  const methods = useForm({
    mode: "onSubmit",
    defaultValues,
  });
  const { register, getValues, control, setValue } = methods;
  const { fields, append } = useFieldArray({
    control,
    name: "tasks",
  });

  // useEffect(() => {
  //   reset(taskSetJSON);
  // }, [taskSetJSON]);

  // useEffect(() => {
  //   if (taskSetToEdit && taskSetToEdit.tasks) {
  //     console.log(tasks);
  //     setValue("levels", tasks);
  //     // taskSetToEdit.tasks.forEach((taskLink) => {
  //     //   console.log("exist");
  //     //   if (mockTasks[taskLink.taskCode]) {
  //     //     append({
  //     //       ...mockTasks[taskLink.taskCode],
  //     //     });
  //     //   }
  //     // });
  //   }
  // }, []);

  const [levelNames, setLevelNames] = useState<string[]>([]);
  const currentEditedLevelRef: React.RefObject<HTMLInputElement> = React.createRef();
  const updateDemo = (index: number) => {
    setStartExpressionHint(getValues().tasks[index].startExpression);
    setGoalExpressionHint(getValues().tasks[index].goalExpression);
    if (!showHintsBlock) setShowHintsBlock(true);
  };

  const updateName = (index: number, newName: string): void => {
    setLevelNames((prevState: string[]) => {
      return prevState.map((name: string, i: number) => {
        return i === index ? newName : name;
      });
    });
  };

  // update names due to changes of fields
  useEffect(() => {
    if (fields && getValues().tasks) {
      setLevelNames(
        fields.map((field, i) => {
          return getValues().tasks[i].nameRu;
        })
      );
    }
  }, [fields]);

  const [visualizationMode, setVisualizationMode] = useState<VisualizationMode>(
    VisualizationMode.LIST
  );

  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const subjectTypeValue = useState({ label: "1", value: "1" });

  const mobileHintsRef: React.RefObject<HTMLDivElement> = React.createRef();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (mobileHintsRef.current) {
      if (window.getComputedStyle(mobileHintsRef.current).display === "block") {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [mobileHintsRef]);

  const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: "nameEn",
      label: "Имя en",
      type: "text",
    },
    {
      name: "nameRu",
      label: "Имя ru",
      type: "text",
    },
    {
      name: "code",
      label: "Код",
      type: "text",
    },
    {
      name: "namespace",
      label: "Namespace",
      type: "text",
    },
  ];

  return (
    <div className="task-set-constructor">
      <div
        className="task-set-constructor__form-container"
        style={{
          width:
            !showHintsBlock || isMobile
              ? "100%"
              : `calc(50% + ${hintsDeltaX}px)`,
        }}
      >
        <div className="task-set-constructor__form">
          <FormProvider {...methods}>
            <ConstructorForm
              inputs={inputs}
              register={register}
              updateJSON={() => updateTaskSetJSON(getValues())}
              setValue={setValue}
            />
            <div className="u-flex" style={{ alignItems: "center" }}>
              <h3>Уровни</h3>
              <div className="task-set-constructor__visualization-mode-switchers">
                <div
                  className={`task-set-constructor__visualization-mode-switcher ${
                    visualizationMode === VisualizationMode.LIST &&
                    "task-set-constructor__visualization-mode-switcher--active"
                  }`}
                  onClick={() => {
                    setVisualizationMode(VisualizationMode.LIST);
                  }}
                >
                  <Icon path={mdiFormatListBulleted} size={1.5} />
                </div>
                <div
                  className={`task-set-constructor__visualization-mode-switcher ${
                    visualizationMode === VisualizationMode.TABLE &&
                    "task-set-constructor__visualization-mode-switcher--active"
                  }`}
                  onClick={() => {
                    setVisualizationMode(VisualizationMode.TABLE);
                  }}
                >
                  <Icon path={mdiTableLarge} size={1.5} />
                </div>
              </div>
            </div>
            <div
              className={`${
                visualizationMode === VisualizationMode.TABLE
                  ? "form-levels-table"
                  : "form-levels-list"
              }`}
            >
              {visualizationMode === VisualizationMode.LIST && (
                <div className="form-levels-list__select">
                  {fields.map((field, index) => {
                    return (
                      <div
                        key={field.id}
                        onClick={() => setSelectedLevel(index)}
                        className={`form-levels-list__select-option ${
                          index === selectedLevel &&
                          "form-levels-list__select-option--active"
                        }`}
                      >
                        <Icon
                          path={
                            field.taskCreationType === "auto"
                              ? mdiRobot
                              : mdiWrench
                          }
                          size={2}
                          style={{ marginRight: "1rem" }}
                        />
                        <span>
                          Уровень {index + 1}. {levelNames[index]}
                        </span>
                      </div>
                    );
                  })}
                  <div className="form-levels-list__action-buttons">
                    <button
                      className="btn form-levels-list__action-button"
                      onClick={() => {
                        append({
                          taskCreationType: "manual",
                        });
                        setSelectedLevel(fields.length);
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>
                        <b>ручной уровень</b>
                      </span>
                    </button>
                    <button
                      className="btn form-levels-list__action-button"
                      onClick={() => {
                        append({
                          taskCreationType: "auto",
                        });
                        setSelectedLevel(fields.length);
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>авто уровень</span>
                    </button>
                    <button
                      className="btn form-levels-list__action-button u-mr-sm"
                      onClick={() => {
                        setShowSelectModal(true);
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>существующий уровень</span>
                    </button>
                    <button
                      className="btn form-levels-list__action-button"
                      onClick={() => console.log(getValues())}
                    >
                      get values
                    </button>
                  </div>
                </div>
              )}
              <div
                className={`${
                  visualizationMode === VisualizationMode.LIST &&
                  "form-levels-list__selected-level"
                }`}
              >
                {fields.map((field, index: number) => {
                  return (
                    <TaskConstructor
                      key={index}
                      taskCreationType={fields[index].taskCreationType}
                      index={index}
                      defaultValue={fields[index]}
                      updateDemo={updateDemo}
                      visualizationMode={visualizationMode}
                      hidden={
                        visualizationMode === VisualizationMode.LIST &&
                        index !== selectedLevel
                      }
                      updateName={updateName}
                    />
                  );
                })}
              </div>
              {visualizationMode === VisualizationMode.TABLE && (
                <div className="form-levels-table__action-buttons">
                  <button
                    className="btn form-levels-table__action-button"
                    onClick={() => {
                      append({
                        name: "",
                        taskCreationType: "manual",
                      });
                    }}
                  >
                    <Icon path={mdiPlus} size={1.2} />
                    <span>
                      <b>ручной уровень</b>
                    </span>
                  </button>
                  <button
                    className="btn form-levels-table__action-button"
                    onClick={() => {
                      append({
                        taskCreationType: "auto",
                      });
                    }}
                  >
                    <Icon path={mdiPlus} size={1.2} />
                    <span>авто уровень</span>
                  </button>
                  <button
                    className="btn form-levels-table__action-button"
                    onClick={() => {
                      setShowSelectModal(true);
                    }}
                  >
                    <Icon path={mdiPlus} size={1.2} />
                    <span>существующий уровень</span>
                  </button>
                  <button
                    className="btn form-levels-table__action-button"
                    onClick={() => console.log(getValues())}
                  >
                    get values
                  </button>
                </div>
              )}
            </div>
          </FormProvider>
        </div>
        <AppModal
          isOpen={showSelectModal}
          close={() => setShowSelectModal(false)}
          width="80vw"
          height="80vh"
        >
          <SelectConstructorItemList
            items={Object.keys(mockTasks).map(
              (code: string): FilterableSelectListItem => {
                const { nameRu, namespace } = mockTasks[code];
                return {
                  name: nameRu,
                  namespace,
                  code,
                  taskSet: (() => {
                    const arr = [
                      "интересная игра",
                      "очень сложно",
                      "просто",
                      "ЕГЭ",
                    ];
                    const startIdx = Math.floor(Math.random() * 4);
                    const endIdx = Math.floor(Math.random() * 5) + startIdx + 1;
                    return arr.slice(startIdx, endIdx);
                  })(),
                  subjectType: (() => {
                    const arr = [
                      "тригонометрия",
                      "логарифмы",
                      "теория вероятности",
                      "производные",
                    ];
                    const startIdx = Math.floor(Math.random() * 4);
                    const endIdx = Math.floor(Math.random() * 5) + startIdx + 1;
                    return arr.slice(startIdx, endIdx);
                  })(),
                  onSelect: () => {
                    append(mockTasks[code], true);
                    setShowSelectModal(false);
                    setSelectedLevel(fields.length);
                  },
                };
              }
            )}
            propsToFilter={["namespace", "taskSet", "subjectType"]}
          />
        </AppModal>
      </div>
      {/*HINTS BLOCK*/}
      <div
        className="task-set-constructor__icon"
        onClick={() => setShowHintsBlock(!showHintsBlock)}
      >
        <Icon
          size={3}
          path={showHintsBlock ? mdiCloseCircle : mdiCommentQuestion}
        />
      </div>
      <div
        className={`task-set-constructor__hints-desktop ${
          showHintsBlock && "task-set-constructor__hints-desktop--visible"
        }`}
        style={{
          width: showHintsBlock ? `calc(50% - ${hintsDeltaX}px)` : "0",
        }}
      >
        <Draggable
          axis="x"
          position={{
            x: 0,
            y: 0,
          }}
          defaultClassName="task-set-constructor__hints-desktop-dragger"
          defaultClassNameDragging="task-set-constructor__hints-desktop-dragger task-set-constructor__hints-desktop-dragger--dragging"
          onStop={(_, { lastX }) => {
            setHintsDeltaX((prevState) => {
              return prevState + lastX;
            });
          }}
        >
          <span />
        </Draggable>
        <div className="task-set-constructor__math-quill-hint">
          {showHintsBlock && (
            <>
              <h1>Как писать в TEX:</h1>
              <img
                src={require("../../assets/math-quill-hint.gif")}
                alt="latex editor hint"
                width="100%"
                height="auto"
              />
            </>
          )}
        </div>
        <div className="current-edited-level">
          <h1>Редактируемый уровень:</h1>
          <input type="text" ref={currentEditedLevelRef} />
          <MathQuillEditor
            inputRef={currentEditedLevelRef}
            startingLatexExpression={`${startExpressionHint}=..=${goalExpressionHint}`}
          />
        </div>
      </div>
      <div ref={mobileHintsRef} className="task-set-constructor__hints-phone">
        {isMobile && (
          <AppModal
            isOpen={showHintsBlock}
            close={() => setShowHintsBlock(false)}
          >
            <>
              <div className="task-set-constructor__math-quill-hint">
                {showHintsBlock && (
                  <>
                    <h1>Как писать в TEX:</h1>
                    <img
                      src={require("../../assets/math-quill-hint.gif")}
                      alt="latex editor hint"
                      width="100%"
                      height="auto"
                    />
                  </>
                )}
              </div>
              <div className="current-edited-level">
                <h1>Редактируемый уровень:</h1>
                <input type="text" ref={currentEditedLevelRef} />
                <MathQuillEditor
                  inputRef={currentEditedLevelRef}
                  startingLatexExpression={`${startExpressionHint}=..=${goalExpressionHint}`}
                />
              </div>
            </>
          </AppModal>
        )}
      </div>
    </div>
  );
};

const mapState = createStructuredSelector<
  RootState,
  { taskSetJSON: TaskSetConstructorInputs }
>({
  taskSetJSON: selectTaskSetJSON,
});

const mapDispatch = (dispatch: Dispatch<UpdateTaskSetJSONAction>) => ({
  updateTaskSetJSON: (taskSetJSON: TaskSetConstructorInputs) =>
    dispatch(updateTaskSetJSON(taskSetJSON)),
});

const connector = connect(mapState, mapDispatch);

export default connector(TaskSetConstructor);

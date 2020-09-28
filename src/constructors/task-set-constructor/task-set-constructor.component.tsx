// libs and hooks
import React, { useEffect, useState } from "react";
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
  mdiPlus,
  mdiRobot,
  mdiWrench,
} from "@mdi/js";
// styles
import "./task-set-constructor.styles.scss";

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

const TaskSetConstructor = (): JSX.Element => {
  const [showHintsBlock, setShowHintsBlock] = useState(false);
  const [startExpressionHint, setStartExpressionHint] = useState("");
  const [goalExpressionHint, setGoalExpressionHint] = useState("");
  const [hintsDeltaX, setHintsDeltaX] = useState(0);
  const [showSelectModal, setShowSelectModal] = useState(true);

  const taskSetToEdit = useMockConstructorToEdit<TaskSetConstructorInputs>(
    mockTaskSets
  );

  const tasks =
    taskSetToEdit?.tasks.map((taskLink: TaskLinkInput) => {
      return mockTasks[taskLink.taskCode];
    }) || [];

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: { ...taskSetToEdit, levels: tasks },
  });
  const { register, getValues, control } = methods;
  const { fields, append } = useFieldArray({
    control,
    name: "tasks",
  });

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
    setStartExpressionHint(getValues().levels[index].startExpression);
    setGoalExpressionHint(getValues().levels[index].goalExpression);
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
    setLevelNames(
      fields.map((field, i) => {
        return getValues().levels[i].nameRu;
      })
    );
  }, [fields]);

  const [visualizationMode, setVisualizationMode] = useState<VisualizationMode>(
    VisualizationMode.LIST
  );

  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const subjectTypeValue = useState({ label: "1", value: "1" });

  return (
    <div className="create-game-page">
      <div
        className="create-game-page__form-container"
        style={{
          width: !showHintsBlock ? "100%" : `calc(50% + ${hintsDeltaX}px)`,
        }}
      >
        <div className="create-game-page__form">
          <FormProvider {...methods}>
            <div className="form-group">
              <label>Task Set Space Code</label>
              <input
                name="taskSetSpaceCode"
                type="text"
                className="form-control"
                ref={register}
                defaultValue={taskSetToEdit?.namespace}
              />
            </div>
            <div className="form-group">
              <label>Имя En</label>
              <input
                name="nameEn"
                type="text"
                className="form-control"
                ref={register}
                defaultValue={taskSetToEdit?.nameEn}
              />
            </div>
            <div className="form-group">
              <label>Имя Ru</label>
              <input
                name="nameRu"
                type="text"
                className="form-control"
                ref={register}
                defaultValue={taskSetToEdit?.nameRu}
              />
            </div>
            <div>
              <label>Предметные области</label>
              <Select
                isMulti
                name="subjectTypes"
                defaultValue={filterSubjectTypes(taskSetToEdit?.subjectTypes)}
                options={filterSubjectTypes(subjectTypes.join(","))}
                ref={register}
              />
              {/*<input*/}
              {/*  name="nameRu"*/}
              {/*  type="text"*/}
              {/*  className="form-control"*/}
              {/*  ref={register}*/}
              {/*  defaultValue={taskSetToEdit?.nameRu}*/}
              {/*/>*/}
            </div>

            <h3>Уровни</h3>
            <div className="create-game-page__visualization-mode-switchers">
              <div
                className={`create-game-page__visualization-mode-switcher ${
                  visualizationMode === VisualizationMode.LIST &&
                  "create-game-page__visualization-mode-switcher--active"
                }`}
                onClick={() => {
                  setVisualizationMode(VisualizationMode.LIST);
                }}
              >
                Список
              </div>
              <div
                className={`create-game-page__visualization-mode-switcher ${
                  visualizationMode === VisualizationMode.TABLE &&
                  "create-game-page__visualization-mode-switcher--active"
                }`}
                onClick={() => {
                  setVisualizationMode(VisualizationMode.TABLE);
                }}
              >
                Таблица
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
                            field.levelType === "auto" ? mdiRobot : mdiWrench
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
                      className="btn u-mr-sm"
                      onClick={() => {
                        append({
                          levelType: "auto",
                        });
                        setSelectedLevel(fields.length);
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>автоматический уровень</span>
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        append({
                          levelType: "manual",
                        });
                        setSelectedLevel(fields.length);
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>ручной уровень</span>
                    </button>
                    <button
                      className="btn u-mr-sm"
                      onClick={() => {
                        setShowSelectModal(true);
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>существующий уровень</span>
                    </button>
                    <button
                      className="btn"
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
                      levelType={fields[index].levelType}
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
                <div className="form-levels-table__add-level-buttons">
                  <button
                    className="btn u-mr-sm"
                    onClick={() => {
                      append({
                        levelType: "auto",
                      });
                    }}
                  >
                    <Icon path={mdiPlus} size={1.2} />
                    <span>автоматический уровень</span>
                  </button>
                  <button
                    className="btn u-mr-sm"
                    onClick={() => {
                      append({
                        levelType: "manual",
                      });
                    }}
                  >
                    <Icon path={mdiPlus} size={1.2} />
                    <span>ручной уровень</span>
                  </button>
                  <button
                    className="btn u-mr-sm"
                    onClick={() => {
                      setShowSelectModal(true);
                    }}
                  >
                    <Icon path={mdiPlus} size={1.2} />
                    <span>существующий уровень</span>
                  </button>
                  <button
                    className="btn"
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
        >
          <SelectConstructorItemList
            items={Object.keys(mockTasks).map(
              (code: string): FilterableSelectListItem => {
                const { nameRu, namespace } = mockTasks[code];
                return {
                  name: nameRu,
                  namespace,
                  code,
                  game: (() => {
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
                  onSelect: () => {
                    append(mockTasks[code]);
                    setShowSelectModal(false);
                  },
                };
              }
            )}
            propsToFilter={["namespace", "game"]}
          />
        </AppModal>
      </div>
      {/*HINTS BLOCK*/}
      <div
        className="create-game-page__icon"
        onClick={() => setShowHintsBlock(!showHintsBlock)}
      >
        <Icon
          size={3}
          path={showHintsBlock ? mdiCloseCircle : mdiCommentQuestion}
        />
      </div>
      <div
        className="create-game-page__hints"
        style={{
          width: showHintsBlock ? `calc(50% - ${hintsDeltaX}px)` : "0",
          opacity: showHintsBlock ? "1" : "0",
        }}
      >
        <Draggable
          axis="x"
          position={{
            x: 0,
            y: 0,
          }}
          defaultClassName="create-game-page__hints-dragger"
          defaultClassNameDragging="create-game-page__hints-dragger create-game-page__hints-dragger--dragging"
          onStop={(_, { lastX }) => {
            setHintsDeltaX((prevState) => {
              return prevState + lastX;
            });
          }}
        >
          <span />
        </Draggable>
        <div className="create-game-page__math-quill-hint">
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
    </div>
  );
};

export default TaskSetConstructor;

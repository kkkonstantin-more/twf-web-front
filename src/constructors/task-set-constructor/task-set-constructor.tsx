import React, { FC, RefObject, useEffect, useState } from "react";
import Draggable from "react-draggable";
import "../../copmonents/custom-forms/level-form.scss";
import "./task-set-constructor.scss";
import MathQuillEditor from "../../copmonents/math-quill-editor/math-quill-editor";
import Icon from "@mdi/react";
import {
  mdiCloseCircle,
  mdiCommentQuestion,
  mdiPlus,
  mdiRobot,
  mdiWrench,
} from "@mdi/js";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import LevelForm, {
  Level,
  LevelType,
} from "../../copmonents/custom-forms/level-form";
import RulePackConstructor from "../../copmonents/rule-pack-constructor/rule-pack-constructor";
import mockTaskSets, { TaskSet } from "../../mock-data/task-sets";
import Select from "react-select";

const subjectTypes: string[] = [
  "subject type 1",
  "subject type 2",
  "subject type 3",
  "subject type 4",
  "subject type 5",
  "subject type 6",
  "subject type 7",
  "subject type 8",
  "subject type 9",
  "subject type 10",
];

export enum VisualizationMode {
  TABLE = "TABLE",
  LIST = "LIST",
}

interface TaskSetConstructorProps {
  taskSetToEditCode?: any;
}

interface SelectOption {
  label: string;
  value: string;
}

const filterSubjectTypes = (
  str: string | undefined
): SelectOption[] | undefined => {
  return str ? str.split(",").map((e) => ({ label: e, value: e })) : undefined;
};

const TaskSetConstructor: React.FC<TaskSetConstructorProps> = ({
  taskSetToEditCode,
}: TaskSetConstructorProps): JSX.Element => {
  const [showHintsBlock, setShowHintsBlock] = useState(false);
  const [startExpressionHint, setStartExpressionHint] = useState("");
  const [goalExpressionHint, setGoalExpressionHint] = useState("");
  const [hintsDeltaX, setHintsDeltaX] = useState(0);

  const taskSetToEdit: TaskSet | null =
    taskSetToEditCode && mockTaskSets[taskSetToEditCode - 1]
      ? mockTaskSets[taskSetToEditCode - 1]
      : null;

  type FormInputs = {
    gameName: string;
    gameSpace: string;
    levels: Level[];
  };

  const methods = useForm<FormInputs>({
    mode: "onSubmit",
  });

  const { register, getValues, control } = methods;

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "levels", // unique name for your Field Array
    }
  );

  const [levelNames, setLevelNames] = useState<string[]>([]);
  const currentEditedLevelRef: RefObject<HTMLInputElement> = React.createRef();
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
        return getValues().levels[i].name;
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
                defaultValue={taskSetToEdit?.taskSetSpaceCode}
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
                            field.levelType === LevelType.AUTO
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
                      className="btn u-mr-sm"
                      onClick={() => {
                        append({
                          levelType: LevelType.AUTO,
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
                          levelType: LevelType.MANUAL,
                        });
                        setSelectedLevel(fields.length);
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>ручной уровень</span>
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
                    <LevelForm
                      key={index}
                      levelType={fields[index].levelType}
                      index={index}
                      defaultValue={fields[index]}
                      remove={remove}
                      swap={swap}
                      append={append}
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
                        levelType: LevelType.AUTO,
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
                        levelType: LevelType.MANUAL,
                      });
                    }}
                  >
                    <Icon path={mdiPlus} size={1.2} />
                    <span>ручной уровень</span>
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

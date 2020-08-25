import React, { RefObject, useEffect, useState } from "react";

import JSONEditorComponent from "../../copmonents/json-editor/json-editor";
import CodeMirror from "../../copmonents/editors/code-mirror/code-mirror";
import games from "./games";
import JSONEditorForm from "../../copmonents/json-editor-form/json-editor-form";
import MathQuill from "../../copmonents/math-quill/math-quill";

import "../../copmonents/custom-forms/level-form.scss";
import "./create-game-page.scss";
import MathQuillEditor from "../../copmonents/math-quill-editor/math-quill-editor";
import CustomForms from "../../copmonents/custom-forms/custom-forms";
import Icon from "@mdi/react";
import { mdiCloseCircle, mdiCommentQuestion, mdiPlus } from "@mdi/js";
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

const CreateGamePage = () => {
  const [showHintsBlock, setShowHintsBlock] = useState(false);
  const [startExpressionHint, setStartExpressionHint] = useState("");
  const [goalExpressionHint, setGoalExpressionHint] = useState("");
  const [currentEditedLevel, setCurrentEditedLevel] = useState<number | null>(
    null
  );

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
  const currentEditedLevelRef: RefObject<HTMLInputElement> = React.createRef();
  const updateDemo = (index: number) => {
    setStartExpressionHint(getValues().levels[index].startExpression);
    setGoalExpressionHint(getValues().levels[index].goalExpression);
    if (!showHintsBlock) setShowHintsBlock(true);
  };
  // useEffect(() => {
  //   if (currentEditedLevel !== null) {
  //     updateDemo(currentEditedLevel);
  //   }
  // }, [currentEditedLevel]);

  return (
    <div className="create-game-page">
      <MathQuillEditor inputRef={React.createRef()} width="20rem" />
      <div
        className="create-game-page__form-container"
        style={{ width: showHintsBlock ? "50%" : "100%" }}
      >
        <div className="create-game-page__form">
          <FormProvider {...methods}>
            <div className="form-group">
              <label>Название игры</label>
              <input
                name="gameName"
                type="text"
                className="form-control"
                ref={register}
              />
            </div>
            <div className="form-group">
              <label>Game Space</label>
              <input
                name="gameSpace"
                type="text"
                className="form-control"
                ref={register}
              />
            </div>
            <h3>Уровни</h3>
            <div className="create-game-page__form-level">
              {fields.map((field, index: number) => {
                return (
                  <div
                    key={field.id}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <LevelForm
                      index={index}
                      defaultValue={fields[index]}
                      remove={remove}
                      swap={swap}
                      append={append}
                      updateDemo={updateDemo}
                    />
                  </div>
                );
              })}
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
                className="btn"
                onClick={() => {
                  append({
                    levelType: LevelType.MANUAL,
                  });
                }}
              >
                <Icon path={mdiPlus} size={1.2} />
                <span>ручной уровень</span>
              </button>
            </div>
            <button
              className="btn u-mt-md"
              onClick={() => console.log(getValues())}
            >
              get values
            </button>
          </FormProvider>
        </div>
      </div>
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
          width: showHintsBlock ? "48%" : "0",
          opacity: showHintsBlock ? "1" : "0",
        }}
      >
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

export default CreateGamePage;

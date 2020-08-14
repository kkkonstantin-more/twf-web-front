// libs
import React, { createElement, FC, RefObject, useState } from "react";
// hooks
import { useFormContext } from "react-hook-form";
import useMergedRef from "@react-hook/merged-ref";
// components
import MathQuillEditor from "../math-quill-editor/math-quill-editor";
import Icon from "@mdi/react";
// styles
import "./level-form.scss";
// icons
import {
  mdiArrowDown,
  mdiArrowExpandLeft,
  mdiArrowExpandRight,
  mdiArrowUp,
  mdiClose,
  mdiRobot,
  mdiWrench,
} from "@mdi/js";

export enum LevelType {
  AUTO = "автоматический",
  MANUAL = "ручной",
}

export interface LevelFormProps {
  index: number;
  defaultValue: any;
  remove: (index: number) => void;
  swap: (from: number, to: number) => void;
}

const LevelForm: FC<LevelFormProps> = (props: LevelFormProps) => {
  const { index, defaultValue, remove, swap } = props;
  const { register, getValues } = useFormContext();

  const goalTypes = [
    "Сведение к целевому выражению",
    "Сведение к КНФ",
    "Сведение к ДНФ",
    "Разложения на множители",
    "Вычисление",
    "Сокращение",
    "Упрощение",
    "Другое",
  ];
  const [goalType, setGoalType] = useState("Сведение к целевому выражению");
  const startExpressionRef: RefObject<HTMLInputElement> = React.createRef();

  const inputs: { [key: string]: JSX.Element } = {
    levelType: (
      <div className="form-group">
        <label>Тип уровня</label>
        <input
          type="text"
          className="form-control"
          name={`levels[${index}].levelType`}
          defaultValue={defaultValue.levelType}
          ref={register()}
          readOnly
        />
      </div>
    ),
    name: (
      <div className="form-group">
        <label>Имя</label>
        <input
          type="text"
          className="form-control"
          name={`levels[${index}].name`}
          defaultValue={defaultValue.name}
          ref={register()}
        />
      </div>
    ),
    startExpression: (
      <div className="form-group">
        <label>Стартовое выражение</label>
        <input
          name={`levels[${index}].startExpression`}
          className="form-control"
          type="text"
          // eslint-disable-next-line
          ref={useMergedRef(register(), startExpressionRef)}
          defaultValue={defaultValue.startExpression}
        />
        <MathQuillEditor
          inputRef={startExpressionRef}
          showOperationTab={false}
        />
      </div>
    ),
    goalType: (
      <div className="form-group">
        <label>Тип цели</label>
        <select
          name={`levels[${index}].goalType`}
          className="form-control"
          ref={register()}
          value={goalType}
          onChange={(event: any) => {
            setGoalType(event.target.value);
          }}
        >
          {goalTypes.map((type: string, i) => {
            return <option key={i}>{type}</option>;
          })}
        </select>
      </div>
    ),
    goalDetails: createElement(() => {
      if (
        goalType === "Сведение к целевому выражению" ||
        goalType === "Упрощение"
      ) {
        return (
          <div className="form-group">
            <label>Конечное выражение</label>
            <input
              name={`levels[${index}].goalExpression`}
              className="form-control"
              type="text"
              ref={register()}
              defaultValue={defaultValue.goalExpression}
            />
          </div>
        );
      } else if (
        goalType === "Сведение к КНФ" ||
        goalType === "Сведение к ДНФ"
      ) {
        return (
          <div className="form-group">
            <label>Натуральное число</label>
            <input
              name={`levels[${index}].goalNaturalNumber`}
              className="form-control"
              type="number"
              ref={register()}
              defaultValue={defaultValue.goalNaturalNumber}
            />
          </div>
        );
      } else return <></>;
    }),
    subjectTypes: (
      <div className="form-group">
        <label>Предметая область</label>
        <input
          name={`levels[${index}].subjectTypes`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.subjectTypes}
        />
      </div>
    ),
    additionalPacks: (
      <div className="form-group">
        <label>Дополнительные пакеты правил</label>
        <input
          name={`levels[${index}].additionalPacks`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.additionalPacks}
        />
      </div>
    ),
    customLevelPack: (
      <div className="form-group">
        <label>Свой пакет правил</label>
        <input
          name={`levels[${index}].customLevelPack`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.customLevelPack}
        />
      </div>
    ),
    expectedSteps: (
      <div className="form-group">
        <label>Ожидаемое число шагов</label>
        <input
          name={`levels[${index}].expectedSteps`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.expectedSteps}
        />
      </div>
    ),
    expectedTime: (
      <div className="form-group">
        <label>Ожидаемое время</label>
        <input
          name={`levels[${index}].expectedTime`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.expectedTime}
        />
      </div>
    ),
    levelNameEn: (
      <div className="form-group">
        <label>Имя на английском</label>
        <input
          name={`levels[${index}].levelNameEn`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.levelNameEn}
        />
      </div>
    ),
    levelNameRu: (
      <div className="form-group">
        <label>Имя на русском</label>
        <input
          name={`levels[${index}].levelNameRu`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.levelNameRu}
        />
      </div>
    ),
    levelCode: (
      <div className="form-group">
        <label>Код уровня</label>
        <input
          name={`levels[${index}].levelCode`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.levelCode}
        />
      </div>
    ),
    autoGeneratedLevelsCount: (
      <div className="form-group">
        <label>Количество автогенерируемых уровней</label>
        <input
          name={`levels[${index}].autoGeneratedLevelsCount`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.autoGeneratedLevelsCount}
        />
      </div>
    ),
    operations: (
      <div className="form-group">
        <label>Операции</label>
        <input
          name={`levels[${index}].operations`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.operations}
        />
      </div>
    ),
    stepsCountInterval: (
      <div className="form-group">
        <label>Интервал шагов</label>
        <input
          name={`levels[${index}].stepsCountInterval`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.stepsCountInterval}
        />
      </div>
    ),
    implicitTransformationsCount: (
      <div className="form-group">
        <label>Количество неявных преобразований</label>
        <input
          name={`levels[${index}].implicitTransformationsCount`}
          className="form-control"
          type="text"
          ref={register()}
          defaultValue={defaultValue.implicitTransformationsCount}
        />
      </div>
    ),
  };

  const [showAddFields, setShowAddFields] = useState(false);

  const manualLevelBasicInputs = [
    inputs.name,
    inputs.startExpression,
    inputs.goalType,
    inputs.goalDetails,
  ];

  const manualLevelAdditionalInputs = [
    inputs.subjectTypes,
    inputs.additionalPacks,
    inputs.customLevelPack,
    inputs.expectedSteps,
    inputs.expectedTime,
    inputs.levelNameEn,
    inputs.levelNameRu,
    inputs.levelCode,
    inputs.autoGeneratedLevelsCount,
    inputs.operations,
    inputs.stepsCountInterval,
    inputs.implicitTransformationsCount,
  ];

  const autoLevelBasicInputs = [
    inputs.name,
    inputs.operations,
    inputs.subjectTypes,
    inputs.stepsCountInterval,
    inputs.implicitTransformationsCount,
    inputs.autoGeneratedLevelsCount,
  ];

  const autoLevelAdditionalInputs = [
    inputs.expectedTime,
    inputs.startExpression,
    inputs.additionalPacks,
    inputs.customLevelPack,
    inputs.goalType,
    inputs.goalDetails,
    inputs.expectedSteps,
    inputs.levelNameEn,
    inputs.levelNameRu,
    inputs.levelCode,
  ];

  return (
    <div className="level-form">
      <button
        className="level-form__action-button"
        style={{ marginRight: "0" }}
        onClick={() => {
          if (index !== 0) {
            swap(index, index - 1);
          }
        }}
      >
        <Icon path={mdiArrowUp} size={2} />
      </button>
      <button
        className="level-form__action-button"
        style={{ marginRight: "0" }}
        onClick={() => {
          if (index !== getValues().levels.length - 1) {
            swap(index, index + 1);
          }
        }}
      >
        <Icon path={mdiArrowDown} size={2} />
      </button>
      <div className="level-form__level-number">{index + 1}.</div>
      {defaultValue.levelType === LevelType.AUTO ? (
        <>
          <span className="level-form__level-type-icon">
            <Icon path={mdiRobot} size={2} />
          </span>
          {autoLevelBasicInputs.map((level: JSX.Element, i: number) => {
            return <div key={i}>{level}</div>;
          })}
          {autoLevelAdditionalInputs.map((level: JSX.Element, i: number) => {
            return (
              <div
                key={i}
                style={{ display: showAddFields ? "block" : "none" }}
              >
                {level}
              </div>
            );
          })}
        </>
      ) : (
        <>
          <span className="level-form__level-type-icon">
            <Icon path={mdiWrench} size={2} />
          </span>
          {manualLevelBasicInputs.map((level: JSX.Element, i: number) => {
            return <div key={i}>{level}</div>;
          })}
          {manualLevelAdditionalInputs.map((level: JSX.Element, i: number) => {
            return (
              <div
                key={i}
                style={{ display: showAddFields ? "block" : "none" }}
              >
                {level}
              </div>
            );
          })}
        </>
      )}
      <button
        className="level-form__action-button"
        onClick={() => {
          setShowAddFields(!showAddFields);
        }}
      >
        <Icon
          path={showAddFields ? mdiArrowExpandLeft : mdiArrowExpandRight}
          size={2}
        />
      </button>
      <button
        className="level-form__action-button"
        onClick={() => {
          if (window.confirm(`Вы точно хотите удалить уровень ${index + 1}?`)) {
            remove(index);
          }
        }}
      >
        <Icon path={mdiClose} size={2} />
      </button>
    </div>
  );
};

export default LevelForm;

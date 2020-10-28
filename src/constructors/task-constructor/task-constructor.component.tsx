// libs and hooks
import React, { RefObject, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
// redux
import { connect, ConnectedProps } from "react-redux";
import { selectTaskSetJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { updateTaskSetJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import { selectAllLevelsHiddenFields } from "../../redux/levels-hidden-fields/levels-hidden-fields.selectors";
import { createStructuredSelector } from "reselect";
import reduxWatch from "redux-watch";
import store from "../../redux/store";
import {
  toggleFieldVisibilityForAllAutoLevels,
  toggleFieldVisibilityForAllManualLevels,
} from "../../redux/levels-hidden-fields/levels-hidden-fields.actions";
// components
import AppModalComponent from "../../components/app-modal/app-modal.component";
import ActionButton from "../../components/action-button/action-button.component";
import ConstructorForm from "../../components/constructor-form/constructor-form.component";
// types
import { AllLevelsHiddenFields } from "../../redux/levels-hidden-fields/levels-hidden-fields.types";
import { VisualizationMode } from "../task-set-constructor/task-set-constructor.component";
import { TaskSetConstructorInputs } from "../task-set-constructor/task-set-constructor.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { RootState } from "../../redux/root-reducer";
import {
  TaskConstructorInputs,
  TaskConstructorProps,
} from "./task-constructor.types";
// data
import { goalTypes, rulePacks, subjectTypes } from "./task-constructor.data";
// icons
import Icon from "@mdi/react";
import {
  mdiArrowDown,
  mdiArrowExpandDown,
  mdiArrowExpandLeft,
  mdiArrowExpandRight,
  mdiArrowExpandUp,
  mdiArrowUp,
  mdiClose,
  mdiContentCopy,
  mdiEye,
  mdiEyeOff,
  mdiFileEye,
  mdiPlayCircle,
  mdiRobot,
  mdiWrench,
} from "@mdi/js";
// styles
import "./task-constructor.styles.scss";

const TaskConstructor = ({
  index,
  defaultValue,
  hidden,
  updateDemo,
  taskCreationType,
  visualizationMode,
  allLevelsHiddenFields,
  toggleFieldVisibilityForAllManualLevels,
  toggleFieldVisibilityForAllAutoLevels,
  updateName,
  taskSetJSON,
  updateTaskSetJSON,
}: TaskConstructorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const { register, getValues, control, setValue, watch } = useFormContext();
  const { append, swap, remove } = useFieldArray<TaskConstructorInputs>({
    name: "tasks",
    control,
  });

  useEffect(() => {
    const taskDefaultValues = { ...defaultValue };
    delete taskDefaultValues.id;
    setValue(`tasks[${index}]`, taskDefaultValues);
    // @ts-ignore
    updateTaskSetJSON(getValues());
  }, []);

  const [localHiddenFields, setLocalHiddenFields] = useState<any>(
    (() =>
      taskCreationType === "auto"
        ? allLevelsHiddenFields.autoLevelsHiddenFields
        : allLevelsHiddenFields.manualLevelsHiddenFields)()
  );
  const [showHiddenFieldsModal, setShowHiddenFieldsModal] = useState(false);

  const toggleFieldVisibilityForAllLevels = (fieldName: string): void => {
    setLocalHiddenFields((prevState: any) => {
      return { ...prevState, [fieldName]: !prevState[fieldName] };
    });
    taskCreationType === "auto"
      ? toggleFieldVisibilityForAllAutoLevels(fieldName)
      : toggleFieldVisibilityForAllManualLevels(fieldName);
  };

  const w = reduxWatch(() => selectAllLevelsHiddenFields(store.getState()));
  store.subscribe(
    w((newVal, oldVal) => {
      const taskCreationTypeNewVal =
        taskCreationType === "manual"
          ? newVal.manualLevelsHiddenFields
          : newVal.autoLevelsHiddenFields;
      const taskCreationTypeOldVal =
        taskCreationType === "manual"
          ? oldVal.manualLevelsHiddenFields
          : oldVal.autoLevelsHiddenFields;
      for (const key in taskCreationTypeNewVal) {
        if (taskCreationTypeOldVal[key] !== taskCreationTypeNewVal[key]) {
          setLocalHiddenFields((prevState: any) => {
            return {
              ...prevState,
              [key]: taskCreationTypeNewVal[key],
            };
          });
        }
      }
    })
  );

  const [mixedInputWidth, setMixedInputWidth] = useState<number>(0);
  const inputRef: RefObject<HTMLInputElement> = React.createRef();
  useEffect(() => {
    if (inputRef.current) {
      const width = window.getComputedStyle(inputRef.current, null);
      setMixedInputWidth(
        parseFloat(width.getPropertyValue("width").slice(0, -2))
      );
    }
  }, [inputRef]);

  /* making these values dynamic with react-hook-form's watch function
  in order to conditionally render dependent fields:
  goalExpression, goalNaturalNumber, goalPattern */
  const goalTypeValue: string = watch(`tasks[${index}].goalType`);

  const allInputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: `tasks[${index}].nameEn`,
      label: "Имя En",
      type: "text",
      defaultValue: defaultValue.nameEn,
    },
    {
      name: `tasks[${index}].nameRu`,
      label: "Имя Ru",
      type: "text",
      defaultValue: defaultValue.nameRu,
    },
    {
      name: `tasks[${index}].code`,
      label: "Код",
      type: "text",
      defaultValue: defaultValue.code,
    },
    {
      name: `tasks[${index}].namespace`,
      label: "Namespace",
      type: "text",
      defaultValue: defaultValue.namespace,
    },
    {
      name: `tasks[${index}].subjectTypes`,
      label: "Предметные области",
      type: "text",
      options: subjectTypes.map((item: string) => ({
        label: item,
        value: item,
      })),
      isMulti: true,
      defaultValue: defaultValue.subjectTypes,
    },
    {
      name: `tasks[${index}].startExpression`,
      label: "Стартовое выражение",
      type: "text",
      expressionInput: true,
      defaultValue: defaultValue.startExpression,
    },
    {
      name: `tasks[${index}].goalType`,
      label: "Тип цели",
      type: "text",
      options: goalTypes.map((item: string) => ({ label: item, value: item })),
      defaultValue: defaultValue.goalType,
    },
    {
      name: `tasks[${index}].goalExpression`,
      label: "Целевое выражение",
      type: "text",
      expressionInput: true,
      defaultValue: defaultValue.goalExpression,
      isVisible: goalTypeValue === "Сведение к целевому выражению",
    },
    {
      name: `tasks[${index}].goalNumberProperty`,
      label: "Целевое числовое значение",
      type: "number",
      defaultValue: defaultValue.goalNumberProperty,
      isVisible:
        goalTypeValue === "Сведение к КНФ" ||
        goalTypeValue === "Сведение к ДНФ",
    },
    {
      name: `tasks[${index}].goalPattern`,
      label: "Патерн цели",
      type: "text",
      defaultValue: defaultValue.goalPattern,
      isVisible:
        goalTypeValue !== "Сведение к целевому выражению" &&
        goalTypeValue !== "Сведение к КНФ" &&
        goalTypeValue !== "Сведение к ДНФ",
    },
    {
      name: `tasks[${index}].rulePacks`,
      label: "Пакеты правил",
      type: "text",
      isMulti: true,
      options: rulePacks.map((item: string) => ({ label: item, value: item })),
      defaultValue: defaultValue.rulePacks,
    },
    {
      name: `tasks[${index}].stepsNumber`,
      label: "Количество шагов",
      type: "number",
      defaultValue: defaultValue.stepsNumber,
    },
    {
      name: `tasks[${index}].time`,
      label: "Время",
      type: "number",
      defaultValue: defaultValue.time,
    },
    {
      name: `tasks[${index}].difficulty`,
      label: "Сложность",
      type: "number",
      defaultValue: defaultValue.difficulty,
    },
    {
      name: `tasks[${index}].solution`,
      label: "Решение",
      type: "text",
      expressionInput: true,
      defaultValue: defaultValue.solution,
    },
    {
      name: `tasks[${index}].countOfAutoGeneratedTasks`,
      label: "Количество автогенерируемых подуровней",
      type: "number",
      defaultValue: defaultValue.countOfAutoGeneratedTasks,
    },
    {
      name: `tasks[${index}].operations`,
      label: "Операции",
      type: "text",
      defaultValue: defaultValue.operations,
    },
    {
      name: `tasks[${index}].stepsCountInterval`,
      label: "Количество шагов",
      type: "number",
      defaultValue: defaultValue.stepsCountInterval,
    },
    {
      name: `tasks[${index}].implicitTransformationsCount`,
      label: "Нетривиальных правил на шаг",
      type: "number",
      defaultValue: defaultValue.implicitTransformationsCount,
    },
    {
      name: `tasks[${index}].autoGeneratedRulePacks`,
      label: "Пакеты правил для автогенерации",
      type: "text",
      isMulti: true,
      options: rulePacks.map((item: string) => ({ label: item, value: item })),
      defaultValue: defaultValue.autoGenerationRulePacks,
    },
    {
      name: `tasks[${index}].lightWeightOperations`,
      label: "lightWeightOperations",
      type: "text",
      defaultValue: defaultValue.lightWeightOperations,
    },
    {
      name: `tasks[${index}].nullWeightOperations`,
      label: "nullWeightOperations",
      type: "text",
      defaultValue: defaultValue.nullWeightOperations,
    },
    {
      name: `tasks[${index}].startTime`,
      label: "Дата запуска",
      type: "text",
      defaultValue: defaultValue.startTime,
    },
    {
      name: `tasks[${index}].endTime`,
      label: "Дата закрытия",
      type: "text",
      defaultValue: defaultValue.endTime,
    },
  ];

  const [showAddFields, setShowAddFields] = useState(false);

  const manualTaskInputsNames = [
    "nameEn",
    "nameRu",
    "startExpression",
    "goalType",
    "goalExpression",
    "goalNaturalNumber",
    "goalPattern",
  ];

  const autoTaskInputsNames = [
    "nameEn",
    "nameRu",
    "operations",
    "subjectTypes",
    "stepsCountInterval",
    "implicitTransformationsCount",
    "autoGeneratedRulePacks",
  ];

  const manualTaskBasicInputs = allInputs.filter(
    (input: ConstructorInputProps | ConstructorSelectProps) => {
      const { name } = input;
      const prefix = `tasks[${index}].`;
      return manualTaskInputsNames.some(
        (inputName: string) => prefix + inputName === name
      );
    }
  );

  const manualTasksAdditionalInputs = allInputs.filter(
    (input: ConstructorInputProps | ConstructorSelectProps) => {
      return !manualTaskBasicInputs.includes(input);
    }
  );

  const autoTaskBasicInputs = allInputs.filter(
    (input: ConstructorInputProps | ConstructorSelectProps) => {
      const { name } = input;
      const prefix = `tasks[${index}].`;
      return autoTaskInputsNames.some(
        (inputName: string) => prefix + inputName === name
      );
    }
  );

  const autoTasksAdditionalInputs = allInputs.filter(
    (input: ConstructorInputProps | ConstructorSelectProps) => {
      return !autoTaskBasicInputs.includes(input);
    }
  );

  const tableActionButtonsLeft: {
    mdiIconPath: string;
    action: () => any;
    size: number;
  }[] = [
    {
      mdiIconPath: mdiContentCopy,
      size: 1.5,
      action() {
        append({
          ...getValues().tasks[index],
          taskCreationType: defaultValue.taskCreationType,
        });
      },
    },
    {
      mdiIconPath: mdiArrowUp,
      size: 1.5,
      action() {
        if (index !== 0) {
          swap(index, index - 1);
        }
      },
    },
    {
      mdiIconPath: mdiArrowDown,
      size: 1.5,
      action() {
        if (index !== getValues().tasks.length - 1) {
          swap(index, index + 1);
        }
      },
    },
  ];

  const tableActionButtonsRight: {
    mdiIconPath: string;
    action: () => any;
    size: number;
  }[] = [
    {
      mdiIconPath: mdiClose,
      size: 2,
      action() {
        if (window.confirm(`Вы точно хотите удалить уровень ${index + 1}?`)) {
          remove(index);
        }
      },
    },
    {
      mdiIconPath: mdiFileEye,
      size: 2,
      action() {
        setShowHiddenFieldsModal(true);
      },
    },
    {
      mdiIconPath: mdiPlayCircle,
      size: 2,
      action() {
        updateDemo(index);
      },
    },
  ];

  const listActionButtons: {
    mdiIconPath: string;
    action: () => any;
    size: number;
  }[] = tableActionButtonsLeft.concat(tableActionButtonsRight).map((item) => {
    return { ...item, size: 1.5 };
  });

  return (
    <div
      className={`level-form ${
        visualizationMode === "table" ? "level-form--table" : "level-form--list"
      }`}
      style={{
        display: `${hidden ? "none" : "flex"}`,
      }}
    >
      {visualizationMode === "list" && (
        <div className="level-form__list-action-buttons">
          {listActionButtons.map((button, i) => {
            return <ActionButton key={i} {...button} />;
          })}
        </div>
      )}
      {visualizationMode === "table" &&
        tableActionButtonsLeft.map((button, i) => {
          const { size, action, mdiIconPath } = button;
          return (
            <ActionButton
              key={i}
              mdiIconPath={mdiIconPath}
              size={size}
              action={action}
            />
          );
        })}
      {visualizationMode === "table" && (
        <div className="level-form__level-number">{index + 1}.</div>
      )}
      {defaultValue.taskCreationType === "auto" ? (
        <>
          {visualizationMode === "table" && (
            <span className="level-form__level-type-icon">
              <Icon path={mdiRobot} size={2} />
            </span>
          )}
          <ConstructorForm
            inputs={autoTaskBasicInputs}
            register={register}
            setValue={setValue}
            // @ts-ignore
            updateJSON={() => updateTaskSetJSON(getValues())}
          />
          <div
            style={{
              display: showAddFields ? "block" : "none",
            }}
          >
            <ConstructorForm
              inputs={autoTasksAdditionalInputs}
              register={register}
              setValue={setValue}
              // @ts-ignore
              updateJSON={() => updateTaskSetJSON(getValues())}
            />
          </div>
        </>
      ) : (
        <>
          {visualizationMode === "table" && (
            <span className="level-form__level-type-icon">
              <Icon path={mdiWrench} size={2} />
            </span>
          )}
          <ConstructorForm
            inputs={manualTaskBasicInputs}
            register={register}
            setValue={setValue}
            // @ts-ignore
            updateJSON={() => updateTaskSetJSON(getValues())}
          />
          <div
            style={{
              display: showAddFields ? "block" : "none",
            }}
          >
            <ConstructorForm
              inputs={manualTasksAdditionalInputs}
              register={register}
              setValue={setValue}
              // @ts-ignore
              updateJSON={() => updateTaskSetJSON(getValues())}
            />
          </div>
        </>
      )}
      {visualizationMode === "list" && (
        <ActionButton
          mdiIconPath={showAddFields ? mdiArrowExpandUp : mdiArrowExpandDown}
          size={2}
          action={() => setShowAddFields(!showAddFields)}
        />
      )}
      {visualizationMode === "table" && (
        <>
          <ActionButton
            mdiIconPath={
              showAddFields ? mdiArrowExpandLeft : mdiArrowExpandRight
            }
            size={2}
            action={() => setShowAddFields(!showAddFields)}
          />
          {tableActionButtonsRight.map((button, i) => {
            const { size, mdiIconPath, action } = button;
            return (
              <ActionButton
                key={i}
                mdiIconPath={mdiIconPath}
                size={size}
                action={action}
              />
            );
          })}
        </>
      )}
      <AppModalComponent
        isOpen={showHiddenFieldsModal}
        close={() => setShowHiddenFieldsModal(false)}
      >
        <table className="hidden-levels-fields-table">
          <tr>
            <th>Для всех</th>
            <th>Для уровня {index}</th>
            <th>Поле</th>
          </tr>
          {Object.keys(
            (() =>
              taskCreationType === "auto"
                ? allLevelsHiddenFields.autoLevelsHiddenFields
                : allLevelsHiddenFields.manualLevelsHiddenFields)()
          ).map((key: string) => {
            return (
              <tr key={key}>
                <td>
                  <ActionButton
                    mdiIconPath={localHiddenFields[key] ? mdiEyeOff : mdiEye}
                    size={2}
                    action={() => toggleFieldVisibilityForAllLevels(key)}
                    margin="0"
                  />
                </td>
                <td>
                  <ActionButton
                    mdiIconPath={localHiddenFields[key] ? mdiEyeOff : mdiEye}
                    size={2}
                    action={() =>
                      setLocalHiddenFields((prevState: any) => {
                        return {
                          ...prevState,
                          [key]: !prevState[key],
                        };
                      })
                    }
                    margin="0"
                  />
                </td>
                <td>{key}</td>
              </tr>
            );
          })}
        </table>
      </AppModalComponent>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  RootState,
  {
    allLevelsHiddenFields: AllLevelsHiddenFields;
    taskSetJSON: TaskSetConstructorInputs;
  }
>({
  allLevelsHiddenFields: selectAllLevelsHiddenFields,
  taskSetJSON: selectTaskSetJSON,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleFieldVisibilityForAllManualLevels: (fieldName: string) => {
    return dispatch(toggleFieldVisibilityForAllManualLevels(fieldName));
  },
  toggleFieldVisibilityForAllAutoLevels: (fieldName: string) => {
    return dispatch(toggleFieldVisibilityForAllAutoLevels(fieldName));
  },
  updateTaskSetJSON: (taskSetJSON: TaskSetConstructorInputs) => {
    return dispatch(updateTaskSetJSON(taskSetJSON));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(TaskConstructor);

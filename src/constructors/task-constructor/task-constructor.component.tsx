// libs and hooks
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
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
// context
import { TasksFieldArrayActionsContext } from "../task-set-constructor/task-set-constructor.component";
// components
import ActionButton from "../../components/action-button/action-button.component";
import ConstructorForm from "../../components/constructor-form/constructor-form.component";
// types
import { ActionButtonProps } from "../../components/action-button/action-button.types";
import { AllLevelsHiddenFields } from "../../redux/levels-hidden-fields/levels-hidden-fields.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { RootState } from "../../redux/root-reducer";
import { TaskConstructorProps } from "./task-constructor.types";
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
  mdiFileEye,
  mdiPlayCircle,
  mdiRobot,
  mdiWrench,
} from "@mdi/js";
// styles
import "./task-constructor.styles.scss";
import { addOneLineChangeToHistory } from "../../redux/constructor-history/constructor-history.actions";
import { ExpressionChange } from "../../redux/constructor-history/constructor-history.types";
import { ConstructorJSONsTypes } from "../../redux/constructor-jsons/constructor-jsons.types";
import { FetchedTaskSet } from "../../utils/constructors-requests/fetch-constructors.types";
import {
  convertMathInput,
  MathInputFormat,
} from "../../utils/kotlin-lib-functions";

export interface HistoryItem {
  propertyPath: string;
  value: string;
}

const TaskConstructor = ({
  index,
  defaultValue,
  hidden,
  updateDemo,
  visualizationMode,
  allLevelsHiddenFields,
  toggleFieldVisibilityForAllManualLevels,
  toggleFieldVisibilityForAllAutoLevels,
  updateName,
  taskSetJSON,
  updateTaskSetJSON,
  addToHistory,
}: TaskConstructorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const { register, getValues, watch } = useFormContext();
  // @ts-ignore
  const { append, swap, remove } = React.useContext(
    TasksFieldArrayActionsContext
  );

  const taskCreationType = defaultValue.taskCreationType;

  const [showAddFields, setShowAddFields] = useState(false);

  // TODO: rebuild hide and show inputs mechanics

  // TODO: add update name

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

  // const watchConstructorChanges = reduxWatch(() => {
  //   return selectTaskSetJSON(store.getState());
  // });
  //
  // store.subscribe(
  //   watchConstructorChanges((newVal, oldVal, objectPath) => {
  //     let changedPath: string;
  //     let newValue: string;
  //     Object.keys(newVal).forEach((key: string) => {
  //       if (newVal[key] !== oldVal[key]) {
  //         console.log(key);
  //       }
  //     });
  //   })
  // );

  /* making these values dynamic with react-hook-form's watch function
  in order to conditionally render dependent fields:
  goalExpression, goalNaturalNumber, goalPattern */
  const goalTypeValue: string = watch(`tasks[${index}].goalType`);

  const allInputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: `tasks[${index}].namespaceCode`,
      label: "Namespace",
      type: "text",
      defaultValue: defaultValue.namespaceCode,
    },
    {
      name: `tasks[${index}].code`,
      label: "Код",
      type: "text",
      defaultValue: defaultValue.code,
    },
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
      name: `tasks[${index}].originalExpression`,
      label: "Стартовое выражение",
      type: "text",
      expressionInput: true,
      defaultValue: {
        format: MathInputFormat.TEX,
        expression: defaultValue.originalExpressionTex,
      },
    },
    {
      name: `tasks[${index}].goalType`,
      label: "Тип цели",
      type: "text",
      options: goalTypes.map((item: string) => ({ label: item, value: item })),
      defaultValue: defaultValue.goalType,
    },
    {
      name: `tasks[${index}].goalPattern`,
      label: "Патерн цели",
      type: "text",
      defaultValue: defaultValue.goalPattern,
    },
    {
      name: `tasks[${index}].goalNumberProperty`,
      label: "Целевое числовое значение",
      type: "number",
      defaultValue: defaultValue.goalNumberProperty,
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
      name: `tasks[${index}].goalExpression`,
      label: "Целевое выражение",
      type: "text",
      expressionInput: true,
      defaultValue: {
        format: MathInputFormat.TEX,
        expression: defaultValue.goalExpression,
      },
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
      defaultValue: {
        format: MathInputFormat.TEX,
        expression: convertMathInput(
          MathInputFormat.STRUCTURE_STRING,
          MathInputFormat.TEX,
          defaultValue.solution
        ),
      },
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
      name: `tasks[${index}].stepsCountIntervals`,
      label: "Количество шагов",
      type: "number",
      defaultValue: defaultValue.stepsCountIntervals,
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
      name: `tasks[${index}].maxNumberOfAutogeneratedTasks`,
      label: "Максимальное количество автогенерируемых уровней",
      type: "text",
      defaultValue: defaultValue.maxNumberOfAutogeneratedTasks,
    },
    {
      name: `tasks[${index}].numberOfAutogeneratedTasksToSolve`,
      label: "Количество автогенерируемых уровней для решения",
      type: "text",
      defaultValue: defaultValue.numberOfAutogeneratedTasksToSolve,
    },
    {
      name: `tasks[${index}].otherGoalData`,
      label: "Дополнительная информация о цели задачи",
      type: "text",
      defaultValue: defaultValue.otherGoalData,
    },
    {
      name: `tasks[${index}].otherCheckSolutionData`,
      label: "Дополнительная информация о проверке решения",
      type: "text",
      defaultValue: defaultValue.otherCheckSolutionData,
    },
    {
      name: `tasks[${index}].otherAwardData`,
      label: "Дополнительная информация о награде",
      type: "text",
      defaultValue: defaultValue.otherAwardData,
    },
    {
      name: `tasks[${index}].otherAutogenerationData`,
      label: "Дополнительная информация об автогенерации",
      type: "text",
      defaultValue: defaultValue.otherAutogenerationData,
    },
    {
      name: `tasks[${index}].otherData`,
      label: "Дополнительная информация",
      type: "text",
      defaultValue: defaultValue.otherData,
    },
  ];

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

  // get basic inputs
  const [manualTaskBasicInputs, autoTaskBasicInputs] = [
    manualTaskInputsNames,
    autoTaskInputsNames,
  ].map((basicInputNames: string[]) => {
    return allInputs.filter(
      (input: ConstructorInputProps | ConstructorSelectProps) => {
        const { name } = input;
        const prefix = `tasks[${index}].`;
        return basicInputNames.some(
          (inputName: string) => prefix + inputName === name
        );
      }
    );
  });

  // get additional inputs
  const [manualTasksAddInputs, autoTasksAddInputs] = [
    manualTaskBasicInputs,
    autoTaskBasicInputs,
  ].map((basicInputs: (ConstructorInputProps | ConstructorSelectProps)[]) => {
    return allInputs
      .filter((input: ConstructorInputProps | ConstructorSelectProps) => {
        return !basicInputs.includes(input);
      })
      .map((input: ConstructorInputProps | ConstructorSelectProps) => {
        return {
          ...input,
          isVisible:
            input.isVisible === undefined
              ? showAddFields
              : input.isVisible && showAddFields,
        };
      });
  });

  const tableActionButtonsLeft: ActionButtonProps[] = [
    {
      mdiIconPath: mdiContentCopy,
      size: 1.5,
      action() {
        append({
          taskCreationType: taskCreationType,
          ...getValues().tasks[index],
        });
      },
    },
    {
      mdiIconPath: mdiArrowUp,
      size: 1.5,
      async action() {
        if (index !== 0) {
          await swap(index, index - 1);
          // @ts-ignore
          updateTaskSetJSON(getValues());
        }
      },
    },
    {
      mdiIconPath: mdiArrowDown,
      size: 1.5,
      async action() {
        if (index !== getValues().tasks.length - 1) {
          await swap(index, index + 1);
          // @ts-ignore
          updateTaskSetJSON(getValues());
        }
      },
    },
  ];

  const tableActionButtonsRight: ActionButtonProps[] = [
    {
      mdiIconPath: mdiClose,
      size: 2,
      async action() {
        if (window.confirm(`Вы точно хотите удалить уровень ${index + 1}?`)) {
          await remove(index);
          // @ts-ignore
          updateTaskSetJSON(getValues());
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

  const listTopActionButtons: ActionButtonProps[] = tableActionButtonsLeft
    .concat(tableActionButtonsRight)
    .map((item: ActionButtonProps) => {
      return { ...item, size: 1.5 };
    });

  const isTable = (): boolean => visualizationMode === "table";

  return (
    <div
      className={isTable() ? "task-constructor-table" : "task-constructor-list"}
      style={{
        display: hidden ? "none" : "flex",
      }}
    >
      {isTable() ? (
        <>
          {tableActionButtonsLeft.map(
            (button: ActionButtonProps, i: number) => {
              const { size, action, mdiIconPath } = button;
              return (
                <div key={i} className="task-constructor-table__icon">
                  <ActionButton
                    mdiIconPath={mdiIconPath}
                    size={size}
                    action={action}
                  />
                </div>
              );
            }
          )}
          <div className="task-constructor-table__icon">{index + 1}.</div>
          <div className="task-constructor-table__icon">
            <Icon
              path={taskCreationType === "auto" ? mdiRobot : mdiWrench}
              size={2}
            />
          </div>
        </>
      ) : (
        <div className="task-constructor-list__top-action-buttons">
          {listTopActionButtons.map((button: ActionButtonProps, i: number) => {
            return <ActionButton key={i} {...button} />;
          })}
        </div>
      )}
      <ConstructorForm
        inputs={
          taskCreationType === "auto"
            ? autoTaskBasicInputs.concat(autoTasksAddInputs)
            : manualTaskBasicInputs.concat(manualTasksAddInputs)
        }
        constructorType={ConstructorJSONsTypes.TASK_SET}
      />
      {isTable() ? (
        <>
          <div className="task-constructor-table__icon">
            <ActionButton
              mdiIconPath={
                showAddFields ? mdiArrowExpandLeft : mdiArrowExpandRight
              }
              size={2}
              action={() => setShowAddFields(!showAddFields)}
            />
          </div>
          {tableActionButtonsRight.map(
            (button: ActionButtonProps, i: number) => {
              const { size, mdiIconPath, action } = button;
              return (
                <div key={i} className="task-constructor-table__icon">
                  <ActionButton
                    mdiIconPath={mdiIconPath}
                    size={size}
                    action={action}
                  />
                </div>
              );
            }
          )}
        </>
      ) : (
        <ActionButton
          mdiIconPath={showAddFields ? mdiArrowExpandUp : mdiArrowExpandDown}
          size={2}
          action={() => setShowAddFields(!showAddFields)}
          margin={"2rem 0 0 0"}
        />
      )}
    </div>
  );
};

// connecting redux
const mapStateToProps = createStructuredSelector<
  RootState,
  {
    allLevelsHiddenFields: AllLevelsHiddenFields;
    taskSetJSON: FetchedTaskSet;
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
  updateTaskSetJSON: (taskSetJSON: FetchedTaskSet) => {
    return dispatch(updateTaskSetJSON(taskSetJSON));
  },
  addToHistory: (oldVal: ExpressionChange, newVal: ExpressionChange) =>
    dispatch(addOneLineChangeToHistory({ oldVal, newVal })),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(TaskConstructor);

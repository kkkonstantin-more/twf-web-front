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
import { addOneLineChangeToHistory } from "../../redux/constructor-history/constructor-history.actions";
// context
import { TasksFieldArrayActionsContext } from "../task-set-constructor/task-set-constructor.component";
// components
import ActionButton from "../../components/action-button/action-button.component";
// types
import { ActionButtonProps } from "../../components/action-button/action-button.types";
import { AllLevelsHiddenFields } from "../../redux/levels-hidden-fields/levels-hidden-fields.types";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { RootState } from "../../redux/root-reducer";
import { GoalType, TaskConstructorProps } from "./task-constructor.types";
import { ExpressionChange } from "../../redux/constructor-history/constructor-history.types";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
import { TaskSetConstructorInputs } from "../task-set-constructor/task-set-constructor.types";
// data
import {
  allPossibleGoalTypes,
  mockSubjectTypes,
} from "./task-constructor.data";
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
import ConstructorFormAlt from "../../components/constructor-form/constructor-form";
import { ConstructorFormInput } from "../../components/constructor-form/constructor-form.types";

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
  rulePacks,
}: TaskConstructorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const { register, getValues, watch, setValue } = useFormContext();
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

  const namespaceCode = watch("namespaceCode");

  const altInputs: ConstructorFormInput[] = [
    {
      name: `tasks[${index}].namespaceCode`,
      label: "Namespace",
      type: "text",
      disabled: true,
    },
    {
      name: `tasks[${index}].code`,
      label: "Код",
      type: "text",
    },
    {
      name: `tasks[${index}].nameEn`,
      label: "Имя En",
      type: "text",
    },
    {
      name: `tasks[${index}].nameRu`,
      label: "Имя Ru",
      type: "text",
    },
    {
      name: `tasks[${index}].subjectTypes`,
      label: "Предметные области",
      options: mockSubjectTypes.map((item: string) => ({
        label: item,
        value: item,
      })),
      isMulti: true,
    },
    {
      name: `tasks[${index}].originalExpression`,
      label: "Стартовое выражение",
      type: "text",
      isExpressionInput: true,
    },
    {
      name: `tasks[${index}].goalType`,
      label: "Тип цели",
      options: allPossibleGoalTypes.map((item: string) => ({
        label: item,
        value: item,
      })),
      isMulti: false,
    },
    {
      name: `tasks[${index}].goalPattern`,
      label: "Патерн цели",
      type: "text",
    },
    {
      name: `tasks[${index}].goalNumberProperty`,
      label: "Целевое числовое значение",
      type: "number",
      isRendered:
        goalTypeValue === GoalType.CNF || goalTypeValue === GoalType.DNF,
    },
    {
      name: `tasks[${index}].rulePacks`,
      label: "Пакеты правил",
      type: "text",
      isMulti: true,
      options: rulePacks.map((rp: string) => ({ label: rp, value: rp })),
    },
    {
      name: `tasks[${index}].goalExpression`,
      label: "Целевое выражение",
      type: "text",
      isExpressionInput: true,
      isRendered:
        goalTypeValue !== GoalType.CNF && goalTypeValue !== GoalType.DNF,
    },
    {
      name: `tasks[${index}].stepsNumber`,
      label: "Количество шагов",
      type: "number",
    },
    {
      name: `tasks[${index}].time`,
      label: "Время",
      type: "number",
    },
    {
      name: `tasks[${index}].difficulty`,
      label: "Сложность",
      type: "number",
    },
    {
      name: `tasks[${index}].solution`,
      label: "Решение",
      type: "text",
      isExpressionInput: true,
    },
    {
      name: `tasks[${index}].countOfAutoGeneratedTasks`,
      label: "Количество автогенерируемых подуровней",
      type: "number",
    },
    {
      name: `tasks[${index}].operations`,
      label: "Операции",
      type: "text",
    },
    {
      name: `tasks[${index}].stepsCountIntervals`,
      label: "Количество шагов",
      type: "number",
    },
    {
      name: `tasks[${index}].implicitTransformationsCount`,
      label: "Нетривиальных правил на шаг",
      type: "number",
    },
    {
      name: `tasks[${index}].autoGeneratedRulePacks`,
      label: "Пакеты правил для автогенерации",
      type: "text",
      isMulti: true,
      options: rulePacks.map((item: string) => ({ label: item, value: item })),
    },
    {
      name: `tasks[${index}].lightWeightOperations`,
      label: "lightWeightOperations",
      type: "text",
    },
    {
      name: `tasks[${index}].nullWeightOperations`,
      label: "nullWeightOperations",
      type: "text",
    },
    {
      name: `tasks[${index}].maxNumberOfAutogeneratedTasks`,
      label: "Максимальное количество автогенерируемых уровней",
      type: "text",
    },
    {
      name: `tasks[${index}].numberOfAutogeneratedTasksToSolve`,
      label: "Количество автогенерируемых уровней для решения",
      type: "text",
    },
    {
      name: `tasks[${index}].otherGoalData`,
      label: "Дополнительная информация о цели задачи",
      type: "text",
    },
    {
      name: `tasks[${index}].otherCheckSolutionData`,
      label: "Дополнительная информация о проверке решения",
      type: "text",
    },
    {
      name: `tasks[${index}].otherAwardData`,
      label: "Дополнительная информация о награде",
      type: "text",
    },
    {
      name: `tasks[${index}].otherAutogenerationData`,
      label: "Дополнительная информация об автогенерации",
      type: "text",
    },
    {
      name: `tasks[${index}].otherData`,
      label: "Дополнительная информация",
      type: "text",
    },
  ];

  const allInputs: (ConstructorSelectProps | ConstructorInputProps)[] = [
    {
      name: `tasks[${index}].namespaceCode`,
      label: "Namespace",
      type: "text",
      disabled: true,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].code`,
      label: "Код",
      type: "text",
      defaultValue: defaultValue.code,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].nameEn`,
      label: "Имя En",
      type: "text",
      defaultValue: defaultValue.nameEn,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].nameRu`,
      label: "Имя Ru",
      type: "text",
      defaultValue: defaultValue.nameRu,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].subjectTypes`,
      label: "Предметные области",
      type: "text",
      options: mockSubjectTypes.map((item: string) => ({
        label: item,
        value: item,
      })),
      isMulti: true,
      value: watch(`tasks[${index}].subjectTypes`),
      onChange: (value: string | string[]) => {
        setValue(`tasks[${index}].subjectTypes`, value);
      },
    },
    {
      name: `tasks[${index}].originalExpression`,
      label: "Стартовое выражение",
      type: "text",
      isExpressionInput: true,
      defaultValue: defaultValue.originalExpression,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].goalType`,
      label: "Тип цели",
      type: "text",
      options: allPossibleGoalTypes.map((item: string) => ({
        label: item,
        value: item,
      })),
      defaultValue: defaultValue.goalType,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].goalPattern`,
      label: "Патерн цели",
      type: "text",
      defaultValue: defaultValue.goalPattern,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].goalNumberProperty`,
      label: "Целевое числовое значение",
      type: "number",
      defaultValue: defaultValue.goalNumberProperty,
      isRendered:
        goalTypeValue === GoalType.CNF || goalTypeValue === GoalType.DNF,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].rulePacks`,
      label: "Пакеты правил",
      type: "text",
      isMulti: true,
      options: rulePacks.map((rp: string) => ({ label: rp, value: rp })),
      value: watch(`tasks[${index}].rulePacks`),
      onChange: (value: string | string[]) => {
        setValue(`tasks[${index}].rulePacks`, value);
      },
    },
    {
      name: `tasks[${index}].goalExpression`,
      label: "Целевое выражение",
      type: "text",
      isExpressionInput: true,
      defaultValue: defaultValue.goalExpression,
      isRendered:
        goalTypeValue !== GoalType.CNF && goalTypeValue !== GoalType.DNF,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].stepsNumber`,
      label: "Количество шагов",
      type: "number",
      defaultValue: defaultValue.stepsNumber,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].time`,
      label: "Время",
      type: "number",
      defaultValue: defaultValue.time,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].difficulty`,
      label: "Сложность",
      type: "number",
      defaultValue: defaultValue.difficulty,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].solution`,
      label: "Решение",
      type: "text",
      isExpressionInput: true,
      defaultValue: defaultValue.solution,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].countOfAutoGeneratedTasks`,
      label: "Количество автогенерируемых подуровней",
      type: "number",
      defaultValue: defaultValue.countOfAutoGeneratedTasks,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].operations`,
      label: "Операции",
      type: "text",
      defaultValue: defaultValue.operations,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].stepsCountIntervals`,
      label: "Количество шагов",
      type: "number",
      defaultValue: defaultValue.stepsCountIntervals,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].implicitTransformationsCount`,
      label: "Нетривиальных правил на шаг",
      type: "number",
      defaultValue: defaultValue.implicitTransformationsCount,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].autoGeneratedRulePacks`,
      label: "Пакеты правил для автогенерации",
      type: "text",
      isMulti: true,
      options: rulePacks.map((item: string) => ({ label: item, value: item })),
      value: watch(`tasks[${index}].autoGeneratedRulePacks`),
      onChange: (value: string | string[]) => {
        setValue(`tasks[${index}].autoGeneratedRulePacks`, value);
      },
    },
    {
      name: `tasks[${index}].lightWeightOperations`,
      label: "lightWeightOperations",
      type: "text",
      defaultValue: defaultValue.lightWeightOperations,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].nullWeightOperations`,
      label: "nullWeightOperations",
      type: "text",
      defaultValue: defaultValue.nullWeightOperations,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].maxNumberOfAutogeneratedTasks`,
      label: "Максимальное количество автогенерируемых уровней",
      type: "text",
      defaultValue: defaultValue.maxNumberOfAutogeneratedTasks,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].numberOfAutogeneratedTasksToSolve`,
      label: "Количество автогенерируемых уровней для решения",
      type: "text",
      defaultValue: defaultValue.numberOfAutogeneratedTasksToSolve,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].otherGoalData`,
      label: "Дополнительная информация о цели задачи",
      type: "text",
      defaultValue: defaultValue.otherGoalData,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].otherCheckSolutionData`,
      label: "Дополнительная информация о проверке решения",
      type: "text",
      defaultValue: defaultValue.otherCheckSolutionData,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].otherAwardData`,
      label: "Дополнительная информация о награде",
      type: "text",
      defaultValue: defaultValue.otherAwardData,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].otherAutogenerationData`,
      label: "Дополнительная информация об автогенерации",
      type: "text",
      defaultValue: defaultValue.otherAutogenerationData,
      constructorType: ConstructorJSONType.TASK_SET,
    },
    {
      name: `tasks[${index}].otherData`,
      label: "Дополнительная информация",
      type: "text",
      defaultValue: defaultValue.otherData,
      constructorType: ConstructorJSONType.TASK_SET,
    },
  ];

  const manualTaskInputsNames = [
    "nameEn",
    "nameRu",
    "originalExpression",
    "goalType",
    "goalExpression",
    "goalNumberProperty",
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
      async action() {
        await append({
          taskCreationType: taskCreationType,
          ...getValues().tasks[index],
        });
        // @ts-ignore
        updateTaskSetJSON(getValues());
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

  if (!hidden) {
    return (
      <div
        className={
          isTable() ? "task-constructor-table" : "task-constructor-list"
        }
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
            {listTopActionButtons.map(
              (button: ActionButtonProps, i: number) => {
                return <ActionButton key={i} {...button} />;
              }
            )}
          </div>
        )}
        <ConstructorFormAlt
          inputs={altInputs}
          constructorType={ConstructorJSONType.TASK_SET}
        />
        {/*<ConstructorForm*/}
        {/*  inputs={*/}
        {/*    taskCreationType === "auto"*/}
        {/*      ? autoTaskBasicInputs.concat(autoTasksAddInputs)*/}
        {/*      : manualTaskBasicInputs.concat(manualTasksAddInputs)*/}
        {/*  }*/}
        {/*  constructorType={ConstructorJSONType.TASK_SET}*/}
        {/*  // @ts-ignore*/}
        {/*  updateJSON={() => updateTaskSetJSON(getValues())}*/}
        {/*/>*/}
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
  } else {
    return <></>;
  }
};

// connecting redux
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
  addToHistory: (oldVal: ExpressionChange, newVal: ExpressionChange) =>
    dispatch(
      addOneLineChangeToHistory({
        oldVal,
        newVal,
        constructorType: ConstructorJSONType.TASK_SET,
      })
    ),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(TaskConstructor);

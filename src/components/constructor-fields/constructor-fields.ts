import {ConstructorFormInput} from "../constructor-form/constructor-form.types";
import {SubjectType} from "../../constructors/constants/constants";
import {getSubjectTaskTypeFields} from "./subject-task-type-fields";
import {getMainConditionsFields} from "./main-conditions-fields";
import {ComputationGoalType, ReductionGoalType, TaskType} from "./constructor-fields.type";
import {getTextDescFields} from "./text-desc-fields";
import {getTagsFields} from "./tags-fields";
import {getRulePacksFields} from "./rule-packs-fields";
import {getOtherFields} from "./other-fields";
import {getAddConditionsFields} from "./add-conditions-fields";

export const getFields = (index: number, watch: any, setValue: any, rulePacks: string[]) : ConstructorFormInput[] => {
  const subjectType: SubjectType = watch(`tasks[${index}].subjectType`);
  const taskType: TaskType = watch(`tasks[${index}].taskType`);
  const computationalGoalType: ComputationGoalType = watch(`tasks[${index}].computationGoalType`);
  const reductionGoalType: ReductionGoalType = watch(`tasks[${index}].reductionGoalType`);
  const countAnswers: number = watch(`tasks[${index}].countAnswers`);

  const removeAnswer = (num: number) => {
    if (countAnswers == 1) {
      return;
    }
    for (let i = num; i < countAnswers - 1; i++) {
      setValue(`tasks[${index}].concreteAnswers[${i}]`, watch(`tasks[${index}].concreteAnswers[${i + 1}]`));
    }
    for (let i = countAnswers - 1; i < countAnswers; i++) {
      setValue(`tasks[${index}].concreteAnswers[${i}]`, '')
    }
    setValue(`tasks[${index}].countAnswers`, countAnswers - 1)
  }

  let inputs = [
    ...getSubjectTaskTypeFields(subjectType),
    ...getMainConditionsFields(subjectType, taskType, computationalGoalType, reductionGoalType, countAnswers, removeAnswer),
    ...getAddConditionsFields(),
    ...getTagsFields(),
    ...getRulePacksFields(rulePacks),
    ...getTextDescFields(),
    ...getOtherFields(),
  ]

  return inputs.map(input => {
    let inputWithIndex = {...input};
    inputWithIndex.name = `tasks[${index}].${inputWithIndex.name}`;
    return inputWithIndex;
  });
}
import {ConstructorFormInput} from "../constructor-form/constructor-form.types";
import {SubjectType} from "../../constructors/constants/constants";
import {getSubjectTaskTypeFields} from "./subject-task-type-fields";
import {getEssenceFields} from "./main-conditions-fields";
import {ComputationGoalType, ReductionGoalType, TaskType} from "./constructor-fields.type";
import {getTextDescFields} from "./text-desc-fields";
import {getTagsFields} from "./tags-fields";
import {getRulePacksFields} from "./rule-packs-fields";
import {getOtherFields} from "./other-fields";

export const getFields = (index: number, watch: any, rulePacks: string[]) : ConstructorFormInput[] => {
  const subjectType: SubjectType = watch(`tasks[${index}].subjectType`);
  const taskType: TaskType = watch(`tasks[${index}].taskType`);
  const computationalGoalType: ComputationGoalType = watch(`tasks[${index}].computationGoalType`);
  const reductionGoalType: ReductionGoalType = watch(`tasks[${index}].reductionGoalType`);
  const countAnswers: number = watch(`tasks[${index}].countAnswers`);
  let inputs = [
    ...getSubjectTaskTypeFields(subjectType),
    ...getEssenceFields(subjectType, taskType, computationalGoalType, reductionGoalType, countAnswers),
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
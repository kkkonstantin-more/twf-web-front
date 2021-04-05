import { TaskConstructorInputs } from "./task-constructor.types";
import { taskConstructorDefaultValues } from "../task-set-constructor/task-set-constructor.data";

export const mockTasks: {
  [code: string]: TaskConstructorInputs;
} = {
  "1": {
    ...taskConstructorDefaultValues,
  },
  // "2": {
  //   namespace: "демо ns",
  //   code: "2",
  //   nameEn: "demo task",
  //   nameRu: "задачка",
  //   taskCreationType: "manual",
  //   startExpression: "3+3",
  //   goalType: "Сведение к целевому выражению",
  //   goalExpression: "6",
  //   goalNumberProperty: 0,
  //   goalPattern: "",
  //   // goalPattern: "",
  //   subjectTypes: "demo",
  //   additionalPacks: "",
  //   customLevelPack: "",
  //   expectedSteps: 0,
  //   expectedTime: 0,
  //   levelCode: "",
  //   autoGeneratedLevelsCount: 0,
  //   operations: "",
  //   stepsCountInterval: "",
  //   implicitTransformationsCount: 0,
  // },
  // "3": {
  //   namespace: "демо ns",
  //   code: "3",
  //   nameEn: "demo task 3",
  //   nameRu: "демо бета тест",
  //   taskCreationType: "manual",
  //   startExpression: "3+3",
  //   goalType: "Сведение к целевому выражению",
  //   goalExpression: "6",
  //   goalNumberProperty: 0,
  //   goalPattern: "",
  //   // goalPattern: "",
  //   subjectTypes: "demo",
  //   additionalPacks: "",
  //   customLevelPack: "",
  //   expectedSteps: 0,
  //   expectedTime: 0,
  //   levelCode: "",
  //   autoGeneratedLevelsCount: 0,
  //   operations: "",
  //   stepsCountInterval: "",
  //   implicitTransformationsCount: 0,
  // },
  // "4": {
  //   namespace: "ns Ивана Иванова",
  //   code: "3",
  //   nameEn: "demo task 3",
  //   nameRu: "демо бета тест",
  //   taskCreationType: "manual",
  //   startExpression: "3+3",
  //   goalType: "Сведение к целевому выражению",
  //   goalExpression: "6",
  //   goalNumberProperty: 0,
  //   goalPattern: "",
  //   // goalPattern: "",
  //   subjectTypes: "demo",
  //   additionalPacks: "",
  //   customLevelPack: "",
  //   expectedSteps: 0,
  //   expectedTime: 0,
  //   levelCode: "",
  //   autoGeneratedLevelsCount: 0,
  //   operations: "",
  //   stepsCountInterval: "",
  //   implicitTransformationsCount: 0,
  // },
  // "5": {
  //   namespace: "задачи для кр",
  //   code: "3",
  //   nameEn: "demo task 3",
  //   nameRu: "демо бета тест",
  //   taskCreationType: "manual",
  //   startExpression: "3+3",
  //   goalType: "Сведение к целевому выражению",
  //   goalExpression: "6",
  //   goalNumberProperty: 0,
  //   goalPattern: "",
  //   // goalPattern: "",
  //   subjectTypes: "demo",
  //   additionalPacks: "",
  //   customLevelPack: "",
  //   expectedSteps: 0,
  //   expectedTime: 0,
  //   levelCode: "",
  //   autoGeneratedLevelsCount: 0,
  //   operations: "",
  //   stepsCountInterval: "",
  //   implicitTransformationsCount: 0,
  // },
};
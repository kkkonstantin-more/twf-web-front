import { TaskSetConstructorInputs } from "./task-set-constructor.types";

export const mockTaskSets: {
  [code: string]: TaskSetConstructorInputs;
} = {
  "1": {
    namespace: "Space code 1",
    code: "code_1",
    nameEn: "Mock task set 1",
    nameRu: "Сложный интересный набор задач",
    subjectTypes: "subject type 1",
    tasks: [
      {
        namespace: "demo task set space code 1",
        taskCode: "1",
      },
    ],
  },
  "2": {
    namespace: "Space code 2",
    code: "code_2",
    nameEn: "Mock task set 2",
    nameRu: "Легкие задачи",
    subjectTypes: "subject type 2",
    tasks: [
      {
        namespace: "demo task set space code 2",
        taskCode: "1",
      },
    ],
  },
  "3": {
    namespace: "Space code 3",
    code: "code_3",
    nameEn: "Mock task set 3",
    nameRu: "Подготовка к ЕГЭ",
    subjectTypes: "subject type 3",
    tasks: [
      {
        namespace: "demo task set space code 3",
        taskCode: "1",
      },
    ],
  },
};

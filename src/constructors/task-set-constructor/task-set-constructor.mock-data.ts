import { TaskLink } from "../../mock-data/tasks";

export interface TaskSet {
  taskSetSpaceCode: string;
  code: string;
  nameEn: string;
  nameRu: string;
  subjectTypes: string;
  tasks: TaskLink[];
}

export const mockTaskSets: {
  [code: string]: TaskSet;
} = {
  "1": {
    taskSetSpaceCode: "Space code 1",
    code: "code_1",
    nameEn: "Mock task set 1",
    nameRu: "Сложный интересный набор задач",
    subjectTypes: "subject type 1",
    tasks: [
      {
        taskSetSpaceCode: "demo task set space code 1",
        taskCode: "1",
      },
    ],
  },
  "2": {
    taskSetSpaceCode: "Space code 2",
    code: "code_2",
    nameEn: "Mock task set 2",
    nameRu: "Легкие задачи",
    subjectTypes: "subject type 2",
    tasks: [
      {
        taskSetSpaceCode: "demo task set space code 2",
        taskCode: "1",
      },
    ],
  },
  "3": {
    taskSetSpaceCode: "Space code 3",
    code: "code_3",
    nameEn: "Mock task set 3",
    nameRu: "Подготовка к ЕГЭ",
    subjectTypes: "subject type 3",
    tasks: [
      {
        taskSetSpaceCode: "demo task set space code 3",
        taskCode: "1",
      },
    ],
  },
};

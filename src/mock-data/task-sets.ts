import { TaskLink } from "./tasks";

export interface TaskSet {
  taskSetSpaceCode: string;
  code: string;
  nameEn: string;
  nameRu: string;
  subjectTypes: string;
  tasks: TaskLink[];
}

const mockTaskSets: TaskSet[] = [
  {
    taskSetSpaceCode: "Space code 1",
    code: "code_1",
    nameEn: "Mock task set 1",
    nameRu: "Сложный интересный набор задач",
    subjectTypes: "subject type 1",
    tasks: [
      {
        taskSetSpaceCode: "demo task set space code 1",
        taskCode: "123",
      },
    ],
  },
  {
    taskSetSpaceCode: "Space code 2",
    code: "code_2",
    nameEn: "Mock task set 2",
    nameRu: "Легкие задачи",
    subjectTypes: "subject type 2",
    tasks: [
      {
        taskSetSpaceCode: "demo task set space code 2",
        taskCode: "123",
      },
    ],
  },
  {
    taskSetSpaceCode: "Space code 3",
    code: "code_3",
    nameEn: "Mock task set 3",
    nameRu: "Подготовка к ЕГЭ",
    subjectTypes: "subject type 3",
    tasks: [
      {
        taskSetSpaceCode: "demo task set space code 3",
        taskCode: "123",
      },
    ],
  },
  {
    taskSetSpaceCode: "Space code 4",
    code: "code_4",
    nameEn: "Mock task set 4",
    nameRu: "Для профессоров",
    subjectTypes: "subject type 4",
    tasks: [
      {
        taskSetSpaceCode: "demo task set space code 4",
        taskCode: "123",
      },
    ],
  },
];

export default mockTaskSets;

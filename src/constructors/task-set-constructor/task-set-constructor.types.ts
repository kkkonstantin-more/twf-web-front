export interface TaskLinkInput {
  namespace: string;
  taskCode: string;
}

export interface TaskSetConstructorInputs {
  namespace: string;
  code: string;
  nameEn: string;
  nameRu: string;
  subjectTypes: string;
  tasks: TaskLinkInput[];
}

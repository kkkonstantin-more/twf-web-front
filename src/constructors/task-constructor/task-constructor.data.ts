import { GoalType } from "./task-constructor.types";

export const allPossibleGoalTypes = [
  GoalType.CUSTOM,
  GoalType.EXPRESSION,
  GoalType.COMPUTATION,
  GoalType.SIMPLIFICATION,
  GoalType.CNF,
  GoalType.DNF,
  GoalType.FACTORIZATION,
];

export const allPossibleReductionTypes = [
  {
    value: GoalType.COMPUTATION,
    label: 'Вычисление'
  },
  {
    value: GoalType.SIMPLIFICATION,
    label: 'Упрощение'
  },
  {
    value: GoalType.CNF,
    label: 'x-КНФ'
  },
  {
    value: GoalType.DNF,
    label: 'x-ДНФ'
  },
  {
    value: GoalType.FACTORIZATION,
    label: 'Факторизация'
  },
];

export const allPossibleXTypes = [
  1, 2, 3, 4
];

export const mockSubjectTypes: string[] = [
  "subject type 1",
  "subject type 2",
  "subject type 3",
  "subject type 4",
  "subject type 5",
  "subject type 6",
  "subject type 7",
  "subject type 8",
  "subject type 9",
  "subject type 10",
];

export const rulePacks = [
  "пакет правил 1",
  "пакет правил 2",
  "пакет правил 3",
  "пакет правил 4",
  "пакет правил 5",
];

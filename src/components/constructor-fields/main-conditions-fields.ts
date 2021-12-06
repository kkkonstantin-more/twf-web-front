import {ComputationGoalType, Panel, ReductionGoalType, TaskType} from "./constructor-fields.type";
import {SubjectType} from "../../constructors/constants/constants";
import {
  ConstructorFormDefaultInput,
  ConstructorFormInput,
  ConstructorFormMultipleExpressionInput
} from "../constructor-form/constructor-form.types";
import {LabeledValue} from "antd/es/select";

const startExpressionField: ConstructorFormInput = {
  name: "startExpression",
  label: "Стартовое выражение",
  type: "text",
  isExpressionInput: true,
  width: 32
};

const goalExpressionField: ConstructorFormInput = {
  name: "goalExpression",
  label: "Целевое выражение",
  type: "text",
  isExpressionInput: true,
  width: 32
};

const signOptions: LabeledValue[] = ['=', '>', '>=', '<', '<='].map(el => {return {label: el, value: el}});

const signField: ConstructorFormInput = {
  name: "sign",
  label: "Знак",
  options: signOptions,
  isMulti: false,
  width: 6
}

const computationGoalTypeOptions: LabeledValue[] = [
  {
    label: 'Тип числа',
    value: ComputationGoalType.NUMBER_TYPE
  },
  {
    label: 'Заданные ответы',
    value: ComputationGoalType.CONCRETE_ANSWERS
  },
  {
    label: 'Паттерн',
    value: ComputationGoalType.PATTERN
  },
  {
    label: 'Вес',
    value: ComputationGoalType.WEIGHT
  },
];

const computationGoalType: ConstructorFormInput = {
  name: "computationGoalType",
  label: "Результат вычисления",
  options: computationGoalTypeOptions,
  isMulti: false,
  width: 12
}

const numTypeOptions: LabeledValue[] = ['N', 'Z', 'Q', 'R', 'C'].map(el => {return {label: el, value: el}});

const numTypeField: ConstructorFormInput = {
  name: "numType",
  label: "Тип числа",
  options: numTypeOptions,
  isMulti: false,
  width: 6
}

const concreteAnswersCountField: ConstructorFormDefaultInput = {
  name: "concreteAnswersCount",
  label: "",
  isVisible: false,
  type: "number",
  defaultValue: "1"
}

const concreteAnswersField: ConstructorFormMultipleExpressionInput = {
  name: "concreteAnswers",
  label: "Ответы",
  isMultipleExpressionInput: true,
  width: 100
}

const goalPatternField: ConstructorFormInput = {
  name: "goalPattern",
  label: "Патерн цели",
  type: "text",
}

const maxWeightField: ConstructorFormInput = {
  name: "maxWeight",
  label: "Вес не больше чем",
  type: "text",
}

const reductionGoalTypeOptions: LabeledValue[] = [
  {
    label: 'Разложение на множители',
    value: ReductionGoalType.FACTORIZATION
  },
  {
    label: 'Сокращение',
    value: ReductionGoalType.REDUCTION
  },
  {
    label: 'Приведение к полиному',
    value: ReductionGoalType.POLYNOMIAL
  }
];

const reductionGoalType: ConstructorFormInput = {
  name: "reductionGoalType",
  label: "Результат сведения",
  options: reductionGoalTypeOptions,
  isMulti: false,
  width: 6
}

const minMultipliersField: ConstructorFormInput = {
  name: "minMultipliers",
  label: "Минимальное число множителей",
  type: "text",
}

const varsListField: ConstructorFormInput = {
  name: "varsList",
  label: "Относительно переменных",
  type: "text",
}


const fieldsMapping: {[key in SubjectType] : {[key in TaskType]: ConstructorFormInput[]}} = {
  [SubjectType.STANDARD_MATH]: {
    [TaskType.PROOF] : [
      startExpressionField,
      signField,
      goalExpressionField
    ],
    [TaskType.COMPUTATION]: [
      startExpressionField,
      computationGoalType,
    ],
    [TaskType.REDUCTION]: [
      startExpressionField,
      reductionGoalType
    ]
  },
  // @ts-ignore
  [SubjectType.COMBINATORICS]: {},
  // @ts-ignore
  [SubjectType.COMPLEX_NUMBERS]: {},
  // @ts-ignore
  [SubjectType.LOGIC]: {},
  // @ts-ignore
  [SubjectType.PHYSICS]: {},
}

const computationAdditionalFields: {[key in ComputationGoalType] : ConstructorFormInput[]} = {
  [ComputationGoalType.NUMBER_TYPE] : [
    numTypeField
  ],
  [ComputationGoalType.CONCRETE_ANSWERS] : [
    concreteAnswersField,
    concreteAnswersCountField
  ],
  [ComputationGoalType.PATTERN] : [
    goalPatternField
  ],
  [ComputationGoalType.WEIGHT] : [
    maxWeightField
  ],
}

const reductionAdditionalFields: {[key in ReductionGoalType] : ConstructorFormInput[]} = {
  [ReductionGoalType.FACTORIZATION] : [
    minMultipliersField
  ],
  [ReductionGoalType.REDUCTION] : [],
  [ReductionGoalType.POLYNOMIAL] : [
    varsListField
  ],

}

export const getMainConditionsFields = (subjectType: SubjectType, taskType: TaskType, computationalGoalType: ComputationGoalType, reductionGoalType: ReductionGoalType): ConstructorFormInput[] => {
  if (!subjectType || !taskType) {
    return [];
  }

  let inputs = fieldsMapping[subjectType][taskType];

  if (taskType == TaskType.COMPUTATION && computationalGoalType) {
    inputs = [...inputs, ...computationAdditionalFields[computationalGoalType]]
  }

  if (taskType == TaskType.REDUCTION && reductionGoalType) {
    inputs = [...inputs, ...reductionAdditionalFields[reductionGoalType]]
  }

  return inputs.map(input => {
    input.panel = Panel.BASIC_CONDITIONS;
    return input;
  });
}
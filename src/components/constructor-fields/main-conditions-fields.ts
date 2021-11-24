import {ComputationGoalType, Panel, ReductionGoalType, TaskType} from "./constructor-fields.type";
import {SubjectType} from "../../constructors/constants/constants";
import {ConstructorFormExpressionInput, ConstructorFormInput} from "../constructor-form/constructor-form.types";
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

const countAnswersOptions: LabeledValue[] = [1, 2, 3, 4, 5].map(el => {return {label: el, value: el}});

const countAnswersField: ConstructorFormInput = {
  name: "countAnswers",
  label: "Количество ответов",
  options: countAnswersOptions,
  isMulti: false,
  width: 8
}

const concreteAnswersField: ConstructorFormExpressionInput = {
  name: "concreteAnswers",
  label: "Ответ ",
  isExpressionInput: true,
  width: 32
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
    countAnswersField
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

export const getMainConditionsFields = (subjectType: SubjectType, taskType: TaskType, computationalGoalType: ComputationGoalType, reductionGoalType: ReductionGoalType, countAnswers: number, removeAnswer: (num: number) => void): ConstructorFormInput[] => {
  if (!subjectType || !taskType) {
    return [];
  }

  let inputs = fieldsMapping[subjectType][taskType];

  if (taskType == TaskType.COMPUTATION && computationalGoalType) {
    inputs = [...inputs, ...computationAdditionalFields[computationalGoalType]]

    if (computationalGoalType == ComputationGoalType.CONCRETE_ANSWERS && countAnswers) {
      let answers: Array<ConstructorFormExpressionInput> = [];
      for (let i = 0; i < countAnswers; i++) {
        let field = {...concreteAnswersField};
        field.name = `${field.name}[${i}]`;
        field.label = `${field.label} ${i + 1}`;
        field.deleteInput = () => {removeAnswer(i)}
        answers.push(field);
      }
      inputs = [...inputs, ...answers];
    }
  }

  if (taskType == TaskType.REDUCTION && reductionGoalType) {
    inputs = [...inputs, ...reductionAdditionalFields[reductionGoalType]]
  }

  return inputs.map(input => {
    input.panel = Panel.BASIC_CONDITIONS;
    return input;
  });
}
import React from "react";
import { shallow } from "enzyme";
import FilterableSelectList from "./filterable-select-list.component";
import { FilterableSelectListItem } from "./filterable-select-list.types";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

const mockTasks: FilterableSelectListItem[] = [
  {
    name: "Запредельно сложная задача",
    namespace: "super_difficult",
    code: "very_difficult_task",
    taskSet: [
      "интересные задачки",
      "очень сложно",
      "зубодробительный набор",
      "поступление в университет",
    ],
    subjectType: [
      "тригонометрия",
      "множества",
      "дифференциалы",
      "производные",
      "полиномы",
      "пределы",
    ],
    onSelect: jest.fn().mockReturnValue(undefined),
  },
  {
    name: "Умеренно сложная задача",
    namespace: "little_bit_difficult",
    code: "not_so_easy_task",
    taskSet: ["интересные задачки", "поступление в университет", "на подумать"],
    subjectType: ["тригонометрия", "логарифмы", "теория вероятности"],
    onSelect: jest.fn().mockReturnValue(undefined),
  },
  {
    name: "Простота",
    namespace: "super_simple",
    code: "easy_breezy",
    taskSet: ["просто", "ЕГЭ"],
    subjectType: ["логарифмы", "производные"],
    onSelect: jest.fn().mockReturnValue(undefined),
  },
];

describe("filterableSelectList", () => {
  const wrapper = shallow(
    <FilterableSelectList
      items={mockTasks}
      propsToFilter={["namespace", "subjectType", "taskSet"]}
    />
  );

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("search field finds correct items with 'all' key selected", () => {
    expect.assertions(1);
    wrapper
      .find(".select-constructor-item-list__select-input")
      .simulate("change", {
        currentTarget: {
          value: "all",
        },
      });
    wrapper
      .find(".select-constructor-item-list__search-input")
      .simulate("change", {
        target: {
          value: "difficult",
        },
      });
    expect(wrapper.find(".select-constructor-item-list__item")).toHaveLength(2);
  });
});

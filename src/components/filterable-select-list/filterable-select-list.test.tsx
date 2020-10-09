// libs
import React from "react";
import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import Select from "react-select/base";
// tested components
import FilterableSelectList from "./filterable-select-list.component";
// types
import { FilterableSelectListItem } from "./filterable-select-list.types";
// add toMatchImageSnapshot to Jest
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
  const shallowWrapper: ShallowWrapper = shallow(
    <FilterableSelectList
      items={mockTasks}
      propsToFilter={["namespace", "subjectType", "taskSet"]}
    />
  );
  const mountedWrapper: ReactWrapper = mount(
    <FilterableSelectList
      items={mockTasks}
      propsToFilter={["namespace", "subjectType", "taskSet"]}
    />
  );
  const selectKeyInput: ShallowWrapper = shallowWrapper.find(
    ".select-constructor-item-list__select-input"
  );
  const searchInput: ShallowWrapper = shallowWrapper.find(
    ".select-constructor-item-list__search-input"
  );
  const getItems = function <T>(wrapper: T): T {
    // @ts-ignore
    return wrapper.find(".select-constructor-item-list__item");
  };
  const getItemName = (item: ShallowWrapper | ReactWrapper): string => {
    return item.find("span").at(0).text();
  };

  it("matches snapshot", () => {
    expect(shallowWrapper).toMatchSnapshot();
  });

  it("search field finds expected items with 'all' search key", () => {
    selectKeyInput.simulate("change", {
      currentTarget: {
        value: "all",
      },
    });
    searchInput.simulate("change", {
      target: {
        value: "difficult",
      },
    });
    getItems(shallowWrapper).forEach((item: ShallowWrapper) => {
      expect(getItemName(item)).toMatch(
        new RegExp(`${mockTasks[0].name}|${mockTasks[1].name}`)
      );
    });
  });

  it("search field finds expected items with specific search key 1", () => {
    selectKeyInput.simulate("change", {
      currentTarget: {
        value: "all",
      },
    });
    searchInput.simulate("change", {
      target: {
        value: "производные",
      },
    });
    const items: ShallowWrapper = getItems(shallowWrapper);
    expect(items).toHaveLength(2);
    items.forEach((item: ShallowWrapper) => {
      expect(getItemName(item)).toMatch(
        new RegExp(`${mockTasks[0].name}|${mockTasks[2].name}`)
      );
    });
  });

  it("search field finds expected items with specific search key 2", () => {
    selectKeyInput.simulate("change", {
      currentTarget: {
        value: "namespace",
      },
    });
    searchInput.simulate("change", {
      target: {
        value: "this namespace doesn't exist",
      },
    });
    expect(getItems(shallowWrapper)).toHaveLength(0);
  });

  it("all provided filters are rendered on the page", () => {
    expect(mountedWrapper.find(Select)).toHaveLength(3);
  });

  it("selected tokens in filters provide expected items list 1", () => {
    // select super_difficult namespace
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .first()
      .simulate("mouseDown", {
        button: 0,
      });
    mountedWrapper.find(".react-select__option").first().simulate("click");
    const item: ReactWrapper = getItems(mountedWrapper);
    expect(item).toHaveLength(1);
    expect(getItemName(item)).toMatch(mockTasks[0].name);
    mountedWrapper.unmount().mount();
  });

  it("selected tokens in filters provide expected items list 2", () => {
    // select множества in subjectType filter
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .at(2)
      .simulate("mouseDown", {
        button: 0,
      });
    mountedWrapper.find(".react-select__option").at(2).simulate("click");
    // select производные in subjectType filter
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .at(2)
      .simulate("mouseDown", {
        button: 0,
      });
    mountedWrapper.find(".react-select__option").at(2).simulate("click");
    const items: ReactWrapper = getItems(mountedWrapper);
    expect(items).toHaveLength(2);
    items.forEach((item: ReactWrapper) => {
      expect(item.text()).toMatch(
        new RegExp(`${mockTasks[0].name}|${mockTasks[2].name}`)
      );
    });
    mountedWrapper.unmount().mount();
  });

  it("selected tokens in filters provide expected items list 3", () => {
    // select little_bit_difficult namespace
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .first()
      .simulate("mouseDown", {
        button: 0,
      });
    mountedWrapper.find(".react-select__option").at(2).simulate("click");
    // select super_difficult namespace
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .first()
      .simulate("mouseDown", {
        button: 0,
      });
    mountedWrapper.find(".react-select__option").first().simulate("click");
    // select на подумать in taskSet
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .last()
      .simulate("mouseDown", {
        button: 0,
      });
    mountedWrapper.find(".react-select__option").at(5).simulate("click");
    // remove namespace tokens
    mountedWrapper
      .find(".react-select__multi-value__remove")
      .at(1)
      .simulate("click");
    mountedWrapper
      .find(".react-select__multi-value__remove")
      .at(1)
      .simulate("click");
    const item: ReactWrapper = getItems(mountedWrapper);
    expect(item).toHaveLength(1);
    expect(getItemName(item)).toMatch(mockTasks[1].name);
    mountedWrapper.unmount().mount();
  });

  it("possible tokens to choose are relevant due to selected tokens", () => {
    // select на интересные задачки in taskSet
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .last()
      .simulate("mouseDown", {
        button: 0,
      });
    mountedWrapper.find(".react-select__option").at(1).simulate("click");
    // check namespace options
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .first()
      .simulate("mouseDown", {
        button: 0,
      });
    mountedWrapper
      .find(".react-select__option")
      .forEach((item: ReactWrapper) => {
        expect(item.text()).toMatch(
          new RegExp(`${mockTasks[0].namespace}|${mockTasks[1].namespace}`)
        );
      });
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .first()
      .simulate("mouseDown", {
        button: 0,
      });
    // check that taskSet options include all taskSets
    mountedWrapper
      .find(".react-select__dropdown-indicator")
      .last()
      .simulate("mouseDown", {
        button: 0,
      });
    const allTaskSets: string[] = mockTasks
      .reduce((acc: string[], item: FilterableSelectListItem) => {
        return acc.concat([...item.taskSet]);
      }, [])
      .filter((ts: string, i: number, arr: string[]) => {
        return arr.indexOf(ts) === i && ts !== "интересные задачки";
      });
    mountedWrapper.find(".react-select__option").forEach((ts: ReactWrapper) => {
      expect(allTaskSets).toContain(ts.text());
    });
  });
});

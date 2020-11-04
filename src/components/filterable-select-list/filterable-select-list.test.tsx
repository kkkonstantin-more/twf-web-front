// libs
import React from "react";
import {
  render,
  fireEvent,
  getByText,
  RenderResult,
  screen,
} from "@testing-library/react";
import { toMatchImageSnapshot } from "jest-image-snapshot";
// components
import FilterableSelectList from "./filterable-select-list.component";
// types
import { FilterableSelectListItem } from "./filterable-select-list.types";
// add toMatchImageSnapshot to Jest
expect.extend({ toMatchImageSnapshot });
// mock data
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
// helpers
const renderFilterableSelectList = (): RenderResult => {
  return render(
    <FilterableSelectList
      items={mockTasks}
      propsToFilter={["namespace", "taskSet", "subjectType"]}
    />
  );
};
/** if optionText isn't provided only triggers dropdown of options */
const selectOptionFromReactSelect = (
  container: HTMLElement,
  optionText?: string
): void => {
  const placeholder = container.querySelector("div")?.firstChild?.firstChild;
  if (placeholder) {
    fireEvent.keyDown(placeholder, {
      key: "ArrowDown",
    });
    if (optionText) {
      fireEvent.click(getByText(container, optionText));
    }
  }
};

const deleteTokenFromReactSelect = (
  container: HTMLElement,
  tokenIndex: number
): void => {
  fireEvent.click(container.querySelectorAll("svg")[tokenIndex]);
};

describe("FilterableSelectList", () => {
  // it("matches snapshot", () => {
  //   expect(renderFilterableSelectList()).toMatchSnapshot();
  // });

  it("search field finds expected items with 'all' search key", () => {
    const { getByTestId, getAllByTestId } = renderFilterableSelectList();
    fireEvent.change(getByTestId("select-search-key"), {
      currentTarget: { value: "all" },
    });
    fireEvent.change(getByTestId("search-input"), {
      target: { value: "difficult" },
    });
    expect(getAllByTestId("item")).toHaveLength(2);
    expect(screen.getByText(mockTasks[0].name)).toBeTruthy();
    expect(screen.getByText(mockTasks[1].name)).toBeTruthy();
  });

  it("search field finds expected items with specific search key 1", () => {
    const { getByTestId, getAllByTestId } = renderFilterableSelectList();
    fireEvent.change(getByTestId("select-search-key"), {
      currentTarget: { value: "taskSet" },
    });
    fireEvent.change(getByTestId("search-input"), {
      target: { value: "производные" },
    });
    expect(getAllByTestId("item")).toHaveLength(2);
    expect(screen.getByText(mockTasks[0].name)).toBeTruthy();
    expect(screen.getByText(mockTasks[2].name)).toBeTruthy();
  });

  it("search field finds expected items with specific search key 2", () => {
    const { getByTestId, queryByTestId } = renderFilterableSelectList();
    fireEvent.change(getByTestId("select-search-key"), {
      currentTarget: { value: "namespace" },
    });
    fireEvent.change(getByTestId("search-input"), {
      target: { value: "this namespace doesn't exist" },
    });
    expect(queryByTestId("item")).toBeNull();
  });

  it("selected tokens provide expected items list 1", () => {
    const { getByTestId, getAllByTestId } = renderFilterableSelectList();
    selectOptionFromReactSelect(
      getByTestId("select-namespace"),
      "super_simple"
    );
    expect(getAllByTestId("item")).toHaveLength(1);
    expect(screen.getByText(mockTasks[2].name)).toBeTruthy();
  });

  it("selected tokens provide expected items list 2", () => {
    const { getByTestId, getAllByTestId } = renderFilterableSelectList();
    selectOptionFromReactSelect(getByTestId("select-subjectType"), "множества");
    selectOptionFromReactSelect(
      getByTestId("select-subjectType"),
      "производные"
    );
    expect(getAllByTestId("item")).toHaveLength(2);
    expect(screen.getByText(mockTasks[0].name)).toBeTruthy();
    expect(screen.getByText(mockTasks[2].name)).toBeTruthy();
  });

  it("selected tokens provide expected items list 3", () => {
    const { getByTestId, getAllByTestId } = renderFilterableSelectList();
    selectOptionFromReactSelect(
      getByTestId("select-namespace"),
      "little_bit_difficult"
    );
    selectOptionFromReactSelect(
      getByTestId("select-namespace"),
      "super_difficult"
    );
    selectOptionFromReactSelect(getByTestId("select-taskSet"), "на подумать");
    // delete all namespace tokens
    deleteTokenFromReactSelect(getByTestId("select-namespace"), 0);
    deleteTokenFromReactSelect(getByTestId("select-namespace"), 0);
    expect(getAllByTestId("item")).toHaveLength(1);
    expect(screen.getByText(mockTasks[1].name)).toBeTruthy();
  });

  it("possible tokens to choose are relevant due to selected tokens", () => {
    const { getByTestId } = renderFilterableSelectList();
    const selectTaskSetContainer: HTMLElement = getByTestId("select-taskSet");
    selectOptionFromReactSelect(
      getByTestId("select-taskSet"),
      "интересные задачки"
    );
    // check that all taskSet tokens are provided
    selectOptionFromReactSelect(selectTaskSetContainer);
    mockTasks.forEach((item: FilterableSelectListItem) => {
      item.taskSet
        .filter((ts: string) => ts !== "интересные задачки")
        .forEach((ts: string) =>
          expect(getByText(selectTaskSetContainer, ts)).toBeTruthy()
        );
    });
    // check that namespaces are relevant
    const selectNamespaceContainer: HTMLElement = getByTestId(
      "select-namespace"
    );
    selectOptionFromReactSelect(selectNamespaceContainer);
    expect(
      getByText(selectNamespaceContainer, mockTasks[0].namespace)
    ).toBeTruthy();
    expect(
      getByText(selectNamespaceContainer, mockTasks[1].namespace)
    ).toBeTruthy();
  });
});

import React from "react";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import {
  render,
  fireEvent,
  prettyDOM,
  getByText,
  findByText,
  waitForElement,
  RenderResult,
  screen,
} from "@testing-library/react";

import FilterableSelectList from "./filterable-select-list.component";
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

const renderFilterableSelectList = (): RenderResult => {
  return render(
    <FilterableSelectList
      items={mockTasks}
      propsToFilter={["namespace", "taskSet", "subjectType"]}
    />
  );
};

const selectOptionFromReactSelect = async (
  container: HTMLElement,
  placeHolderText: string,
  optionText: string
): Promise<void> => {
  const keyDownEvent = {
    key: "ArrowDown",
  };
  const placeholder = getByText(container, placeHolderText);
  fireEvent.keyDown(placeholder, keyDownEvent);
  await findByText(container, optionText);
  fireEvent.click(getByText(container, optionText));
};

const deleteTokenFromReactSelect = (
  container: HTMLElement,
  tokenIndex: number
): void => {
  fireEvent.click(container.querySelectorAll("svg")[tokenIndex]);
};

describe("FilterableSelectList", () => {
  it("matches snapshot", () => {
    expect(renderFilterableSelectList()).toMatchSnapshot();
  });

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

  it("selected tokens provide expected items list 1", async () => {
    const { getByTestId, getAllByTestId } = renderFilterableSelectList();
    await selectOptionFromReactSelect(
      getByTestId("select-namespace"),
      "Select...",
      "super_simple"
    );
    expect(getAllByTestId("item")).toHaveLength(1);
    expect(screen.getByText(mockTasks[2].name)).toBeTruthy();
  });

  it("selected tokens provide expected items list 2", async () => {
    const { getByTestId, getAllByTestId } = renderFilterableSelectList();
    await selectOptionFromReactSelect(
      getByTestId("select-subjectType"),
      "Select...",
      "множества"
    );
    await selectOptionFromReactSelect(
      getByTestId("select-subjectType"),
      "множества",
      "производные"
    );
    expect(getAllByTestId("item")).toHaveLength(2);
    expect(screen.getByText(mockTasks[0].name)).toBeTruthy();
    expect(screen.getByText(mockTasks[2].name)).toBeTruthy();
  });

  it("selected tokens provide expected items list 3", async () => {
    const { getByTestId, getAllByTestId } = renderFilterableSelectList();
    await selectOptionFromReactSelect(
      getByTestId("select-namespace"),
      "Select...",
      "little_bit_difficult"
    );
    await selectOptionFromReactSelect(
      getByTestId("select-namespace"),
      "little_bit_difficult",
      "super_difficult"
    );
    await selectOptionFromReactSelect(
      getByTestId("select-taskSet"),
      "Select...",
      "на подумать"
    );
    // delete all namespace tokens
    deleteTokenFromReactSelect(getByTestId("select-namespace"), 0);
    deleteTokenFromReactSelect(getByTestId("select-namespace"), 0);
    expect(getAllByTestId("item")).toHaveLength(1);
    expect(screen.getByText(mockTasks[1].name)).toBeTruthy();
  });
});

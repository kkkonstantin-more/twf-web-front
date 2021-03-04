import {
  ADD_ONE_LINE_CHANGE_TO_HISTORY,
  ConstructorHistory,
  ConstructorHistoryActionTypes,
} from "./constructor-history.types";
import CONSTRUCTOR_HISTORY_INITIAL_STATE from "./constructor-history.state";

import deepEqual from "fast-deep-equal/es6";

const constructorHistoryReducer = (
  state: ConstructorHistory = CONSTRUCTOR_HISTORY_INITIAL_STATE,
  action: ConstructorHistoryActionTypes
): ConstructorHistory => {
  const constructorType =
    action.type === "ADD_ONE_LINE_CHANGE_TO_HISTORY" ||
    action.type === "ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY"
      ? action.payload.constructorType
      : action.payload;
  const historyIdxType: string = constructorType + "Idx";

  switch (action.type) {
    case "ADD_ONE_LINE_CHANGE_TO_HISTORY":
      if (
        // @ts-ignore
        deepEqual(state[constructorType][state[constructorType].length - 1], {
          item: { ...action.payload.newVal },
          type: "ONE_LINE_CHANGE",
        })
      ) {
        return state;
      } else if (
        // @ts-ignore
        deepEqual(state[constructorType][state[constructorType].length - 1], {
          item: { ...action.payload.oldVal },
          type: "ONE_LINE_CHANGE",
        })
      ) {
        return {
          ...state,
          [constructorType]: [
            //@ts-ignore
            ...state[constructorType].slice(0, state[historyIdxType] + 1),
            { item: { ...action.payload.newVal }, type: "ONE_LINE_CHANGE" },
          ],
          //@ts-ignore
          [historyIdxType]: state[historyIdxType] + 1,
        };
      } else {
        return {
          ...state,
          [constructorType]: [
            //@ts-ignore
            ...state[constructorType]
              // @ts-ignore
              .slice(0, state[historyIdxType] + 1)
              .concat([
                { item: { ...action.payload.oldVal }, type: "ONE_LINE_CHANGE" },
                { item: { ...action.payload.newVal }, type: "ONE_LINE_CHANGE" },
              ]),
          ],
          //@ts-ignore
          [historyIdxType]: state[historyIdxType] + 2,
        };
      }
    case "ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY":
      // const historyIdxType: string = constructorType + "Idx";
      if (
        // @ts-ignore
        deepEqual(state[constructorType][state[constructorType].length - 1], {
          item: { ...action.payload.oldVal },
          type: "MULTIPLE_LINES_CHANGE",
        })
      ) {
        return {
          ...state,
          [constructorType]: [
            // @ts-ignore
            ...state[constructorType].slice(0, state[historyIdxType] + 1),
            {
              item: { ...action.payload.newVal },
              type: "MULTIPLE_LINES_CHANGE",
            },
          ],
          // @ts-ignore
          taskSetIdx: state[historyIdxType] + 1,
        };
      } else {
        return {
          ...state,
          [constructorType]: [
            // @ts-ignore
            ...state[constructorType]
              // @ts-ignore
              .slice(0, state[historyIdxType] + 1)
              .concat([
                {
                  item: { ...action.payload.oldVal },
                  type: "MULTIPLE_LINES_CHANGE",
                },
                {
                  item: { ...action.payload.newVal },
                  type: "MULTIPLE_LINES_CHANGE",
                },
              ]),
          ],
          // @ts-ignore
          [constructorType]: state[historyIdxType] + 2,
        };
      }
    case "REDO_HISTORY":
      return {
        ...state,
        [historyIdxType]:
        //@ts-ignore
          state[historyIdxType] !== state[constructorType].length - 1
            ? //@ts-ignore
              ++state[historyIdxType]
            : //@ts-ignore
              state[historyIdxType],
      };
    case "UNDO_HISTORY":
      return {
        ...state,
        [historyIdxType]:
        //@ts-ignore
          state[historyIdxType] >= 0
            ? //@ts-ignore
              --state[historyIdxType]
            : //@ts-ignore
              state[historyIdxType],
      };
    default:
      return state;
  }
};

export default constructorHistoryReducer;

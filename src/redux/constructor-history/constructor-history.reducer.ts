// types
import {
  ADD_ONE_LINE_CHANGE_TO_HISTORY,
  ConstructorHistory,
  ConstructorHistoryActionTypes,
} from "./constructor-history.types";
// data
import CONSTRUCTOR_HISTORY_INITIAL_STATE from "./constructor-history.state";
// utils
import deepEqual from "fast-deep-equal/es6";
import {
  getConstructorTypeFromHistoryAction,
  getConstructorTypeKey,
  getIdxTypeKey,
} from "./constructor-history.utils";

const constructorHistoryReducer = (
  state: ConstructorHistory = CONSTRUCTOR_HISTORY_INITIAL_STATE,
  action: ConstructorHistoryActionTypes
): ConstructorHistory => {
  const constructorToUpdate:
    | "taskSet"
    | "rulePack"
    | "namespace" = getConstructorTypeKey(
    getConstructorTypeFromHistoryAction(action)
  );
  const idxToUpdate:
    | "taskSetIdx"
    | "rulePackIdx"
    | "namespaceIdx" = getIdxTypeKey(
    getConstructorTypeFromHistoryAction(action)
  );

  switch (action.type) {
    case "ADD_ONE_LINE_CHANGE_TO_HISTORY":
      const lastOneLineChangeIdx: number =
        state[constructorToUpdate].length - 1;
      // case when new history value is the same as last one stored
      if (
        deepEqual(state[constructorToUpdate][lastOneLineChangeIdx], {
          item: action.payload.newVal,
          type: "ONE_LINE_CHANGE",
        })
      ) {
        // state stays unchanged
        return state;
        // case when new history value is unique
        // and value before change is the same as last one stored
      } else if (
        deepEqual(state[constructorToUpdate][lastOneLineChangeIdx], {
          item: action.payload.oldVal,
          type: "ONE_LINE_CHANGE",
        })
      ) {
        // remove all history items after current changeIndex
        // and making new value the last stored item
        return {
          ...state,
          [constructorToUpdate]: state[constructorToUpdate]
            .slice(0, state[idxToUpdate] + 1)
            .concat([{ item: action.payload.newVal, type: "ONE_LINE_CHANGE" }]),
          [idxToUpdate]: state[idxToUpdate] + 1,
        };
        // case when both new history value and value before change are unique
      } else {
        // add both values to the end of the history array
        return {
          ...state,
          [constructorToUpdate]: state[constructorToUpdate]
            .slice(0, state[idxToUpdate] + 1)
            .concat([
              { item: action.payload.oldVal, type: "ONE_LINE_CHANGE" },
              { item: action.payload.newVal, type: "ONE_LINE_CHANGE" },
            ]),
          [idxToUpdate]: state[idxToUpdate] + 2,
        };
      }

    case "ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY":
      // logic is the same as with one line change history
      const lastMultiChangeIdx: number = state[constructorToUpdate].length - 1;
      if (
        deepEqual(state[constructorToUpdate][lastMultiChangeIdx], {
          item: action.payload.newVal,
        })
      ) {
        return state;
      } else if (
        deepEqual(state[constructorToUpdate][lastMultiChangeIdx], {
          item: action.payload.oldVal,
          type: "MULTIPLE_LINES_CHANGE",
        })
      ) {
        return {
          ...state,
          [constructorToUpdate]: state[constructorToUpdate]
            .slice(0, state[idxToUpdate] + 1)
            .concat([
              {
                item: action.payload.newVal,
                type: "MULTIPLE_LINES_CHANGE",
              },
            ]),
          [idxToUpdate]: state[idxToUpdate] + 1,
        };
      } else {
        return {
          ...state,
          [constructorToUpdate]: state[constructorToUpdate]
            .slice(0, state[idxToUpdate] + 1)
            .concat([
              {
                item: action.payload.oldVal,
                type: "MULTIPLE_LINES_CHANGE",
              },
              {
                item: action.payload.newVal,
                type: "MULTIPLE_LINES_CHANGE",
              },
            ]),
          [idxToUpdate]: state[idxToUpdate] + 2,
        };
      }

    case "REDO_HISTORY":
      return {
        ...state,
        [idxToUpdate]:
          state[idxToUpdate] !== state[constructorToUpdate].length - 1
            ? state[idxToUpdate] + 1
            : state[idxToUpdate],
      };

    case "UNDO_HISTORY":
      return {
        ...state,
        [idxToUpdate]:
          state[idxToUpdate] > -1 ? state[idxToUpdate] - 1 : state[idxToUpdate],
      };

    default:
      return state;
  }
};

export default constructorHistoryReducer;

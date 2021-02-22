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
  switch (action.type) {
    case "ADD_ONE_LINE_CHANGE_TO_HISTORY":
      if (
        deepEqual(state.taskSet[state.taskSet.length - 1], {
          item: { ...action.payload.newVal },
          type: "ONE_LINE_CHANGE",
        })
      ) {
        return state;
      } else if (
        deepEqual(state.taskSet[state.taskSet.length - 1], {
          item: { ...action.payload.oldVal },
          type: "ONE_LINE_CHANGE",
        })
      ) {
        return {
          ...state,
          taskSet: [
            ...state.taskSet.slice(0, state.taskSetIdx + 1),
            { item: { ...action.payload.newVal }, type: "ONE_LINE_CHANGE" },
          ],
          taskSetIdx: state.taskSetIdx + 1,
        };
      } else {
        return {
          ...state,
          taskSet: [
            ...state.taskSet.slice(0, state.taskSetIdx + 1).concat([
              { item: { ...action.payload.oldVal }, type: "ONE_LINE_CHANGE" },
              { item: { ...action.payload.newVal }, type: "ONE_LINE_CHANGE" },
            ]),
          ],
          taskSetIdx: state.taskSetIdx + 2,
        };
      }
    case "ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY":
      if (
        deepEqual(state.taskSet[state.taskSet.length - 1], {
          item: { ...action.payload.oldVal },
          type: "MULTIPLE_LINES_CHANGE",
        })
      ) {
        return {
          ...state,
          taskSet: [
            ...state.taskSet.slice(0, state.taskSetIdx + 1),
            {
              item: { ...action.payload.newVal },
              type: "MULTIPLE_LINES_CHANGE",
            },
          ],
          taskSetIdx: state.taskSetIdx + 1,
        };
      } else {
        return {
          ...state,
          taskSet: [
            ...state.taskSet.slice(0, state.taskSetIdx + 1).concat([
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
          taskSetIdx: state.taskSetIdx + 2,
        };
      }
    case "REDO_TASK_SET_HISTORY":
      return {
        ...state,
        taskSetIdx:
          state.taskSetIdx !== state.taskSet.length - 1
            ? ++state.taskSetIdx
            : state.taskSetIdx,
      };
    case "UNDO_TASK_SET_HISTORY":
      return {
        ...state,
        taskSetIdx:
          state.taskSetIdx >= 0 ? --state.taskSetIdx : state.taskSetIdx,
      };
    default:
      return state;
  }
};

export default constructorHistoryReducer;

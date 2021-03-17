import {
  ADD_ONE_LINE_CHANGE_TO_HISTORY,
  ConstructorHistory,
  ConstructorHistoryActionTypes,
} from "./constructor-history.types";
import CONSTRUCTOR_HISTORY_INITIAL_STATE from "./constructor-history.state";

import deepEqual from "fast-deep-equal/es6";
import { ConstructorJSONType } from "../constructor-jsons/constructor-jsons.types";

const constructorHistoryReducer = (
  state: ConstructorHistory = CONSTRUCTOR_HISTORY_INITIAL_STATE,
  action: ConstructorHistoryActionTypes
): ConstructorHistory => {
  const constructorTypePropertyKey: keyof ConstructorHistory | any = (() => {
    if (
      action.type === "ADD_ONE_LINE_CHANGE_TO_HISTORY" ||
      action.type === "ADD_MULTIPLE_LINES_CHANGE_TO_HISTORY"
    ) {
      switch (action.payload.constructorType) {
        case ConstructorJSONType.TASK_SET:
          return "taskSet";
        case ConstructorJSONType.RULE_PACK:
          return "rulePack";
        case ConstructorJSONType.NAMESPACE:
          return "namespace";
        default:
          return action.payload;
      }
    } else {
      switch (action.payload) {
        case ConstructorJSONType.TASK_SET:
          return "taskSet";
        case ConstructorJSONType.RULE_PACK:
          return "rulePack";
        case ConstructorJSONType.NAMESPACE:
          return "namespace";
        default:
          return action.payload;
      }
    }
  })();

  const historyIdxType: string = constructorTypePropertyKey + "Idx";

  switch (action.type) {
    case "ADD_ONE_LINE_CHANGE_TO_HISTORY":
      if (
        // @ts-ignore
        deepEqual(
          // @ts-ignore
          state[constructorTypePropertyKey][
            // @ts-ignore
            state[constructorTypePropertyKey].length - 1
          ],
          {
            item: { ...action.payload.newVal },
            type: "ONE_LINE_CHANGE",
          }
        )
      ) {
        return state;
      } else if (
        // @ts-ignore
        deepEqual(
          // @ts-ignore
          state[constructorTypePropertyKey][
            // @ts-ignore
            state[constructorTypePropertyKey].length - 1
          ],
          {
            item: { ...action.payload.oldVal },
            type: "ONE_LINE_CHANGE",
          }
        )
      ) {
        return {
          ...state,
          // @ts-ignore
          [constructorTypePropertyKey]: [
            //@ts-ignore
            ...state[constructorTypePropertyKey].slice(
              0,
              // @ts-ignore
              state[historyIdxType] + 1
            ),
            { item: { ...action.payload.newVal }, type: "ONE_LINE_CHANGE" },
          ],
          //@ts-ignore
          [historyIdxType]: state[historyIdxType] + 1,
        };
      } else {
        return {
          ...state,
          // @ts-ignore
          [constructorTypePropertyKey]: [
            //@ts-ignore
            ...state[constructorTypePropertyKey]
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
        deepEqual(
          // @ts-ignore
          state[constructorTypePropertyKey][
            // @ts-ignore
            state[constructorTypePropertyKey].length - 1
          ],
          {
            item: { ...action.payload.oldVal },
            type: "MULTIPLE_LINES_CHANGE",
          }
        )
      ) {
        return {
          ...state,
          // @ts-ignore
          [constructorTypePropertyKey]: [
            // @ts-ignore
            ...state[constructorTypePropertyKey].slice(
              0,
              // @ts-ignore
              state[historyIdxType] + 1
            ),
            {
              item: { ...action.payload.newVal },
              type: "MULTIPLE_LINES_CHANGE",
            },
          ],
          // @ts-ignore
          [historyIdxType]: state[historyIdxType] + 1,
        };
      } else {
        return {
          ...state,
          // @ts-ignore
          [constructorTypePropertyKey]: [
            // @ts-ignore
            ...state[constructorTypePropertyKey]
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
          [historyIdxType]: state[historyIdxType] + 2,
        };
      }
    case "REDO_HISTORY":
      return {
        ...state,
        [historyIdxType]:
        //@ts-ignore
          state[historyIdxType] !== state[constructorTypePropertyKey].length - 1
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

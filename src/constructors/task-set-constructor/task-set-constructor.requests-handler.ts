// hooks and libs
import axios, { AxiosError, AxiosResponse } from "axios";
// utils
import { getAuthToken } from "../../utils/local-storage/auth-token";
import { ConstructorCreationMode } from "../common-types";
// types
import {
  TaskSetConstructorReceivedForm,
  TaskSetConstructorSendForm,
} from "./task-set-constructor.types";
import {TaskContextForm} from "../../pages/solve-math-page/solve-math-page.types";
import {RulePackConstructorReceivedForm} from "../rule-pack-constructor/rule-pack-constructor.types";
import {TaskConstructorReceivedForm} from "../task-constructor/task-constructor.types";
import {RuleConstructorReceivedForm} from "../rule-constructor/rule-constructor.types";

class TaskSetConstructorRequestsHandler {
  private static url = process.env.REACT_APP_SERVER_API + "/taskset/";

  public static async getAll(): Promise<TaskSetConstructorReceivedForm[]> {
    return axios({
      method: "get",
      url: this.url,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then(
        (
          res: AxiosResponse<{ tasksets: TaskSetConstructorReceivedForm[] }>
        ) => {
          return res.data.tasksets;
        }
      )
      .catch((e: AxiosError) => {
        console.error("Error fetching all taskSets", e.message, e.response);
        throw e;
      });
  }

  public static async getOne(
    code: string
  ): Promise<TaskContextForm> {
    return axios({
      method: "get",
      url: this.url + "edit/" + code,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then(
        (
          res: AxiosResponse<{
            taskset: TaskSetConstructorReceivedForm;
            rulePacks: RulePackConstructorReceivedForm[];
          }>
        ) => {
          res.data.taskset.tasks.forEach((task: TaskConstructorReceivedForm) => {
            if (!task.rules) {
              task.rules = []
            }
          });
          return {
            taskset: res.data.taskset,
            rulePacks: res.data.rulePacks,
          } as TaskContextForm;
        }
      )
      .catch((e: AxiosError) => {
        console.error(
          "Error fetching taskSet with code: " + code,
          e.message,
          e.response
        );
        throw e;
      });
  }

  public static async submitOne(
    creationMode: ConstructorCreationMode,
    data: TaskSetConstructorSendForm,
  ): Promise<Number> {
    return axios({
      method: "post",
      url: this.url + (creationMode === ConstructorCreationMode.CREATE ? "create/" : "update/"),
      data,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then((res: AxiosResponse) => {
        return res.status;
      })
      .catch((e: AxiosError) => {
        console.error(
          "Error posting taskSet with code: " + data.code,
          e.message,
          e.response
        );
        throw e;
      });
  }
}

export default TaskSetConstructorRequestsHandler;

// hooks and libs
import axios, { AxiosError, AxiosResponse } from "axios";
// utils
import { getAuthToken } from "../../utils/local-storage/auth-token";
// types
import {
  TaskSetConstructorReceivedForm,
  TaskSetConstructorSendForm,
} from "./task-set-constructor.types";

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
  ): Promise<TaskSetConstructorReceivedForm> {
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
          }>
        ) => {
          return res.data.taskset;
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
    data: TaskSetConstructorSendForm,
    requestType: "post" | "patch"
  ): Promise<Number> {
    return axios({
      method: requestType,
      url: this.url,
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

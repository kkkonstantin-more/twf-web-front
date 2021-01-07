// libs and hooks
import axios, { AxiosError, AxiosResponse } from "axios";
// utils
import { getAuthToken } from "../../utils/local-storage/auth-token";
// types
import {
  NamespaceReceivedForm,
  NamespaceSendForm,
} from "./namespace-constructor.types";

class NamespaceRequestHandler {
  private static url = process.env.REACT_APP_SERVER_API + "/namespace/";

  public static async getAll(): Promise<NamespaceReceivedForm[]> {
    return axios({
      method: "get",
      url: this.url,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then((res: AxiosResponse<{ namespaces: NamespaceReceivedForm[] }>) => {
        return res.data.namespaces;
      })
      .catch((e: AxiosError) => {
        console.error("Error fetching all namespaces", e.response, e.message);
        throw e;
      });
  }

  public static getOne(code: string): Promise<NamespaceReceivedForm> {
    return axios({
      method: "get",
      url: this.url + code,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then((res: AxiosResponse<NamespaceReceivedForm>) => {
        return res.data;
      })
      .catch((e: AxiosError) => {
        console.error(
          "Error trying to get namespace with code:" + code,
          e.response,
          e.message
        );
        throw e;
      });
  }

  public static submitOne(
    requestType: "post" | "patch",
    data: NamespaceSendForm
  ): Promise<number> {
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
          `Error trying to make namespace ${requestType} type request. Namespace code: ${data.code}`,
          e.response,
          e.message
        );
        throw e;
      });
  }
}

export default NamespaceRequestHandler;

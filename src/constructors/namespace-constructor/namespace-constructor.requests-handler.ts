// libs and hooks
import axios, { AxiosError, AxiosResponse } from "axios";
// utils
import { getAuthToken } from "../../utils/local-storage/auth-token";
import { ConstructorCreationMode } from "../common-types";
// types
import {
  NamespaceReceivedForm,
  NamespaceSendForm,
} from "./namespace-constructor.types";

class NamespaceConstructorRequestHandler {
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
    creationMode: ConstructorCreationMode,
    data: NamespaceSendForm
  ): Promise<number> {
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
          `Error trying to make namespace post request. Namespace code: ${data.code}`,
          e.response,
          e.message
        );
        throw e;
      });
  }
}

export default NamespaceConstructorRequestHandler;

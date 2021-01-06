import axios, { AxiosError, AxiosResponse } from "axios";
import { getAuthToken } from "../local-storage/auth-token";

export enum NamespaceGrantType {
  PUBLIC_READ_WRITE = "PUBLIC_READ_WRITE",
  PUBLIC_READ_PRIVATE_WRITE = "PUBLIC_READ_PRIVATE_WRITE",
  PRIVATE_READ_WRITE = "PRIVATE_READ_WRITE",
}

export enum NamespaceUserGrants {
  READ_WRITE = "READ_WRITE",
  READ_NO_WRITE = "READ_NO_WRITE",
}

export interface NamespaceSendFormUserGrants {
  [userCode: string]: NamespaceUserGrants;
}

export interface NamespaceReceiveForm {
  code: string;
  grantType: NamespaceGrantType;
  authorUserCode: string;
  writeGrantedUsers: string[];
  readGrantedUsers: string[];
}

export interface NamespaceSendForm {
  code: string;
  grantType: NamespaceGrantType;
  userGrants: { [key: string]: string }[];
}

class NamespaceRequestHandler {
  private static url = process.env.REACT_APP_SERVER_API + "/namespace/";

  public static async getAll(): Promise<NamespaceReceiveForm[]> {
    return axios({
      method: "get",
      url: this.url,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then((res: AxiosResponse<{ namespaces: NamespaceReceiveForm[] }>) => {
        return res.data.namespaces;
      })
      .catch((e: AxiosError) => {
        console.error("Error fetching all namespaces", e.response, e.message);
        throw e;
      });
  }

  public static getOne(code: string): Promise<NamespaceReceiveForm> {
    return axios({
      method: "get",
      url: this.url + code,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then((res: AxiosResponse<NamespaceReceiveForm>) => {
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

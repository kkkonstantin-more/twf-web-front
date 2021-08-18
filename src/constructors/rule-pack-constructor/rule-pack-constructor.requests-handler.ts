import axios, { AxiosError, AxiosResponse } from "axios";
import { getAuthToken } from "../../utils/local-storage/auth-token";
import {
  RulePackConstructorSendForm,
  RulePackConstructorReceivedForm,
} from "./rule-pack-constructor.types";

class RulePackConstructorRequestsHandler {
  private static url = process.env.REACT_APP_SERVER_API + "/rule-pack/";

  public static async getAll(): Promise<RulePackConstructorReceivedForm[]> {
    return axios({
      method: "get",
      url: this.url,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then((res: AxiosResponse<RulePackConstructorReceivedForm[]>) => {
        console.log(res.data);
        return res.data;
      })
      .catch((e: AxiosError) => {
        console.error("Error fetching all rule packs: no RulePacks found on server", e.response, e.message);
        throw e;
      });
  }

  public static getOne(code: string): Promise<RulePackConstructorReceivedForm> {
    return axios({
      method: "get",
      url: this.url + code,
      headers: {
        Authorization: "Bearer " + getAuthToken(),
      },
    })
      .then((res: AxiosResponse<RulePackConstructorReceivedForm>) => {
        return res.data;
      })
      .catch((e: AxiosError) => {
        console.error(
          "Error trying to get rule-pack with code:" + code,
          e.response,
          e.message
        );
        throw e;
      });
  }

  public static submitOne(
    requestType: "post" | "patch",
    data: RulePackConstructorSendForm
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
          `Error trying to make rule-pack ${requestType} request. Rule-pack code: ${data.code}`,
          e.response,
          e.message
        );
        throw e;
      });
  }
}

export default RulePackConstructorRequestsHandler;

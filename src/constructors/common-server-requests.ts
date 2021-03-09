import axios, { AxiosError, AxiosResponse } from "axios";

export interface FetchedUser {
  code: string;
  login: string;
  additional: string;
}

export const getAllUsers = async (): Promise<FetchedUser[]> => {
  return axios({
    method: "get",
    url: process.env.REACT_APP_SERVER_API + "/users",
  })
    .then((res: AxiosResponse<FetchedUser[]>) => {
      return res.data;
    })
    .catch((e: AxiosError) => {
      console.error("Error fetching all users", e.response, e.message);
      throw e;
    });
};

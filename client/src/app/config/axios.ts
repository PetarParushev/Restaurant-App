import axios from "axios";
import { security } from "./security";

export const httpClient = async () => {
  const accessToken = await security.getAccessTokenSilently()!();
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_SERVER,
    headers: {
      Authorization: 'Bearer ' + accessToken,
    }
  })
};

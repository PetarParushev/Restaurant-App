//import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

type GetAccessTokenType = any; /* 
  | ((options?: GetTokenSilentlyOptions | undefined) => Promise<string>)
  | (() => Promise<string>); */

let getAccessTokenSilently: GetAccessTokenType = () => {};

export const security = {
  getAccessTokenSilently: () => getAccessTokenSilently,
  setAccessTokenSilently: (func: GetAccessTokenType) =>
    (getAccessTokenSilently = func),
};
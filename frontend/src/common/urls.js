import utils from "./Utils";

export const USER_INFO_ROUTE = makeRoute("api/user/info");
export const USER_LOGIN_ROUTE = makeRoute("api/user/login"); // done
export const USER_REGISTER_ROUTE = makeRoute("api/user/signup"); // done
export const USER_DETAIL_ROUTE = makeRoute("api/user/detail"); // not being used anywhere?

export const USER_UPDATE_ROUTE = makeRoute("api/user/update");
export const USER_LOGOUT_ROUTE = makeRoute("api/user/logout");
export const USER_PASSWORD_ROUTE = makeRoute("api/user/password/");

export const CASHFLOW_CREATE_ROUTE = makeRoute("api/cashflow/create");
export const CASHFLOW_READ_ROUTE = makeRoute("api/cashflow/all");
export const CASHFLOW_UPDATE_ROUTE = makeRoute("api/cashflow/update");
export const CASHFLOW_DELETE_ROUTE = makeRoute("api/cashflow/delete/");


function makeRoute(url) {
  return `${utils.getDomain()}${url}`;
}

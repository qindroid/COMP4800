import utils from "./Utils";

export const USER_INFO_ROUTE = makeRoute("api/user/info");
export const USER_LOGIN_ROUTE = makeRoute("api/user/login");
export const USER_REGISTER_ROUTE = makeRoute("api/user/signup");
export const USER_DETAIL_ROUTE = makeRoute("api/user/detail");
export const USER_CREATE_ROUTE = makeRoute("api/user/create");
export const USER_UPDATE_ROUTE = makeRoute("api/user/update");
export const USER_LOGOUT_ROUTE = makeRoute("api/user/logout");
export const USER_PASSWORD_ROUTE = makeRoute("api/user/password/");

export const CASHFLOW = makeRoute("api/cashflow/");
export const CASHFLOW_CREATE_ROUTE = makeRoute("api/cashflow/create");

function makeRoute(url) {
  return `${utils.getDomain()}${url}`;
}

export async function createCashflow(data) {
  const response = await fetch(CASHFLOW_CREATE_ROUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const jsonData = await response.json();
  return jsonData;
}

export async function getCashflow() {
  // const response = await fetch(CASHFLOW, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   }
  // });
  const response = await fetch(CASHFLOW);
  return response.json();
}

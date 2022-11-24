import axios from "axios";

let utils = {
  getDomain() {
    return "http://localhost:4000/";
    // if (process.env.NODE_ENV === "development") {
    //     return "";
    // }
    // return "https://jllss.azurewebsites.net/";
  },

  utilFetch(method, url, data, token) {
    let options = {
      "Content-Type": "application/json",
    };

    if (token) {
      options.token = token;
    }
    console.log(options);
    let request = {
      method: method,
      url: url,
      data: data,
      headers: options,
    };
    return axios(request);
  },
};

export default utils;

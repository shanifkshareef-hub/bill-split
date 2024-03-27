/**
 :: Request network request tool.
    More detailed api documentation: https://github.com/umijs/umi-request.
    Adapted from ant-design-pro
 */
import axios, { AxiosError, AxiosResponse } from "axios";
import { notification } from "antd";
import { clearToken } from "./helpers";

let request = axios.create();

const codeMessage: Record<number, string> = {
  200: "The server successfully returned the requested data.",
  201: "The new or modified data was successful.",
  202: "A request has entered the background queue (asynchronous task).",
  204: "The deletion of data was successful.",
  400: "There was an error in the request and the server did not take action to create or modify the data.",
  401: "The user does not have permissions (token, user name, password error).",
  403: "Users are authorized, but access is prohibited.",
  404: "Requests are made for records that do not exist and the server does not operate.",
  406: "The format of the request is not available.",
  410: "The requested resource is permanently deleted and is no longer available.",
  422: "When an object is created, a validation error occurs.",
  500: "There is an error with the server, please check the server.",
  502: "Gateway error.",
  503: "The service is not available, the server is temporarily overloaded or maintained.",
  504: "The gateway timed out.",
};

// Request interceptor
request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${
    localStorage.getItem("token") ?? ""
  }`;
  return config;
});

// Response interceptor
request.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      let data = error.response.data;
      let statusCode = error.response.status;
      notification.error({
        message: "Unable to read message",
        description: codeMessage[statusCode],
      });

      if (statusCode === 401 && window.location.pathname !== "/") {
        clearToken();
        window.location.href = "/";
      }
    } else if (error.request) {
      notification.error({
        message: "Unable to handle request",
        description:
          "Check your internet or check with administrator to solve the issue",
      });
    } else {
      notification.error({
        message: "Network anomaly",
        description: error.message,
      });
    }
  }
);

export default request;

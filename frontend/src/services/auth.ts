import request from "@utils/request";

export const HOST = import.meta.env.VITE_APP_BACKEND;

interface LoginResponse extends Response {
  access_token: string;
  email: string;
  session_id: string;
  version: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  return request(`${HOST}/api/v1/tenant/login`, {
    method: "POST",
    data: {
      email: email,
      password: password,
    },
  });
}

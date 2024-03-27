import { notification } from "antd";
import { VerifyErrors } from "jsonwebtoken";

export const clearToken = () => {
  localStorage.clear();
};

export function isAuthenticated(): boolean {
  return true;
}


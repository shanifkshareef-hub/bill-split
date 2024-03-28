import request from "@utils/request";
import { ExpenseForm, IExpense, Resp } from "src/interfaces/common";

const { VITE_API_HOST: HOST } = import.meta.env;

const List = (): Promise<Resp<IExpense[]>> => {
  return request(`${HOST}/api/v1/expenses`);
};

const Get = (id: string): Promise<Resp<IExpense>> => {
  return request(`${HOST}/api/v1/expenses/${id}`);
};

const Create = (data: ExpenseForm.Create): Promise<Resp<IExpense>> => {
  return request(`${HOST}/api/v1/expenses`, {
    method: "POST",
    data,
  });
};

const Update = (
  id: string,
  data: ExpenseForm.Create
): Promise<Resp<IExpense>> => {
  return request(`${HOST}/api/v1/expenses/${id}`, {
    method: "PUT",
    data,
  });
};

const Delete = (id: string): Promise<Resp<IExpense>> => {
  return request(`${HOST}/api/v1/expenses/${id}`, {
    method: "DELETE",
  });
};

export default {
  List,
  Get,
  Create,
  Update,
  Delete,
};

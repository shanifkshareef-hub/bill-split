import request from "@utils/request";
import { OrderForm, IExpense, Resp } from "src/interfaces/common";

const { VITE_API_HOST: HOST } = import.meta.env;

const List = (): Promise<Resp<IExpense[]>> => {
  return request(`${HOST}/api/v1/orders`);
};

const Create = (data: OrderForm.Create): Promise<Resp<IExpense>> => {
  return request(`${HOST}/api/v1/orders`, {
    method: "POST",
    data,
  });
};

const Update = (
  id: string,
  data: OrderForm.Create
): Promise<Resp<IExpense>> => {
  return request(`${HOST}/api/v1/orders/${id}`, {
    method: "PUT",
    data,
  });
};

const Delete = (id: string): Promise<Resp<IExpense>> => {
  return request(`${HOST}/api/v1/orders/${id}`, {
    method: "DELETE",
  });
};

export default {
  List,
  Create,
  Update,
  Delete,
};

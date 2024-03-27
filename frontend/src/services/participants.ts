import request from "@utils/request";
import {
  ExpenseForm,
  IExpense,
  IParticipant,
  Resp,
} from "src/interfaces/common";

const { VITE_API_HOST: HOST } = import.meta.env;

const List = (): Promise<Resp<IParticipant[]>> => {
  return request(`${HOST}/api/v1/participants`);
};

const Create = (data: ExpenseForm.Create): Promise<Resp<IParticipant>> => {
  return request(`${HOST}/api/v1/participants`, {
    method: "POST",
    data,
  });
};

const Update = (
  id: string,
  data: ExpenseForm.Create
): Promise<Resp<IParticipant>> => {
  return request(`${HOST}/api/v1/participants/${id}`, {
    method: "PUT",
    data,
  });
};

const Delete = (id: string): Promise<Resp<IParticipant>> => {
  return request(`${HOST}/api/v1/participants/${id}`, {
    method: "DELETE",
  });
};

export default {
  List,
  Create,
  Update,
  Delete,
};

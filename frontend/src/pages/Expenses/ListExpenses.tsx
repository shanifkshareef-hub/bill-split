import React, { useEffect, useState } from "react";
import { IExpense } from "src/interfaces/common";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Actions from "@components/common/Actions";
import Services from "@services/expenses";

export interface ListExpenses {
  expenses: IExpense[];
  setSelected(expense: IExpense): void;
  callback(): void;
}

const ListExpenses: React.FC<ListExpenses> = ({
  expenses,
  setSelected,
  callback,
}) => {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    const resp = await Services.Delete(id);
    if (resp && resp.status && resp.data) {
      callback();
    }
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4">
        {expenses.map((obj) => {
          return (
            <div
              className="bg-white hover:bg-gray-50 rounded-md cursor-pointer"
              onClick={() => {
                navigate(`/app/expenses/${obj.id}`);
              }}
              key={obj.id}
            >
              <div className="p-2">
                <p className="font-medium">{obj.name}</p>
                <div className="flex justify-between">
                  <p className="text-gray-400">Created at </p>
                  <p>{dayjs(obj.createdAt).format()}</p>
                </div>
              </div>

              <Actions
                onDelete={() => {
                  handleDelete(obj.id);
                }}
                onEdit={() => {
                  setSelected(obj);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListExpenses;

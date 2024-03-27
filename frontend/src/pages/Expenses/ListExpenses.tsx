import React, { useEffect, useState } from "react";
import { IExpense } from "src/interfaces/common";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export interface ListExpenses {
  expenses: IExpense[];
  setSelected?(expense: IExpense): void;
}

const ListExpenses: React.FC<ListExpenses> = ({ expenses, setSelected }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid md:grid-cols-4 gap-4">
        {expenses.map((obj) => {
          return (
            <div
              className="bg-gray-100 hover:bg-gray-200 rounded-md p-2"
              onClick={() => {
                navigate(`/app/expenses/${obj.id}`);
              }}
            >
              <p className="font-medium">{obj.name}</p>
              <div className="flex justify-between">
                <p className="text-gray-400">Created at </p>
                <p>{dayjs(obj.createdAt).format()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListExpenses;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Services from "@services/expenses";
import { IExpense } from "src/interfaces/common";
import ListOrders from "@pages/Orders/ListOrders";
import ListParticipants from "@pages/Participant/List";
import CreateOrder from "@pages/Orders/CreateOrder";
import CreateParticipants from "@pages/Participant/Create";

const ExpenseDetails = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState<IExpense>();

  useEffect(() => {
    getExpense();
  }, []);

  const getExpense = async () => {
    if (!id) return;
    const resp = await Services.Get(id);
    if (resp && resp.status && resp.data) {
      setExpense(resp.data);
    }
  };

  const getSplitedAmount = () => {
    if (!expense) return;

    const count = expense.orders.length;
    let amount = 0;

    expense.orders.forEach((obj) => {
      amount = amount + obj.amount;
    });

    return amount / count;
  };

  return (
    <div>
      {expense && (
        <div className="">
          <div className="">
            <div className="flex space-x-4">
              <p className="font-semibold">Orders</p>
              <CreateOrder
                callback={getExpense}
                rendorer={<p className="text-blue-400">Add +</p>}
                expenseId={expense.id}
              />
            </div>
            <ListOrders callback={getExpense} orders={expense.orders} />
          </div>
          <div className="">
            <div className="flex space-x-4">
              <p className="font-semibold">Participants</p>
              <CreateParticipants
                callback={getExpense}
                rendorer={<p className="text-blue-400">Add +</p>}
                expenseId={expense.id}
              />
            </div>
            <ListParticipants
              callback={getExpense}
              participants={expense.participants}
            />
          </div>

          <div className="">
            <p className="font-semibold">Amount Splitted</p>
            <div className="flex space-x-4">
              {expense.participants.map((obj) => {
                return (
                  <div>
                    <p className="">{obj.name}</p>
                    <p className="">{`Rs ${getSplitedAmount()}`}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetails;

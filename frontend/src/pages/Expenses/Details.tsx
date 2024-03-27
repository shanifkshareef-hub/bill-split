import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Services from "@services/expenses";
import { IExpense } from "src/interfaces/common";
import ListOrders from "@pages/Orders/ListOrders";
import ListParticipants from "@pages/Participant/List";

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
            <p className="font-semibold">Orders</p>
            <ListOrders callback={getExpense} orders={expense.orders} />
          </div>
          <div className="font-semibold">
            <p className="">Participants</p>
            <ListParticipants
              callback={getExpense}
              participants={expense.participants}
            />
          </div>

          <div className="">
            <p className="font-semibold">Amount Splitted</p>
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
      )}
    </div>
  );
};

export default ExpenseDetails;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Services from "@services/expenses";
import { IExpense } from "src/interfaces/common";
import ListOrders from "@pages/Orders/ListOrders";

const ExpenseDetails = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState<IExpense>();

  const getExpense = async () => {
    if (!id) return;
    const resp = await Services.Get(id);
    if (resp && resp.status && resp.data) {
      setExpense(resp.data);
    }
  };

  return (
    <div>
      {expense && (
        <div className="">
          <ListOrders callback={getExpense} orders={expense.orders} />
        </div>
      )}
    </div>
  );
};

export default ExpenseDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Services from "@services/expenses";
import { IExpense } from "src/interfaces/common";
import ListOrders from "@pages/Orders/ListOrders";
import ListParticipants from "@pages/Participant/List";
import CreateOrder from "@pages/Orders/CreateOrder";
import CreateParticipants from "@pages/Participant/Create";
import { Avatar, Empty, List } from "antd";

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

  const getAmount = (type: "TOTAL" | "SPLIT") => {
    if (!expense) return;

    const count = expense.participants.length;
    let amount = 0;
    expense.orders.forEach((obj) => {
      amount = amount + obj.amount;
    });

    return type === "SPLIT" ? Math.round(amount / count) : amount;
  };

  return (
    <div>
      {expense ? (
        <>
          <div className="pb-4">
            <p className="font-semibold text-xl">{expense.name}</p>
          </div>
          <div className="space-y-4">
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
            <div className="border-t border-gray-300 py-4">
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

            <div className="w-1/4">
              <p className="font-semibold">Amount</p>
              <div className="bg-white mt-2">
                <div className="border-b  border-gray-200 p-2">
                  <p className="font-semibold">Total Amount</p>
                  <p className="">{`₹ ${getAmount("TOTAL")}`}</p>
                </div>
              </div>

              <List
                className=" bg-white p-2 "
                itemLayout="horizontal"
                dataSource={expense.participants.map((obj) => ({
                  title: obj.name,
                  amount: `₹  ${getAmount("SPLIT")}`,
                }))}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                        />
                      }
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={
                        <div className="flex justify-between">
                          <p className="">Amount</p>
                          <p className="">{item.amount}</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default ExpenseDetails;

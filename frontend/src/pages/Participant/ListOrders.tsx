import React from "react";
import { IOrder } from "src/interfaces/common";
export interface ListOrders {
  orders: IOrder[];
  callback(): void;
}
const ListOrders: React.FC<ListOrders> = ({ orders, callback }) => {



  return (
    <div className="grid md:grid-cols-4">
      {orders.map((obj) => {
        return (
          <div className="">
            <p className="font-semibold">{obj.name}</p>
            <div className="flex justify-between">
              <p className="text-gray-400">Amount </p>
              <p>{`Rs ${obj.amount}`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListOrders;

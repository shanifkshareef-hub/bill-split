import React from "react";
import { IOrder } from "src/interfaces/common";
export interface ListOrders {
  orders: IOrder[];
}
const ListOrders: React.FC<ListOrders> = ({ orders }) => {
  return (
    <div>
      {orders.map((obj) => {
        return <div className=""></div>;
      })}
    </div>
  );
};

export default ListOrders;

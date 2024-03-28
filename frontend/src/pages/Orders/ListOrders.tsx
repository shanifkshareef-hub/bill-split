import Actions from "@components/common/Actions";
import React from "react";
import { IOrder } from "src/interfaces/common";
import CreateOrder from "./CreateOrder";
import { EditOutlined } from "@ant-design/icons";
import Services from "@services/orders";
export interface ListOrders {
  orders: IOrder[];
  callback(): void;
}
const ListOrders: React.FC<ListOrders> = ({ orders, callback }) => {
  const handleDelete = async (id: string) => {
    const resp = await Services.Delete(id);
    if (resp && resp.status && resp.data) {
      callback();
    }
  };

  return (
    <div className="grid md:grid-cols-5 gap-4 pt-2">
      {orders.map((obj) => {
        return (
          <div className="rounded-md bg-white" key={obj.id}>
            <div className=" p-2 ">
              <p className="font-semibold">{obj.name}</p>
              <div className="flex justify-between text-xs">
                <p className="text-gray-400">Amount </p>
                <p>{`Rs ${obj.amount}`}</p>
              </div>
            </div>

            <Actions
              editIcon={
                <CreateOrder
                  callback={callback}
                  selected={obj}
                  expenseId={obj.expenseTypeId}
                  rendorer={
                    <EditOutlined className="text-blue-500 hover:text-blue-400" />
                  }
                />
              }
              onDelete={() => {
                handleDelete(obj.id);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ListOrders;

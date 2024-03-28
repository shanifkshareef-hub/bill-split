import Actions from "@components/common/Actions";
import React from "react";
import { IOrder } from "src/interfaces/common";
import CreateParticipants from "./Create";
import { EditOutlined } from "@ant-design/icons";
import Services from "@services/participants";
export interface ListParticipants {
  participants: IOrder[];
  callback(): void;
}
const ListParticipants: React.FC<ListParticipants> = ({
  participants,
  callback,
}) => {
  const handleDelete = async (id: string) => {
    const resp = await Services.Delete(id);
    if (resp && resp.status && resp.data) {
      callback();
    }
  };
  return (
    <div className="grid md:grid-cols-5 gap-4 pt-2">
      {participants.map((obj) => {
        return (
          <div className="rounded-md bg-white" key={obj.id}>
            <div className="p-2">
              <p className="font-semibold">{obj.name}</p>
            </div>

            <Actions
              editIcon={
                <CreateParticipants
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

export default ListParticipants;

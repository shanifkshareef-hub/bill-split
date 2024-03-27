import React from "react";
import { IOrder } from "src/interfaces/common";
export interface ListParticipants {
  participants: IOrder[];
  callback(): void;
}
const ListParticipants: React.FC<ListParticipants> = ({
  participants,
  callback,
}) => {
  return (
    <div className="grid md:grid-cols-4">
      {participants.map((obj) => {
        return (
          <div className="">
            <p className="font-semibold">{obj.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ListParticipants;

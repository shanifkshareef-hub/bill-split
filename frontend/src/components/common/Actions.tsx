import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";

export interface IActions {
  onEdit(): void;
  onDelete(): void;
}
const Actions: React.FC<IActions> = ({ onDelete, onEdit }) => {
  return (
    <div className="flex justify-evenly border-t border-gray-200 py-2">
      <EditOutlined
        className="text-blue-500 hover:text-blue-400"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      />
      <DeleteOutlined
        className="text-red-500 hover:text-red-400"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      />
    </div>
  );
};

export default Actions;

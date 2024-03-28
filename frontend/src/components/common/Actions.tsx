import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";

export interface IActions {
  onEdit?(): void;
  onDelete?(): void;
  editIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
}
const Actions: React.FC<IActions> = ({
  onDelete,
  onEdit,
  deleteIcon,
  editIcon,
}) => {
  return (
    <div className="flex justify-evenly border-t border-gray-200 py-2">
      {editIcon ?? (
        <EditOutlined
          className="text-blue-500 hover:text-blue-400"
          onClick={(e) => {
            e.stopPropagation();
            onEdit && onEdit();
          }}
        />
      )}
      {deleteIcon ?? (
        <DeleteOutlined
          className="text-red-500 hover:text-red-400"
          onClick={(e) => {
            e.stopPropagation();
            onDelete && onDelete();
          }}
        />
      )}
    </div>
  );
};

export default Actions;

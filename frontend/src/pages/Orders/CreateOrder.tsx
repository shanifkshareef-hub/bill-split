import React from "react";
export interface CreateOrder {
  callBack(): void;
}
const CreateOrder: React.FC<CreateOrder> = () => {
  return <div>CreateOrder</div>;
};

export default CreateOrder;

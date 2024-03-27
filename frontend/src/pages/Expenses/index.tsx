import React, { useEffect, useState } from "react";
import ListExpenses from "./ListExpenses";
import { Create } from "./Create";
import { IExpense } from "src/interfaces/common";
import Services from "@services/expenses";
import { Button } from "antd";

const Expenses = () => {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<IExpense>();
  const [expenses, setExpenses] = useState<IExpense[]>([]);

  useEffect(() => {
    getExpenses();
  }, []);

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const getExpenses = async () => {
    const resp = await Services.List();
    if (resp && resp.status && resp.data) {
      setExpenses(resp.data);
    }
  };

  return (
    <div>
      <div className="w-fit ml-auto">
        <Button className="bg-white" onClick={toggleModal}>
          Create
        </Button>
      </div>
      <ListExpenses expenses={expenses} setSelected={setSelected} />

      <Create
        callback={getExpenses}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Expenses;

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
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <p className="font-semibold text-xl">Expenses Groups</p>
          <p
            onClick={toggleModal}
            className="text-blue-500 hover:text-blue-400 cursor-pointer"
          >
            Add +
          </p>
        </div>
      </div>
      <ListExpenses
        expenses={expenses}
        setSelected={(data) => {
          setSelected(data);
          toggleModal();
        }}
        callback={getExpenses}
      />

      <Create
        callback={getExpenses}
        isOpen={isOpen}
        toggleModal={toggleModal}
        selected={selected}
      />
    </div>
  );
};

export default Expenses;

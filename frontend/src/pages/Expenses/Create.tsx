import { Button, Form, Input, Modal, message } from "antd";
import React, { useEffect } from "react";
import Services from "@services/expenses";
import { CreateForm, ExpenseForm, IExpense } from "src/interfaces/common";

export const Create: React.FC<CreateForm<IExpense>> = ({
  callback,
  selected,
  toggleModal,
  isOpen,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selected) {
      form.setFieldsValue({ name: selected.name });
    }
  }, [selected]);

  const closeModal = () => {
    form.resetFields();
    toggleModal();
  };

  const handleSubmit = async (data: ExpenseForm.Create) => {
    if (selected) {
      const resp = await Services.Update(selected.id, data);
      if (resp && resp.status && resp.data) {
        closeModal();
        callback();
        message.success("Created Successfully");
      }
    } else {
      const resp = await Services.Create(data);
      if (resp && resp.status && resp.data) {
        closeModal();
        callback();
        message.success("Created Successfully");
      }
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    const resp = await Services.Delete(selected.id);
    if (resp && resp.status && resp.data) {
      closeModal();
      callback();
      message.success("Created Successfully");
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        title="Create an expense group"
        footer={
          <div className="flex justify-end items-center w-full">
            <div className="flex space-x-4">
              <button className="btn--cancel" onClick={closeModal}>
                Cancel
              </button>

              <button className="btn--submit" form="expense-form" type="submit">
                {selected ? "Update" : "Create"}
              </button>
            </div>
          </div>
        }
      >
        <Form
          name="basic"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
          id="expense-form"
          form={form}
        >
          <Form.Item
            label="Expense group"
            name="name"
            rules={[
              { required: true, message: "Please enter the expense group" },
            ]}
          >
            <Input type="text" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

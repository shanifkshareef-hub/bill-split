import { Button, Form, Input, Modal, message } from "antd";
import React, { useEffect } from "react";
import Services from "@services/expenses";
import { CreateForm, ExpenseForm, IExpense } from "src/interfaces/common";

export const Create: React.FC<CreateForm<IExpense>> = ({
  callback,
  selected,
  toggleModal,
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
    const resp = await Services.Create(data);
    if (resp && resp.status && resp.data) {
      closeModal();
      callback();
      message.success("Created Successfully");
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
        footer={
          <div className="flex justify-between items-center w-full">
            <div>
              {selected && (
                <Button className="btn-danger" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </div>
            <div className="flex space-x-4">
              <button className="btn--cancel" onClick={closeModal}>
                Cancel
              </button>

              <button className="btn--submit" form="id" type="submit">
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
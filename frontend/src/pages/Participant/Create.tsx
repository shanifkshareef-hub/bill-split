import React, { useState } from "react";
import Services from "@services/participants";
import {
  IOrder,
  IParticipant,
  OrderForm,
  ParticipantForm,
} from "src/interfaces/common";
import { Button, Form, Input, Modal, message } from "antd";

export interface CreateParticipants {
  callback(): void;
  selected?: IParticipant;
}
const CreateParticipants: React.FC<CreateParticipants> = ({
  callback,
  selected,
}) => {
  const [isOpen, setOpen] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = async (data: ParticipantForm.Create) => {
    if (selected) {
      const resp = await Services.Update(selected.id, data);
      if (resp && resp.status && resp.data) {
        callback();
        toggleModal();
      }
    } else {
      const resp = await Services.Create(data);
      if (resp && resp.status && resp.data) {
        callback();
        toggleModal();
      }
    }
  };

  const toggleModal = () => {
    setOpen(!isOpen);
  };

  const closeModal = () => {
    form.resetFields();
    toggleModal();
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
      <Button onClick={toggleModal}>Edit</Button>
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
            label="Participant name"
            name="name"
            rules={[{ required: true, message: "Please enter the order name" }]}
          >
            <Input type="text" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateParticipants;

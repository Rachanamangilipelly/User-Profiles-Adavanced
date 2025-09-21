import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const EditUserModal = ({ visible, user, onCancel, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        website: user.website,
        company: user.company?.name,
        street: user.address?.street,
        suite: user.address?.suite,
        city: user.address?.city,
        zipcode: user.address?.zipcode,
      });
    }
  }, [user, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedUser  = {
          ...user,
          name: values.name,
          username: values.username,
          email: values.email,
          phone: values.phone,
          website: values.website,
          company: { ...user.company, name: values.company },
          address: {
            ...user.address,
            street: values.street,
            suite: values.suite,
            city: values.city,
            zipcode: values.zipcode,
          },
        };
        onSave(updatedUser );
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Edit User"
      okText="Save"
      onCancel={onCancel}
      onOk={handleOk}
      destroyOnClose
    >
      <Form form={form} layout="vertical" name="edit_user_form">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please input the username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input the email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>

        <Form.Item name="website" label="Website">
          <Input />
        </Form.Item>

        <Form.Item name="company" label="Company Name">
          <Input />
        </Form.Item>

        <Form.Item name="street" label="Street">
          <Input />
        </Form.Item>

        <Form.Item name="suite" label="Suite">
          <Input />
        </Form.Item>

        <Form.Item name="city" label="City">
          <Input />
        </Form.Item>

        <Form.Item name="zipcode" label="Zipcode">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
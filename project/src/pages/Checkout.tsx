import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      // Get cart items
      const cartResponse = await axios.get(`http://localhost:3001/cart?userId=${user?.id}`);
      const cartItems = cartResponse.data;

      // Clear cart after successful checkout
      await Promise.all(
        cartItems.map((item: any) => 
          axios.delete(`http://localhost:3001/cart/${item.id}`)
        )
      );

      message.success('Đã đặt hàng thành công!');
      navigate('/');
    } catch (error) {
      message.error('Không thể đặt hàng');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Họ Tên"
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ của bạn' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ của bạn' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Đặt hàng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Checkout;
import React, { useEffect, useState } from 'react';
import { Table, Button, InputNumber, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartItem, Product } from '../types';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<(CartItem & { product: Product })[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const cartResponse = await axios.get(`http://localhost:3001/cart?userId=${user.id}`);
        const items = await Promise.all(
          cartResponse.data.map(async (item: CartItem) => {
            const productResponse = await axios.get(`http://localhost:3001/products/${item.productId}`);
            return { ...item, product: productResponse.data };
          })
        );
        setCartItems(items);
      } catch (error) {
        message.error('Lỗi');
      }
    };

    fetchCart();
  }, [user, navigate]);

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      await axios.patch(`http://localhost:3001/cart/${itemId}`, { quantity });
      setCartItems(cartItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    } catch (error) {
      message.error('Không cập nhật được số lượng');
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await axios.delete(`http://localhost:3001/cart/${itemId}`);
      setCartItems(cartItems.filter(item => item.id !== itemId));
      message.success('Xóa thành công');
    } catch (error) {
      message.error('Không thể xóa');
    }
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: ['product', 'price'],
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      render: (record: CartItem & { product: Product }) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => updateQuantity(record.id, value || 1)}
        />
      ),
    },
    {
      title: 'Tổng',
      key: 'total',
      render: (record: CartItem & { product: Product }) => 
        `$${record.quantity * record.product.price}`,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record: CartItem & { product: Product }) => (
        <Button danger onClick={() => removeItem(record.id)}>Xóa</Button>
      ),
    },
  ];

  const total = cartItems.reduce((sum, item) => 
    sum + (item.quantity * item.product.price), 0
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
      <Table
        dataSource={cartItems}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <div className="mt-4 text-right">
        <p className="text-xl font-bold">Tổng: ${total}</p>
        <Button
          type="primary"
          size="large"
          className="mt-4"
          onClick={() => navigate('/checkout')}
          disabled={cartItems.length === 0}
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default Cart;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, InputNumber, message } from 'antd';
import axios from 'axios';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        message.error('lỗi');
        navigate('/');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const addToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!product) return;

    try {
      await axios.post('http://localhost:3001/cart', {
        productId: product.id,
        userId: user.id,
        quantity
      });
      message.success('Đã thêm vào giỏ hàng');
      navigate('/cart');
    } catch (error) {
      message.error('Không thêm được vào giỏ hàng');
    }
  };

  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
            <div className="flex items-center gap-4 mb-4">
              <span>Số lượng:</span>
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
              />
            </div>
            <Button type="primary" size="large" onClick={addToCart}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
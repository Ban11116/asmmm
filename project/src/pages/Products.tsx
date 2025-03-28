import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';

const { Meta } = Card;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId: number) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const response = await axios.post('http://localhost:3001/cart', {
      productId,
      userId: user.id,
      quantity: 1
    });

    if (response.status === 201) {
      navigate('/cart');
    }
  };

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <Card
            hoverable
            cover={<img alt={product.name} src={product.image} className="h-48 object-cover" />}
            actions={[
              <Button type="primary" onClick={() => navigate(`/product/${product.id}`)}>
                Chi tiết sản phẩm
              </Button>,
              <Button onClick={() => addToCart(product.id)}>Thêm vào giỏ hàng</Button>
            ]}
          >
            <Meta
              title={product.name}
              description={
                <>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-lg font-bold text-blue-600">${product.price}</p>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Products;
import React from 'react';
import { Card, Row, Col, Button, Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const Home: React.FC = () => {
  const navigate = useNavigate();

 

  const carouselImages = [
    "https://images.unsplash.com/photo-1491933382434-500287f9b54b",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    "https://images.unsplash.com/photo-1498049794561-7780e7231661"
  ];

  return (
    <div className="space-y-12">
      <Carousel autoplay className="mb-8">
        {carouselImages.map((image, index) => (
          <div key={index}>
            <div className="h-[400px] relative">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">Chào mừng đến với BSP</h2>
                  <Button type="primary" size="large" onClick={() => navigate('/products')}>
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Danh mục nổi bật</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={<img alt="Electronics" src="https://images.unsplash.com/photo-1498049794561-7780e7231661" className="h-48 object-cover" />}
                onClick={() => navigate('/products')}
              >
                <Meta title="Điện tử" description="Tiện ích và thiết bị mới nhất" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={<img alt="Accessories" src="https://images.unsplash.com/photo-1491933382434-500287f9b54b" className="h-48 object-cover" />}
                onClick={() => navigate('/products')}
              >
                <Meta title="Phụ kiện" description="Phụ kiện cao cấp dành cho bạn" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                cover={<img alt="Gadgets" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" className="h-48 object-cover" />}
                onClick={() => navigate('/products')}
              >
                <Meta title="Tiện ích" description="Tiện ích thông minh cho sử dụng hàng ngày" />
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Home;
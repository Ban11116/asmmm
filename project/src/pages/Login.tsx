import React from 'react';
import { Form, Input, Button, Card, message, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }, mode: 'login' | 'register') => {
    try {
      if (mode === 'login') {
        await login(values.email, values.password);
      } else {
        await register(values.email, values.password);
      }
      message.success(`${mode === 'login' ? 'Logged in' : 'Registered'} successfully!`);
      navigate('/');
    } catch (error) {
      message.error(mode === 'login' ? 'Invalid credentials' : 'Registration failed');
    }
  };

  const items = [
    {
      key: 'login',
      label: 'Login',
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => onFinish(values, 'login')}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'register',
      label: 'Register',
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => onFinish(values, 'register')}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card>
        <Tabs items={items} />
      </Card>
    </div>
  );
};

export default Login;
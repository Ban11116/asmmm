import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, LogIn, LogOut, Home, Package, ClipboardList, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const { Header, Content } = AntLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const userMenuItems = [
    {
      key: 'home',
      label: 'Trang chủ',
      icon: <Home className="inline-block" size={16} />,
      onClick: () => navigate('/'),
    },
    {
      key: 'products',
      label: 'Sản Phẩm',
      icon: <Package className="inline-block" size={16} />,
      onClick: () => navigate('/products'),
    },
    {
      key: 'cart',
      label: 'Giỏ hàng',
      icon: <ShoppingCart className="inline-block" size={15} />,
      onClick: () => navigate('/cart'),
    },
    {
      key: 'orders',
      label: 'quản lý đơn hàng',
      icon: <ClipboardList className="inline-block" size={16} />,
      onClick: () => navigate('/orders'),
    },
  ];

  const adminMenuItems = [
    {
      key: 'admin-products',
      label: 'Quản lý sản phẩm',
      icon: <Package className="inline-block" size={15} />,
      onClick: () => navigate('/admin/products'),
    },
    
    
  ];

  return (
    <AntLayout className="min-h-screen">
      <Header className="bg-white flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link to={isAdminRoute ? "/admin/products" : "/"} className="text-2xl font-bold text-blue-600 mr-8">
            {isAdminRoute ? "Admin" : "BSP"}
          </Link>
          <Menu 
            mode="horizontal" 
            className="border-none"
            items={isAdminRoute ? adminMenuItems : userMenuItems}
          />
        </div>
        <div>
          {user ? (
            <Menu 
              mode="horizontal" 
              className="border-none"
              items={[
                {
                  key: 'user',
                  label: user.email,
                  icon: <User className="inline-block" size={16} />,
                },
                {
                  key: 'logout',
                  label: 'Đăng Xuất',
                  icon: <LogOut className="inline-block" size={16} />,
                  onClick: () => {
                    logout();
                    navigate(isAdminRoute ? '/admin/login' : '/login');
                  },
                },
              ]}
            />
          ) : (
            <Menu 
              mode="horizontal" 
              className="border-none"
              items={[
                {
                  key: 'login',
                  label: 'Đăng nhập',
                  icon: <LogIn className="inline-block" size={16} />,
                  onClick: () => navigate(isAdminRoute ? '/admin/login' : '/login'),
                },
              ]}
            />
          )}
        </div>
      </Header>
      <Content className="p-8">
        {children}
      </Content>
    </AntLayout>
  );
};

export default Layout;
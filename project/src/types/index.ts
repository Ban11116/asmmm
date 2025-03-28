export interface User {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  userId: number;
}

export interface Order {
  id: number;
  userId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    fullName: string;
    address: string;
    phone: string;
  };
  createdAt: string;
}
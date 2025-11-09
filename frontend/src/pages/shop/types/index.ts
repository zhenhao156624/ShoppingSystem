export interface Product {
  product_id: number;
  category_id: number;
  product_name: string;
  product_img: string;
  price: number;
  stock: number;
  description: string;
  status: number;
}

export interface CartItem {
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
}
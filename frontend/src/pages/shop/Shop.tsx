import { useState, useEffect } from 'react';
import { Button, Spin, Empty } from '@douyinfe/semi-ui';
import { ProductCard, CartModal } from './components';
import type {Product, CartItem} from './types';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartVisible, setCartVisible] = useState(false);

  // 获取商品列表
  useEffect(() => {
    void fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/products');
      const result = await response.json();
      if (result.data) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  // 添加商品到购物车
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product_id === product.product_id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            product_id: product.product_id,
            product_name: product.product_name,
            price: product.price,
            quantity: 1,
          },
        ];
      }
    });
  };

  // 移除购物车商品
  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== productId));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-5">
      {/* 顶部导航栏 */}
      <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 m-0">商品列表</h1>
        <Button
          type="primary"
          onClick={() => setCartVisible(true)}
        >
          购物车 ({cart.length})
        </Button>
      </div>

      {/* 商品展示区域 */}
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spin />
          </div>
        ) : products.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* 购物车模态框 */}
      <CartModal
        visible={cartVisible}
        cart={cart}
        onCancel={() => setCartVisible(false)}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default Shop;
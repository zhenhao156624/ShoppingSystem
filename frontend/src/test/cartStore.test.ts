import { describe, it, expect, beforeEach } from 'vitest'
import {useCartStore} from "../store/cartStore.ts";
import type { Product } from '../pages/shop/types'

// Mock product data
const mockProduct: Product = {
  product_id: 1,
  category_id: 1,
  product_name: 'Test Product',
  product_img: 'test.jpg',
  price: 100,
  stock: 10,
  description: 'Test description',
  status: 1
}

describe('Cart Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useCartStore.setState({ cart: [] })
  })

  it('should add product to cart', () => {
    const store = useCartStore.getState()
    store.addToCart(mockProduct)

    const updatedCart = useCartStore.getState().cart
    expect(updatedCart).toHaveLength(1)
    expect(updatedCart[0]).toEqual({
      product_id: 1,
      product_name: 'Test Product',
      price: 100,
      quantity: 1
    })
  })

  it('should increase quantity when adding same product', () => {
    const store = useCartStore.getState()
    store.addToCart(mockProduct)
    store.addToCart(mockProduct)

    const updatedCart = useCartStore.getState().cart
    expect(updatedCart).toHaveLength(1)
    expect(updatedCart[0]?.quantity).toBe(2)
  })

  it('should remove product from cart', () => {
    const store = useCartStore.getState()
    store.addToCart(mockProduct)
    store.removeFromCart(mockProduct.product_id)

    const updatedCart = useCartStore.getState().cart
    expect(updatedCart).toHaveLength(0)
  })

  it('should update product quantity', () => {
    const store = useCartStore.getState()
    store.addToCart(mockProduct)
    store.updateQuantity(mockProduct.product_id, 5)

    const updatedCart = useCartStore.getState().cart
    expect(updatedCart[0]?.quantity).toBe(5)
  })

  it('should remove product when quantity is 0', () => {
    const store = useCartStore.getState()
    store.addToCart(mockProduct)
    store.updateQuantity(mockProduct.product_id, 0)

    const updatedCart = useCartStore.getState().cart
    expect(updatedCart).toHaveLength(0)
  })

  it('should calculate total price correctly', () => {
    const store = useCartStore.getState()
    store.addToCart(mockProduct)
    store.addToCart({ ...mockProduct, product_id: 2, price: 200 })

    const totalPrice = useCartStore.getState().getTotal()
    expect(totalPrice).toBe(300)
  })

  it('should calculate total items correctly', () => {
    const store = useCartStore.getState()
    store.addToCart(mockProduct)
    store.addToCart({ ...mockProduct, product_id: 2 })
    store.updateQuantity(mockProduct.product_id, 3)

    const updatedCart = useCartStore.getState().cart
    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0)
    expect(totalItems).toBe(4)
  })
})
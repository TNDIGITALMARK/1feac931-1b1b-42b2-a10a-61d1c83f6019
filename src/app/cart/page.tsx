'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      const totalItems = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
      setCartItemCount(totalItems);
    } else {
      // Mock cart items for demonstration
      const mockItems: CartItem[] = [
        {
          id: 'nonstick-signature-set',
          name: 'Signature Stainless Steel Set',
          price: 449,
          quantity: 1,
          image: '/images/products/signature-set-1.jpg'
        },
        {
          id: 'pro-grade-nonstick-pan',
          name: 'Pro-Grade Non-Stick Fry Pan',
          price: 89,
          quantity: 2,
          image: '/images/products/nonstick-pan-1.jpg',
          variant: '10 inch'
        }
      ];
      setCartItems(mockItems);
      setCartItemCount(3);
      localStorage.setItem('cartCount', '3');
    }
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalItems);

    localStorage.setItem('cart', JSON.stringify(updatedItems));
    localStorage.setItem('cartCount', totalItems.toString());
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalItems);

    localStorage.setItem('cart', JSON.stringify(updatedItems));
    localStorage.setItem('cartCount', totalItems.toString());
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header cartItemCount={cartItemCount} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-charcoal mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any cookware to your cart yet.
            </p>
            <Button asChild className="bg-copper hover:bg-copper-dark">
              <Link href="/">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={cartItemCount} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-charcoal mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-warm-gray rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-charcoal mb-1">
                          <Link
                            href={`/product/${item.id}`}
                            className="hover:text-copper transition-colors"
                          >
                            {item.name}
                          </Link>
                        </h3>

                        {item.variant && (
                          <p className="text-gray-600 text-sm mb-2">Size: {item.variant}</p>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {/* Quantity Controls */}
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-copper transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="text-lg font-medium">{item.quantity}</span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-copper transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-bold text-charcoal">
                              {formatPrice(item.price * item.quantity)}
                            </span>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href="/">
                  ← Continue Shopping
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-charcoal mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-charcoal">Total</span>
                      <span className="text-lg font-bold text-charcoal">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-copper-light rounded-lg p-3 mb-6">
                    <p className="text-sm text-copper-dark">
                      Add {formatPrice(99 - subtotal)} more to get free shipping!
                    </p>
                  </div>
                )}

                <Button className="w-full bg-copper hover:bg-copper-dark text-white font-semibold py-3 mb-3">
                  Proceed to Checkout
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Secure checkout powered by industry-leading encryption
                  </p>
                </div>

                {/* Payment Icons */}
                <div className="flex justify-center space-x-2 mt-4 pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">We accept:</div>
                  <div className="flex space-x-1">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">Visa</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">MC</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">Amex</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">PayPal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
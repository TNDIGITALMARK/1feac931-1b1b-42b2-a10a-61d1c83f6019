'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, getProductsByCategory } from '@/data/products';
import { Product, ProductCategory, CATEGORY_LABELS } from '@/types/product';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Load featured products
    const products = getFeaturedProducts();
    setFeaturedProducts(products);

    // Load cart count from localStorage or state management
    const cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    setCartItemCount(cartCount);
  }, []);

  const handleAddToCart = (productId: string) => {
    // Mock add to cart functionality
    const newCount = cartItemCount + 1;
    setCartItemCount(newCount);
    localStorage.setItem('cartCount', newCount.toString());

    // In a real app, this would add to cart state/context
    console.log('Added to cart:', productId);
  };

  const categoryProducts = Object.values(ProductCategory).map(category => ({
    category,
    label: CATEGORY_LABELS[category],
    products: getProductsByCategory(category).slice(0, 3) // Show first 3 products per category
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={cartItemCount} />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular cookware pieces, loved by home cooks and professional chefs alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect cookware for every culinary need, from professional-grade sets to specialty pieces.
            </p>
          </div>

          {categoryProducts.map(({ category, label, products }) => (
            <div key={category} className="mb-16 last:mb-0">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-charcoal">{label}</h3>
                <a
                  href={`/category/${category}`}
                  className="text-copper hover:text-copper-dark font-medium transition-colors"
                >
                  View All →
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter & Footer */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest news about new products, cooking tips, and exclusive offers delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-copper"
              />
              <button className="bg-copper hover:bg-copper-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Products</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/category/cookware-sets" className="hover:text-copper transition-colors">Cookware Sets</a></li>
                  <li><a href="/category/frying-pans" className="hover:text-copper transition-colors">Frying Pans</a></li>
                  <li><a href="/category/dutch-ovens" className="hover:text-copper transition-colors">Dutch Ovens</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/contact" className="hover:text-copper transition-colors">Contact Us</a></li>
                  <li><a href="/shipping" className="hover:text-copper transition-colors">Shipping Info</a></li>
                  <li><a href="/returns" className="hover:text-copper transition-colors">Returns</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/about" className="hover:text-copper transition-colors">About Us</a></li>
                  <li><a href="/careers" className="hover:text-copper transition-colors">Careers</a></li>
                  <li><a href="/press" className="hover:text-copper transition-colors">Press</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/privacy" className="hover:text-copper transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-copper transition-colors">Terms of Service</a></li>
                  <li><a href="/warranty" className="hover:text-copper transition-colors">Warranty</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; 2024 Culinary Craft. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
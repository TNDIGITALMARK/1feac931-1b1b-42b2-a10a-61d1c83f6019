'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/data/products';
import { Product, ProductCategory, CATEGORY_LABELS } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Load category products
    const categoryProducts = getProductsByCategory(categorySlug as ProductCategory);
    setProducts(categoryProducts);
    setFilteredProducts(categoryProducts);

    // Load cart count
    const cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    setCartItemCount(cartCount);
  }, [categorySlug]);

  useEffect(() => {
    // Apply sorting
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    setFilteredProducts(sorted);
  }, [products, sortBy]);

  const handleAddToCart = (productId: string) => {
    const newCount = cartItemCount + 1;
    setCartItemCount(newCount);
    localStorage.setItem('cartCount', newCount.toString());
    console.log('Added to cart:', productId);
  };

  const categoryLabel = CATEGORY_LABELS[categorySlug as ProductCategory] || 'Products';

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={cartItemCount} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-copper">Home</a>
          <span>/</span>
          <span className="text-charcoal">{categoryLabel}</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-charcoal mb-2">
              {categoryLabel}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </div>

          {/* Sort Controls */}
          <div className="mt-4 md:mt-0">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              No products found in this category
            </h2>
            <p className="text-gray-600 mb-8">
              Check back later for new arrivals or explore other categories.
            </p>
            <Button asChild className="bg-copper hover:bg-copper-dark">
              <a href="/">
                Browse All Products
              </a>
            </Button>
          </div>
        )}

        {/* Category Description */}
        {filteredProducts.length > 0 && (
          <div className="mt-16 bg-warm-gray rounded-lg p-8">
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              About {categoryLabel}
            </h2>
            <div className="prose prose-gray max-w-none">
              {categorySlug === 'cookware-sets' && (
                <p className="text-gray-600">
                  Our cookware sets are designed to provide everything you need for a complete kitchen setup.
                  From professional-grade stainless steel to non-stick convenience, each set is carefully curated
                  to deliver exceptional performance and durability. Perfect for home cooks who want restaurant-quality results.
                </p>
              )}
              {categorySlug === 'frying-pans' && (
                <p className="text-gray-600">
                  Discover our collection of premium frying pans featuring advanced non-stick coatings,
                  superior heat distribution, and ergonomic handles. Whether you're searing, sautéing, or
                  making the perfect omelet, our frying pans deliver consistent results every time.
                </p>
              )}
              {categorySlug === 'sauce-pans' && (
                <p className="text-gray-600">
                  Our sauce pans combine functionality with elegant design. Perfect for making sauces,
                  heating milk, or cooking small portions. Each pan features precision-crafted construction
                  for even heat distribution and easy cleanup.
                </p>
              )}
              {categorySlug === 'dutch-ovens' && (
                <p className="text-gray-600">
                  Experience the versatility of our cast iron Dutch ovens. Perfect for braising, roasting,
                  baking, and slow cooking. These heavy-duty pots retain heat exceptionally well and develop
                  better flavor profiles over time, making them essential for serious home cooks.
                </p>
              )}
              {categorySlug === 'accessories' && (
                <p className="text-gray-600">
                  Complete your kitchen setup with our carefully selected accessories. From premium wooden utensils
                  to innovative gadgets, each accessory is chosen for its quality, functionality, and ability to
                  enhance your cooking experience.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
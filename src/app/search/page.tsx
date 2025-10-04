'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { searchProducts } from '@/data/products';
import { Product } from '@/types/product';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (initialQuery) {
      const results = searchProducts(initialQuery);
      setSearchResults(results);
    }

    // Load cart count
    const cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    setCartItemCount(cartCount);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const results = searchProducts(query.trim());
      setSearchResults(results);

      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('q', query.trim());
      window.history.pushState({}, '', url.toString());
    }
  };

  const handleAddToCart = (productId: string) => {
    const newCount = cartItemCount + 1;
    setCartItemCount(newCount);
    localStorage.setItem('cartCount', newCount.toString());
    console.log('Added to cart:', productId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={cartItemCount} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-charcoal mb-6">
            Search Cookware
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for cookware, brands, or materials..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-300 focus:border-copper focus:ring-copper rounded-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-copper hover:bg-copper-dark px-6"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {initialQuery && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-charcoal">
                Search results for "{initialQuery}"
              </h2>
              <span className="text-gray-600">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
              </span>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {searchResults.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : initialQuery ? (
          <div className="text-center py-16">
            <Search className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              No products found
            </h2>
            <p className="text-gray-600 mb-8">
              We couldn't find any products matching "{initialQuery}".
              Try searching with different keywords.
            </p>
            <div className="space-y-4">
              <p className="text-gray-600 font-medium">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['stainless steel', 'non-stick', 'cast iron', 'dutch oven', 'frying pan'].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery(term);
                      const results = searchProducts(term);
                      setSearchResults(results);
                    }}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              Find the Perfect Cookware
            </h2>
            <p className="text-gray-600 mb-8">
              Search our extensive collection of premium pots, pans, and kitchen accessories.
            </p>

            {/* Popular Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { name: 'Cookware Sets', query: 'cookware sets' },
                { name: 'Frying Pans', query: 'frying pan' },
                { name: 'Dutch Ovens', query: 'dutch oven' },
                { name: 'Accessories', query: 'accessories' }
              ].map((category) => (
                <Button
                  key={category.name}
                  variant="outline"
                  className="h-16 flex flex-col items-center justify-center"
                  onClick={() => {
                    setQuery(category.query);
                    const results = searchProducts(category.query);
                    setSearchResults(results);
                  }}
                >
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { ProductCategory, CATEGORY_LABELS } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { label: CATEGORY_LABELS[ProductCategory.COOKWARE_SETS], href: `/category/${ProductCategory.COOKWARE_SETS}` },
    { label: CATEGORY_LABELS[ProductCategory.FRYING_PANS], href: `/category/${ProductCategory.FRYING_PANS}` },
    { label: CATEGORY_LABELS[ProductCategory.SAUCE_PANS], href: `/category/${ProductCategory.SAUCE_PANS}` },
    { label: CATEGORY_LABELS[ProductCategory.DUTCH_OVENS], href: `/category/${ProductCategory.DUTCH_OVENS}` },
    { label: CATEGORY_LABELS[ProductCategory.ACCESSORIES], href: `/category/${ProductCategory.ACCESSORIES}` },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-copper w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">CC</span>
            </div>
            <div className="flex flex-col">
              <span className="text-charcoal font-bold text-lg leading-none">CULINARY</span>
              <span className="text-charcoal font-bold text-lg leading-none">CRAFT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-charcoal hover:text-copper transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Search cookware..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-copper focus:ring-copper"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search */}
            <Button variant="ghost" size="sm" className="md:hidden p-2">
              <Search className="h-5 w-5" />
            </Button>

            {/* Shopping Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative p-2">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 bg-copper text-white text-xs h-5 w-5 flex items-center justify-center rounded-full"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {/* Mobile Search */}
              <div className="md:hidden px-3 py-2">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="text"
                    placeholder="Search cookware..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-copper focus:ring-copper"
                  />
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>
              </div>

              {/* Mobile Navigation Items */}
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-charcoal hover:text-copper hover:bg-warm-gray transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  return (
    <Card className="w-[280px] h-[320px] bg-white hover:shadow-lg transition-shadow duration-300 group">
      <Link href={`/product/${product.id}`}>
        <CardContent className="p-0 h-full flex flex-col">
          {/* Product Image */}
          <div className="relative h-[200px] bg-warm-gray overflow-hidden">
            <Image
              src={product.images[0] || '/images/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="280px"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="bg-green-500 text-white text-xs font-medium">
                  NEW
                </Badge>
              )}
              {product.isSale && (
                <Badge className="bg-red-500 text-white text-xs font-medium">
                  SALE
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-charcoal text-sm leading-tight mb-1 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center justify-between mb-2">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-500">({product.reviewCount})</span>
              </div>
            </div>

            <div className="space-y-2">
              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="font-bold text-charcoal text-lg">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-copper hover:bg-copper-dark text-white font-medium text-sm h-8"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
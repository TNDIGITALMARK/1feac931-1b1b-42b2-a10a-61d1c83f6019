'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Share2, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { getProductById, getProductReviews, getRecommendedProducts } from '@/data/products';
import { Product, Review } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (productId) {
      const productData = getProductById(productId);
      const reviewsData = getProductReviews(productId);
      const recommendedData = getRecommendedProducts(productId);

      setProduct(productData || null);
      setReviews(reviewsData);
      setRecommendedProducts(recommendedData);

      // Load cart count
      const cartCount = parseInt(localStorage.getItem('cartCount') || '0');
      setCartItemCount(cartCount);
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const newCount = cartItemCount + quantity;
      setCartItemCount(newCount);
      localStorage.setItem('cartCount', newCount.toString());
      console.log('Added to cart:', product.id, 'quantity:', quantity);
    }
  };

  const handleRecommendedAddToCart = (productId: string) => {
    const newCount = cartItemCount + 1;
    setCartItemCount(newCount);
    localStorage.setItem('cartCount', newCount.toString());
    console.log('Added to cart:', productId);
  };

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
            className={`h-5 w-5 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header cartItemCount={cartItemCount} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-charcoal">Product not found</h1>
            <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentPrice = selectedVariant
    ? product.variants?.find(v => v.id === selectedVariant)?.price || product.price
    : product.price;

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={cartItemCount} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-copper">Home</a>
          <span>/</span>
          <a href={`/category/${product.category}`} className="hover:text-copper">
            {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </a>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-warm-gray rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImageIndex] || '/images/placeholder-product.jpg'}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-copper' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && (
                  <Badge className="bg-green-500 text-white">NEW</Badge>
                )}
                {product.isSale && (
                  <Badge className="bg-red-500 text-white">SALE</Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-charcoal mb-2">
                {product.name}
              </h1>

              <p className="text-gray-600 text-lg">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              {renderStars(product.rating)}
              <span className="text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-charcoal">
                {formatPrice(currentPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-charcoal">Size:</h3>
                <div className="flex space-x-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2 rounded-lg border font-medium ${
                        selectedVariant === variant.id
                          ? 'border-copper bg-copper-light text-copper-dark'
                          : 'border-gray-300 text-gray-700 hover:border-copper'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <h3 className="font-semibold text-charcoal">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-copper"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:border-copper"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-medium">
                {product.inStock ? `In Stock (${product.stockQuantity} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-copper hover:bg-copper-dark text-white font-semibold py-3"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="px-4">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-4">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <div className="bg-warm-gray rounded-lg p-6">
                <h3 className="text-xl font-bold text-charcoal mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-300 last:border-b-0">
                      <span className="font-medium text-charcoal">{spec.name}:</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div className="bg-warm-gray rounded-lg p-6">
                <h3 className="text-xl font-bold text-charcoal mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-copper mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-warm-gray rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold text-charcoal">{review.userName}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                          )}
                        </div>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="font-medium text-charcoal">{review.title}</span>
                      </div>

                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {recommendedProducts.map((recommendedProduct) => (
                <ProductCard
                  key={recommendedProduct.id}
                  product={recommendedProduct}
                  onAddToCart={handleRecommendedAddToCart}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
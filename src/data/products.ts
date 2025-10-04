import { Product, ProductCategory, Review } from '@/types/product';

export const mockProducts: Product[] = [
  // Non-Stick Cookware Sets
  {
    id: 'nonstick-signature-set',
    name: 'Signature Stainless Steel Set',
    description: 'Professional-grade 10-piece cookware set with tri-ply construction for even heat distribution. Perfect for both home cooks and professional chefs.',
    price: 449,
    originalPrice: 599,
    images: ['/images/products/signature-set-1.jpg', '/images/products/signature-set-2.jpg'],
    category: ProductCategory.COOKWARE_SETS,
    subcategory: 'Professional Sets',
    brand: 'Culinary Craft',
    specifications: [
      { name: 'Material', value: '18/10 Stainless Steel with Aluminum Core' },
      { name: 'Pieces', value: '10 Pieces' },
      { name: 'Oven Safe', value: 'Up to 500°F' },
      { name: 'Dishwasher Safe', value: 'Yes' },
      { name: 'Induction Compatible', value: 'Yes' }
    ],
    features: [
      'Tri-ply construction for superior heat distribution',
      'Stay-cool stainless steel handles',
      'Measurement markings on interior',
      'Compatible with all cooktops including induction'
    ],
    materials: ['Stainless Steel', 'Aluminum'],
    dimensions: {
      weight: '15.2 lbs'
    },
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviewCount: 124,
    tags: ['professional', 'induction-ready', 'dishwasher-safe'],
    isFeatured: true,
    isNew: false,
    isSale: true
  },

  // Frying Pans
  {
    id: 'pro-grade-nonstick-pan',
    name: 'Pro-Grade Non-Stick Fry Pan',
    description: 'Premium ceramic non-stick coating that delivers exceptional release and easy cleanup. Built to withstand daily use while maintaining performance.',
    price: 89,
    images: ['/images/products/nonstick-pan-1.jpg', '/images/products/nonstick-pan-2.jpg'],
    category: ProductCategory.FRYING_PANS,
    subcategory: 'Non-Stick Pans',
    brand: 'Culinary Craft',
    specifications: [
      { name: 'Size', value: '10 inch / 12 inch' },
      { name: 'Material', value: 'Hard-Anodized Aluminum with Ceramic Coating' },
      { name: 'Handle', value: 'Stainless Steel Stay-Cool' },
      { name: 'Oven Safe', value: 'Up to 400°F' },
      { name: 'Dishwasher Safe', value: 'Yes' }
    ],
    features: [
      'PFOA-free ceramic non-stick coating',
      'Even heat distribution',
      'Scratch-resistant surface',
      'Ergonomic stainless steel handle'
    ],
    materials: ['Aluminum', 'Ceramic', 'Stainless Steel'],
    dimensions: {
      diameter: '10" / 12"',
      height: '2.5"',
      weight: '2.1 lbs'
    },
    inStock: true,
    stockQuantity: 45,
    rating: 4.6,
    reviewCount: 89,
    variants: [
      {
        id: 'pro-grade-10inch',
        name: '10 inch',
        price: 89,
        images: ['/images/products/nonstick-pan-10-1.jpg'],
        attributes: { size: '10 inch' },
        inStock: true,
        stockQuantity: 25
      },
      {
        id: 'pro-grade-12inch',
        name: '12 inch',
        price: 99,
        images: ['/images/products/nonstick-pan-12-1.jpg'],
        attributes: { size: '12 inch' },
        inStock: true,
        stockQuantity: 20
      }
    ],
    tags: ['non-stick', 'ceramic', 'pfoa-free'],
    isFeatured: true,
    isNew: false,
    isSale: false
  },

  // Sauce Pans
  {
    id: 'pro-nonstick-sauce-pan',
    name: 'Pro Non-Stick Sauce Pan',
    description: 'Versatile sauce pan with premium non-stick coating. Perfect for sauces, soups, and small batch cooking with easy cleanup.',
    price: 69,
    images: ['/images/products/sauce-pan-1.jpg', '/images/products/sauce-pan-2.jpg'],
    category: ProductCategory.SAUCE_PANS,
    subcategory: 'Non-Stick Sauce Pans',
    brand: 'Culinary Craft',
    specifications: [
      { name: 'Capacity', value: '2 Qt / 3 Qt' },
      { name: 'Material', value: 'Hard-Anodized Aluminum' },
      { name: 'Coating', value: 'Triple-Layer Non-Stick' },
      { name: 'Handle', value: 'Stainless Steel' },
      { name: 'Lid', value: 'Tempered Glass with Steam Vent' }
    ],
    features: [
      'Triple-layer non-stick interior',
      'Pour spouts on both sides',
      'Measurement markings',
      'Tempered glass lid with steam vent'
    ],
    materials: ['Aluminum', 'Stainless Steel', 'Glass'],
    dimensions: {
      capacity: '2 Qt / 3 Qt',
      height: '4.5"',
      weight: '1.8 lbs'
    },
    inStock: true,
    stockQuantity: 32,
    rating: 4.5,
    reviewCount: 67,
    tags: ['sauce-pan', 'non-stick', 'glass-lid'],
    isFeatured: false,
    isNew: true,
    isSale: false
  },

  // Cast Iron Dutch Ovens
  {
    id: 'cast-iron-dutch-oven',
    name: 'Cast Iron Dutch Oven',
    description: 'Traditional enameled cast iron Dutch oven that retains and distributes heat evenly. Perfect for braising, roasting, and slow cooking.',
    price: 199,
    originalPrice: 249,
    images: ['/images/products/dutch-oven-1.jpg', '/images/products/dutch-oven-2.jpg'],
    category: ProductCategory.DUTCH_OVENS,
    subcategory: 'Cast Iron Dutch Ovens',
    brand: 'Culinary Craft',
    specifications: [
      { name: 'Capacity', value: '5.5 Quart' },
      { name: 'Material', value: 'Enameled Cast Iron' },
      { name: 'Oven Safe', value: 'Up to 500°F' },
      { name: 'Cooktop', value: 'All Types Including Induction' },
      { name: 'Dishwasher Safe', value: 'Hand Wash Recommended' }
    ],
    features: [
      'Superior heat retention and distribution',
      'Chip-resistant enamel coating',
      'Self-basting condensation ridges on lid',
      'Oversized handles for easy lifting'
    ],
    materials: ['Cast Iron', 'Enamel'],
    dimensions: {
      capacity: '5.5 Qt',
      diameter: '10.25"',
      height: '4.5"',
      weight: '11.5 lbs'
    },
    inStock: true,
    stockQuantity: 18,
    rating: 4.9,
    reviewCount: 156,
    tags: ['cast-iron', 'dutch-oven', 'enameled'],
    isFeatured: true,
    isNew: false,
    isSale: true
  },

  // Specialty Pans
  {
    id: 'copper-core-frying-pan',
    name: 'Copper Core Frying Pan',
    description: 'Professional copper core construction provides unmatched heat conductivity and temperature control for precision cooking.',
    price: 159,
    images: ['/images/products/copper-pan-1.jpg', '/images/products/copper-pan-2.jpg'],
    category: ProductCategory.FRYING_PANS,
    subcategory: 'Professional Frying Pans',
    brand: 'Culinary Craft',
    specifications: [
      { name: 'Size', value: '10 inch' },
      { name: 'Construction', value: '5-Ply with Copper Core' },
      { name: 'Exterior', value: 'Brushed Stainless Steel' },
      { name: 'Handle', value: 'Cast Stainless Steel' },
      { name: 'Oven Safe', value: 'Up to 600°F' }
    ],
    features: [
      'Copper core for superior heat conductivity',
      '5-ply construction for even heating',
      'Professional-grade stainless steel',
      'Riveted cast handles'
    ],
    materials: ['Stainless Steel', 'Copper', 'Aluminum'],
    dimensions: {
      diameter: '10"',
      height: '2"',
      weight: '3.2 lbs'
    },
    inStock: true,
    stockQuantity: 12,
    rating: 4.7,
    reviewCount: 43,
    tags: ['copper-core', 'professional', '5-ply'],
    isFeatured: false,
    isNew: true,
    isSale: false
  },

  // Accessories
  {
    id: 'wooden-utensil-set',
    name: 'Professional Wooden Utensil Set',
    description: 'Handcrafted wooden utensils made from sustainable bamboo. Safe for all cookware surfaces including non-stick.',
    price: 29,
    images: ['/images/products/wooden-utensils-1.jpg', '/images/products/wooden-utensils-2.jpg'],
    category: ProductCategory.ACCESSORIES,
    subcategory: 'Utensils',
    brand: 'Culinary Craft',
    specifications: [
      { name: 'Material', value: 'Sustainable Bamboo' },
      { name: 'Pieces', value: '6 Pieces' },
      { name: 'Care', value: 'Hand Wash Only' },
      { name: 'Length', value: '10" - 12"' },
      { name: 'Finish', value: 'Food-Safe Natural Oil' }
    ],
    features: [
      'Eco-friendly bamboo construction',
      'Gentle on all cookware surfaces',
      'Ergonomic handles',
      'Natural antimicrobial properties'
    ],
    materials: ['Bamboo'],
    dimensions: {
      height: '10" - 12"',
      weight: '0.8 lbs'
    },
    inStock: true,
    stockQuantity: 67,
    rating: 4.4,
    reviewCount: 91,
    tags: ['bamboo', 'eco-friendly', 'utensils'],
    isFeatured: false,
    isNew: false,
    isSale: false
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    productId: 'nonstick-signature-set',
    userId: 'user-1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Excellent quality and performance',
    comment: 'I have been using this set for 6 months now and it still looks and performs like new. The heat distribution is excellent and cleanup is a breeze.',
    date: '2024-09-15',
    verified: true
  },
  {
    id: 'review-2',
    productId: 'pro-grade-nonstick-pan',
    userId: 'user-2',
    userName: 'Mike R.',
    rating: 4,
    title: 'Great pan, worth the investment',
    comment: 'The non-stick coating works really well and the pan heats evenly. Only downside is that it is hand wash only but that is expected for quality cookware.',
    date: '2024-09-10',
    verified: true
  },
  {
    id: 'review-3',
    productId: 'cast-iron-dutch-oven',
    userId: 'user-3',
    userName: 'Jennifer L.',
    rating: 5,
    title: 'Perfect for braising and roasts',
    comment: 'This Dutch oven has become my go-to for Sunday roasts and braised dishes. The heat retention is amazing and it goes from stovetop to oven seamlessly.',
    date: '2024-08-28',
    verified: true
  }
];

// Mock functions for the application
export const getProducts = (): Product[] => {
  return mockProducts;
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.isFeatured);
};

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getProductReviews = (productId: string): Review[] => {
  return mockReviews.filter(review => review.productId === productId);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getRecommendedProducts = (productId: string): Product[] => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];

  // Return products from the same category, excluding the current product
  return mockProducts
    .filter(product => product.id !== productId && product.category === currentProduct.category)
    .slice(0, 4);
};
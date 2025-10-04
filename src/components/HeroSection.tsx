import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="bg-warm-gray py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-charcoal leading-tight">
                MASTER YOUR KITCHEN:
                <br />
                <span className="text-copper">PREMIUM COOKWARE</span>
                <br />
                FOR THE MODERN CHEF
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Discover our collection of professional-grade cookware designed to elevate your culinary experience. From non-stick skillets to cast iron Dutch ovens, every piece is crafted for perfection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-copper hover:bg-copper-dark text-white font-semibold px-8 py-3"
              >
                <Link href="/category/cookware-sets">
                  Shop Now
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-charcoal text-charcoal hover:bg-charcoal hover:text-white font-semibold px-8 py-3"
              >
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-300">
              <div className="space-y-1">
                <h3 className="font-semibold text-charcoal">Premium Materials</h3>
                <p className="text-sm text-gray-600">Stainless steel, cast iron, and non-stick coatings</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-charcoal">Professional Grade</h3>
                <p className="text-sm text-gray-600">Restaurant-quality performance for home kitchens</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-charcoal">Lifetime Warranty</h3>
                <p className="text-sm text-gray-600">Built to last with comprehensive coverage</p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-charcoal">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $99 nationwide</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative h-[500px] lg:h-[600px] w-full">
              <Image
                src="/images/hero-cookware-set.jpg"
                alt="Premium cookware set with pots and pans arranged on a clean white background"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute top-8 right-8 bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-copper">4.9</div>
                <div className="text-xs text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
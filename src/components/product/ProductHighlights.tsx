import { CheckCircle2, Star, Award, Users } from 'lucide-react';
import type { Product } from '@/types/product';

interface ProductHighlightsProps {
  product: Product;
}

export default function ProductHighlights({ product }: ProductHighlightsProps) {
  // Mock highlights based on category
  const getHighlights = () => {
    const category = product.category.toLowerCase();
    
    if (category.includes('electronics')) {
      return [
        { icon: CheckCircle2, text: 'Latest Technology' },
        { icon: Star, text: 'Premium Quality' },
        { icon: Award, text: 'Certified Product' },
        { icon: Users, text: 'Trusted by 10K+ Users' },
      ];
    } else if (category.includes('clothes') || category.includes('shoes')) {
      return [
        { icon: CheckCircle2, text: 'Premium Material' },
        { icon: Star, text: 'Trending Design' },
        { icon: Award, text: 'Quality Assured' },
        { icon: Users, text: 'Loved by Customers' },
      ];
    } else if (category.includes('furniture')) {
      return [
        { icon: CheckCircle2, text: 'Durable Build' },
        { icon: Star, text: 'Modern Design' },
        { icon: Award, text: 'Eco-Friendly' },
        { icon: Users, text: '5-Star Rated' },
      ];
    }
    
    return [
      { icon: CheckCircle2, text: 'Premium Quality' },
      { icon: Star, text: 'Best Seller' },
      { icon: Award, text: 'Certified Product' },
      { icon: Users, text: 'Highly Rated' },
    ];
  };

  const highlights = getHighlights();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose This Product?</h3>
      <div className="space-y-4">
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-700">{highlight.text}</span>
            </div>
          );
        })}
      </div>
      
      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Return Policy</span>
            <span className="font-medium text-gray-900">7 Days Return</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Warranty</span>
            <span className="font-medium text-gray-900">1 Year</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Delivery</span>
            <span className="font-medium text-gray-900">Free Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
}


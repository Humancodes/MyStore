'use client';

import { useState } from 'react';
import { Star, Zap, CheckCircle2, Truck, Shield } from 'lucide-react';
import type { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import AddToCartButton from '@/components/cart/AddToCartButton';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<'buy' | 'exchange'>('buy');

  // Calculate discount (mock - 20% off)
  const originalPrice = product.price * 1.2;
  const discount = ((originalPrice - product.price) / originalPrice) * 100;

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    // For now, just add to cart and redirect to checkout
    console.log('Buy now:', product.id, quantity);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  return (
    <div className="space-y-5">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {product.title}
        </h1>
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded">
            <span className="text-lg font-semibold">{product.rating.rate.toFixed(1)}</span>
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
          <span className="text-sm text-gray-600">
            ({product.rating.count.toLocaleString()} Ratings & Reviews)
          </span>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">MyStore Assured</span>
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl md:text-4xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xl text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-lg font-semibold text-green-600">
            {discount.toFixed(0)}% off
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Secure delivery by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Offers */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Available Offers</h3>
        <ul className="space-y-2.5 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-gray-700">
              <strong>Special Price:</strong> Get extra ${(originalPrice - product.price).toFixed(2)} off
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-gray-700">
              <strong>Bank Offer:</strong> 5% cashback on credit/debit cards up to $50
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">•</span>
            <span className="text-gray-700">
              <strong>No Cost EMI:</strong> Available on orders above $100
            </span>
          </li>
        </ul>
        <button className="mt-2 text-sm text-primary hover:underline cursor-pointer font-medium">
          View 2 more offers
        </button>
      </div>

      {/* Purchase Options */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary transition-colors">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="radio"
              name="purchaseOption"
              value="buy"
              checked={selectedOption === 'buy'}
              onChange={() => setSelectedOption('buy')}
              className="w-4 h-4 text-primary cursor-pointer"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900 block">
                Buy without Exchange
              </span>
              <span className="text-xs text-gray-500">${product.price.toFixed(2)}</span>
            </div>
          </label>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-primary transition-colors">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="radio"
              name="purchaseOption"
              value="exchange"
              checked={selectedOption === 'exchange'}
              onChange={() => setSelectedOption('exchange')}
              className="w-4 h-4 text-primary cursor-pointer"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900 block">
                Buy with Exchange
              </span>
              <span className="text-xs text-green-600 font-medium">
                Save up to ${(product.price * 0.3).toFixed(2)}
              </span>
            </div>
          </label>
        </div>
        {selectedOption === 'exchange' && (
          <p className="text-xs text-gray-600 ml-6">
            Enter pincode to check if exchange is available
          </p>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-900">Quantity:</span>
        <div className="flex items-center gap-2 border border-gray-300 rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none cursor-pointer"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none cursor-pointer"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
          >
            +
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <AddToCartButton
          product={product}
          quantity={quantity}
          size="lg"
          className="flex-1 bg-primary text-white hover:bg-primary/90 text-base font-semibold h-14"
        />
        <Button
          size="lg"
          className="flex-1 bg-primary text-white hover:bg-primary/90 cursor-pointer text-base font-semibold h-14"
          onClick={handleBuyNow}
        >
          <Zap className="mr-2 h-5 w-5" />
          BUY NOW
        </Button>
      </div>

      {/* Delivery & Warranty Info */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Free Delivery</p>
            <p className="text-xs text-gray-600">Order above $50 for free delivery</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Warranty</p>
            <p className="text-xs text-gray-600">1 Year Manufacturer Warranty</p>
          </div>
        </div>
      </div>
    </div>
  );
}



'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Category } from '@/types/product';
import { fetchCategories } from '@/services/fakeStoreApi';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state from URL params
  const [title, setTitle] = useState(searchParams.get('title') || '');
  const [priceMin, setPriceMin] = useState(searchParams.get('price_min') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('price_max') || '');
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('categoryId') || searchParams.get('categorySlug') || ''
  );

  useEffect(() => {
    // Load categories
    fetchCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (title) params.set('title', title);
    if (priceMin) params.set('price_min', priceMin);
    if (priceMax) params.set('price_max', priceMax);
    if (selectedCategory) {
      // Check if it's a number (categoryId) or string (categorySlug)
      const categoryId = parseInt(selectedCategory);
      if (!isNaN(categoryId)) {
        params.set('categoryId', selectedCategory);
      } else {
        params.set('categorySlug', selectedCategory);
      }
    }

    router.push(`/products?${params.toString()}`);
    onClose();
  };

  const clearFilters = () => {
    setTitle('');
    setPriceMin('');
    setPriceMax('');
    setSelectedCategory('');
    router.push('/products');
    onClose();
  };

  const hasActiveFilters = title || priceMin || priceMax || selectedCategory;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-full w-80 bg-white border-r border-gray-200 z-50 lg:z-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } overflow-y-auto`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search/Title Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Search Products
            </label>
            <Input
              type="text"
              placeholder="Search by title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Price Range
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  min="0"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Category
            </label>
            {loading ? (
              <div className="text-sm text-gray-500">Loading categories...</div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <label className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-4 h-4 text-primary"
                  />
                  <span className="text-sm text-gray-700">All Categories</span>
                </label>
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.slug}
                      checked={selectedCategory === category.slug}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sticky bottom-0 bg-white pt-4 border-t">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex-1"
              disabled={!hasActiveFilters}
            >
              Clear All
            </Button>
            <Button onClick={applyFilters} className="flex-1 bg-primary text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}


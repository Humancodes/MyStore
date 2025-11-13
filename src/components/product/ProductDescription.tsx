import type { Product } from '@/types/product';

interface ProductDescriptionProps {
  product: Product;
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  // Mock specifications (in real app, this would come from product data)
  const specifications = [
    { label: 'Category', value: product.category },
    { label: 'Brand', value: 'MyStore' },
    { label: 'Model', value: product.title.split(' ')[0] },
    { label: 'Warranty', value: '1 Year Manufacturer Warranty' },
    { label: 'Covered in Warranty', value: 'Manufacturing Defects Only' },
    { label: 'Domestic Warranty', value: '1 Year' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-8">
      {/* Product Description */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            This premium product offers exceptional quality and value. Designed with attention to detail,
            it combines style and functionality to meet your everyday needs. Whether you're looking for
            reliability, performance, or style, this product delivers on all fronts.
          </p>
        </div>
      </section>

      {/* Specifications */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-sm font-medium text-gray-600 min-w-[150px]">
                {spec.label}:
              </span>
              <span className="text-sm text-gray-900 capitalize">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}



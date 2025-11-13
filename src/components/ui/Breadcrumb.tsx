import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            {index === 0 && (
              <Link
                href={item.href}
                className="flex items-center gap-1 hover:text-primary cursor-pointer transition-colors"
              >
                <Home className="h-4 w-4" />
              </Link>
            )}
            {!isLast ? (
              <>
                <Link
                  href={item.href}
                  className="hover:text-primary cursor-pointer transition-colors line-clamp-1 max-w-[200px]"
                >
                  {item.label}
                </Link>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </>
            ) : (
              <span className="text-gray-900 font-medium line-clamp-1 max-w-[300px]">
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}



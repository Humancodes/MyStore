'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Clock, X, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { highlightText } from '@/utils/highlightText';
import { getSearchHistory, removeFromSearchHistory, clearSearchHistory } from '@/utils/searchHistory';
import type { Product } from '@/types/product';
import { useSearchSuggestions } from '@/hooks/useSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { useState, useEffect, useRef } from 'react';

interface SearchAutocompleteProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (query: string) => void;
}

export default function SearchAutocomplete({
  query,
  isOpen,
  onClose,
  onSelect,
}: SearchAutocompleteProps) {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useState(getSearchHistory());
  const debouncedQuery = useDebounce(query, 300);
  const { data: suggestions, isLoading } = useSearchSuggestions(debouncedQuery, 5);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleHistoryClick = (historyQuery: string) => {
    onSelect(historyQuery);
    router.push(`/search?q=${encodeURIComponent(historyQuery)}`);
    onClose();
  };

  const handleSuggestionClick = (product: Product) => {
    router.push(`/products/${product.id}`);
    onClose();
  };

  const handleRemoveHistory = (e: React.MouseEvent, historyQuery: string) => {
    e.stopPropagation();
    removeFromSearchHistory(historyQuery);
    setSearchHistory(getSearchHistory());
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  if (!isOpen) return null;

  const showSuggestions = debouncedQuery.trim().length > 0;
  const showHistory = searchHistory.length > 0 && !showSuggestions;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto"
    >
      {showSuggestions && (
        <div className="p-2">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Searching...
            </div>
          ) : suggestions && suggestions.length > 0 ? (
            <>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                Suggestions
              </div>
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSuggestionClick(product)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-left"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <SearchIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {highlightText(product.title, debouncedQuery)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No products found
            </div>
          )}
        </div>
      )}

      {showHistory && (
        <div className="p-2">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="text-xs font-semibold text-gray-500 uppercase">
              Recent Searches
            </div>
            {searchHistory.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearHistory}
                className="h-6 px-2 text-xs text-gray-500 hover:text-gray-700"
              >
                Clear
              </Button>
            )}
          </div>
          {searchHistory.map((item) => (
            <button
              key={item.timestamp}
              onClick={() => handleHistoryClick(item.query)}
              className="w-full flex items-center justify-between gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-left group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {item.query}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => handleRemoveHistory(e, item.query)}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </Button>
            </button>
          ))}
        </div>
      )}

      {!showSuggestions && !showHistory && (
        <div className="p-4 text-center text-sm text-gray-500">
          Start typing to search...
        </div>
      )}
    </div>
  );
}


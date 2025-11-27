'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchAutocomplete from './SearchAutocomplete';
import { addToSearchHistory } from '@/utils/searchHistory';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  initialValue?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  className = '',
  placeholder = 'Search for Products, Brands and More',
  initialValue = '',
  onSearch,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update query when initialValue changes (e.g., from URL params)
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    
    if (trimmedQuery) {
      // Add to search history
      addToSearchHistory(trimmedQuery);
      
      // Navigate to search page
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      
      // Call optional callback
      onSearch?.(trimmedQuery);
      
      // Close autocomplete
      setIsAutocompleteOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Open autocomplete when user types
    if (value.trim().length > 0) {
      setIsAutocompleteOpen(true);
    } else {
      setIsAutocompleteOpen(false);
    }
  };

  const handleInputFocus = () => {
    if (query.trim().length > 0) {
      setIsAutocompleteOpen(true);
    }
  };

  const handleSelect = (selectedQuery: string) => {
    setQuery(selectedQuery);
    addToSearchHistory(selectedQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex-1 max-w-2xl ${className}`}
    >
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="h-10 w-full rounded-l-md border-r-0 pr-10"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-0 h-10 rounded-l-none rounded-r-md"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      
      <SearchAutocomplete
        query={query}
        isOpen={isAutocompleteOpen}
        onClose={() => setIsAutocompleteOpen(false)}
        onSelect={handleSelect}
      />
    </form>
  );
}


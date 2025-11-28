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

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    
    if (trimmedQuery) {
      addToSearchHistory(trimmedQuery);
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      onSearch?.(trimmedQuery);
      setIsAutocompleteOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
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
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="h-10 w-full rounded-l-md rounded-r-none border-2 border-primary focus-visible:border-primary focus-visible:ring-0 pr-10"
        />
        <Button
          type="submit"
          size="icon"
          className="h-10 w-12 rounded-l-none rounded-r-md bg-primary hover:bg-primary/90 text-white border-2 border-l-0 border-primary shrink-0"
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


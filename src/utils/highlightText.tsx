import React from 'react';

export function highlightText(
  text: string,
  searchQuery: string,
  className: string = 'bg-yellow-200 dark:bg-yellow-900 font-semibold'
): React.ReactElement {
  if (!searchQuery.trim() || !text) {
    return <>{text}</>;
  }

  const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (part.toLowerCase() === searchQuery.toLowerCase()) {
          return (
            <span key={index} className={className}>
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}


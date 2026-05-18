import { createContext, useState, useContext, ReactNode } from 'react';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

type SearchProviderProps = {
  children: ReactNode;
};

export function SearchProvider(props: SearchProviderProps) {
  const children = props.children;
  const [searchQuery, setSearchQuery] = useState('');

  const contextValue: SearchContextType = {
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

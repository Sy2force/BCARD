import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Rechercher des cartes...',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.div
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
            isFocused ? 'text-neon-blue' : 'text-white/60'
          }`}
          animate={{ scale: isFocused ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <Search className="w-5 h-5" />
        </motion.div>

        <motion.input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-4 glass rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300 ${
            isFocused ? 'bg-white/20 shadow-lg shadow-neon-blue/20' : 'bg-white/10'
          }`}
          whileFocus={{ scale: 1.02 }}
        />

        {query && (
          <motion.button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors duration-300 group"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </div>

      {/* Search suggestions or results count could go here */}
      {query && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-2 p-3 glass rounded-xl backdrop-blur-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm text-white/80">
            Recherche pour: <span className="text-neon-blue font-medium">"{query}"</span>
          </p>
        </motion.div>
      )}

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent"
        animate={{
          borderColor: isFocused
            ? ['rgba(0, 212, 255, 0.5)', 'rgba(168, 85, 247, 0.5)', 'rgba(0, 212, 255, 0.5)']
            : 'rgba(255, 255, 255, 0.1)',
        }}
        transition={{
          duration: isFocused ? 2 : 0.3,
          repeat: isFocused ? Infinity : 0,
        }}
      />
    </motion.div>
  );
};

export default SearchBar;

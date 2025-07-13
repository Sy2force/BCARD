import React, { createContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (cardId: string) => void;
  removeFromFavorites: (cardId: string) => void;
  isFavorite: (cardId: string) => boolean;
  toggleFavorite: (cardId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (cardId: string) => {
    setFavorites(prev => [...prev, cardId]);
  };

  const removeFromFavorites = (cardId: string) => {
    setFavorites(prev => prev.filter(id => id !== cardId));
  };

  const isFavorite = (cardId: string) => {
    return favorites.includes(cardId);
  };

  const toggleFavorite = (cardId: string) => {
    if (isFavorite(cardId)) {
      removeFromFavorites(cardId);
    } else {
      addToFavorites(cardId);
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      toggleFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext };

import { createContext, ReactNode, useState } from "react";

interface FavoritesContextType {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  ids: [],
  addFavorite: (id: string) => {},
  removeFavorite: (id: string) => {},
});

interface ProviderProps {
  children: ReactNode;
}

function FavoritesContextProvider({ children }: ProviderProps) {
  const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

  function addFavorite(id: string) {
    setFavoriteMealIds((prevList) => [...prevList, id]);
  }

  function removeFavorite(id: string) {
    setFavoriteMealIds((prevList) =>
      prevList.filter((mealId) => mealId !== id),
    );
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

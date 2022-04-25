import React, { useContext, createContext } from "react";
import { useBoolean } from "@chakra-ui/react";

const BurgerContext = createContext(null);

export const BurgerMenuProvider: React.FC = ({ children }) => {
  const [burgerIsOpen, setBurgerIsOpen] = useBoolean();

  return (
    <BurgerContext.Provider value={{ burgerIsOpen, setBurgerIsOpen }}>
      {children}
    </BurgerContext.Provider>
  );
};

export const useBurgerMenu = () => useContext(BurgerContext);

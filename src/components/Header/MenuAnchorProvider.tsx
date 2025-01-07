import { createContext, ReactNode, useContext, useState } from "react";

export type MenuAnchorType = {
  menuAnchorEl: null | HTMLElement;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
};

const MenuAnchorContext = createContext<MenuAnchorType | null>(null);

const MenuAnchorProvider = ({ children }: { children: ReactNode }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <MenuAnchorContext.Provider
      value={{ menuAnchorEl, handleMenuOpen, handleMenuClose }}
    >
      {children}
    </MenuAnchorContext.Provider>
  );
};

export default MenuAnchorProvider;

export const MenuAnchorErrorMessage =
  "Wrap components with <MenuAnchorProvider />";

export const useMenuAnchor = () => {
  const ctx = useContext(MenuAnchorContext);
  if (!ctx) throw Error(MenuAnchorErrorMessage);

  return ctx;
};

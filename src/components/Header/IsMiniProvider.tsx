import { createContext, useContext, useState } from "react";

export type IsMiniType = {
  isMini: boolean;
  setIsMini: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

const IsMiniContext = createContext<IsMiniType | null>(null);

export const isMiniErrorMessage = "Wrap components with <IsMiniProvider />";

const IsMiniProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMini, setIsMini] = useState(true);

  return (
    <IsMiniContext.Provider value={{ isMini, setIsMini }}>
      {children}
    </IsMiniContext.Provider>
  );
};

export default IsMiniProvider;

export const useIsMini = () => {
  const ctx = useContext(IsMiniContext);
  if (!ctx) throw Error(isMiniErrorMessage);

  return ctx;
};

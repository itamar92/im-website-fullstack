import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

import { IMusic } from "../interface/IMusic";

type MusicContextType = {
  music: IMusic | any;
  setMusic: Dispatch<SetStateAction<IMusic[]>>;
  
};

const IMusicContextState = {
  music: undefined,
  setMusic: useState,
  
};

interface MusicContextProps {
  children: ReactNode;
}

export const ProductsContext =
  createContext<MusicContextType>(IMusicContextState);

export function useMusicProvider() {
  return useContext(ProductsContext);
}

export const ProductsProvider = ({ children }: MusicContextProps) => {
  const [music, setMusic] = useState<IMusic[]>([]);

  

  return (
    <ProductsContext.Provider value={{ music, setMusic }}>
      {children}
    </ProductsContext.Provider>
  );
};

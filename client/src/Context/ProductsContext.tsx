import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import productsService from "Services/products.service";
import { IMusic } from "../interface/IMusic";
import { IMusicUpdate } from "../interface/IMusicUpdate";
import EditProduct from "../Pages/Products/EditProduct";
import { Dialog } from "@mui/material";

type MusicContextType = {
  music: IMusic | any;
  setMusic: Dispatch<SetStateAction<IMusic[]>>;
  isEditCardOpen: boolean;
  setEditCardOpen: Dispatch<SetStateAction<boolean>>;
  updateProduct: IMusicUpdate | any;
  setUpdatedProduct: (updateProduct: IMusicUpdate) => void;
  setProductId: Dispatch<SetStateAction<number | undefined>>;
  updateMusic: (music: IMusicUpdate) => void;
  deleteMusic: (id: number) => void;
};

interface MusicContextProps {
  children: ReactNode;
}

export const ProductsContext = createContext<MusicContextType>(
  {} as MusicContextType
);

export function useMusicProvider() {
  return useContext(ProductsContext);
}

export const ProductsProvider = ({ children }: MusicContextProps) => {
  const [music, setMusic] = useState<IMusic[]>([]);
  const [isEditCardOpen, setEditCardOpen] = useState(false);
  const [updateProduct, setUpdatedProduct] = useState({});
  const [chosenEditProductId, setProductId] = useState<number | undefined>();

  const getMusic = async () => {
    try {
      const response = await productsService.getAll();
      setMusic(response.data);
    } catch (err: any) {
      if (!err?.response) {
        console.log("No Server Response");
      } else if (err.response?.status === 400) {
        console.log("Unauthorized");
      } else {
        console.log("Get Products Failed");
      }
    }
  };

  useEffect(() => {
    getMusic();
  }, []);

  const updateMusic = async (updateProduct: IMusicUpdate) => {
    try {
      await productsService.update(updateProduct);
      console.log("updated music");
      getMusic();
    } catch (err: any) {
      console.log(updateProduct);
      if (!err?.request) {
        console.log("No server response");
      } else {
        console.log("Update music Failed");
      }
    }
  };

  const deleteMusic = async (id: number) => {
    try {
      const request = await productsService.delete(id);
      console.log("file deleted");
      console.log(request);
      getMusic();
    } catch (err: any) {
      console.log(id);
      if (!err?.request) {
        console.log("No server response");
      } else {
        console.log("Delete music Failed");
      }
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        music,
        setMusic,
        updateProduct,
        setUpdatedProduct,
        isEditCardOpen,
        setEditCardOpen,
        setProductId,
        updateMusic,
        deleteMusic,
      }}
    >
      {children}
      <Dialog open={isEditCardOpen}>
        <EditProduct isOpen={isEditCardOpen} id={chosenEditProductId} />
      </Dialog>
    </ProductsContext.Provider>
  );
};

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import axios from "axios";
import "../interceptors/axios";
import { IMusic } from "../interface/IMusic";
import { IMusicUpdate } from "../interface/IMusicUpdate";
import EditProduct from "../Pages/Products/EditProduct";

type MusicContextType = {
  music: IMusic | any;
  setMusic: Dispatch<SetStateAction<IMusic[]>>;
  isEditCardOpen: boolean;
  setEditCardOpen: Dispatch<SetStateAction<boolean>>;
  updateProduct: IMusicUpdate | any;
  setUpdatedProduct: (updateProduct: IMusicUpdate) => void;
  setProductId: Dispatch<SetStateAction<number | undefined>>;
  updateMusic: (music: IMusic) => void;
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
      const response = await axios.get<IMusic[]>("music");
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

  const updateMusic = async (updateProduct: IMusic) => {
    try {
      const response = await axios.put("music", updateProduct);
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
      const request = await axios.delete(`music/delete-music/${id}`);
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

  const addMusic = async () => {
    try {
      const response = await axios.post("music/add-music")
      
    } catch (err:any) {
      
    }
  }

  useEffect(() => {}, []);

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
      <EditProduct isOpen={isEditCardOpen} id={chosenEditProductId} />
    </ProductsContext.Provider>
  );
};

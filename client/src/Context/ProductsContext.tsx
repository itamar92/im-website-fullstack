import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { IProduct } from "../interface/IProduct";
import DropbboxData from "../clientApi/DropbboxData";
import axios from "axios";

type ProductsProviderProps = {
  children: ReactNode;
};

const ProductsContext = createContext({});

export function useProducts() {
  return useContext(ProductsContext);
}

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProduct] = useState<IProduct[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.post<any>(
        "https://api.dropboxapi.com/2/files/list_folder",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer sl.BWk_7VZyiLn2stmLcL3DIqCMmkvg1bZtqt1TGRoy12MykG0caif0gGdjEPn6TdM57loEG_kNYsmhyLgVINz_8OmCBcyPJABqo7aX4-NyWojlAJtoLKngwyaN7S7a-v9WimMsexzu",
          },
          data: '{"path":"/im-music"}',
        }
      );
      console.log(response?.data);
      setProduct(response.data);
    } catch (err: any) {
      if (!err?.response) {
        console.log("No Server Response");
      } else {
        console.log("no resoponse");
      }
    }
  };

  const dpx = async () => {
    DropbboxData.filesListFolder({
      path:''
    }).then(res => console.log(res))
  }

  useEffect(() => {
    dpx();

  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProduct, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

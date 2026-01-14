import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://backend-ideas-8pfw.onrender.com/api/v1/books"
      );

      const data = await response.json();
      setBooks(data.data);
      //   console.log("data-1", data.data);
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ books }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};

import React, { createContext } from 'react';
import { useProducts, updateProduct, deleteProduct } from '../hooks';

const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const products = useProducts();

  return (
    <ProductContext.Provider  
      value={{
        products,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext };

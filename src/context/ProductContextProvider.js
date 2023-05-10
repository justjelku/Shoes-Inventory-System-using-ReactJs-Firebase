import React, { createContext, useState } from 'react';
import { useProducts, updateProduct, deleteProduct } from '../hooks';

const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const products = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(undefined)

  return (
    <ProductContext.Provider  
      value={{
        products,
        updateProduct,
        deleteProduct,
        selectedProduct,
        setSelectedProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext};

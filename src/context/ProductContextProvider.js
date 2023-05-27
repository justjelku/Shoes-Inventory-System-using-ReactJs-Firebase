import React, { createContext, useState } from 'react';
import { useProducts, updateProduct, deleteProduct } from '../hooks';

const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(undefined)
  const products = useProducts();

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

export { ProductContextProvider, ProductContext};

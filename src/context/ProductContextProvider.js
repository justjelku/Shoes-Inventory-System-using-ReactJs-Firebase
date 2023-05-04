import React, { createContext, useState } from 'react';
import { useProducts } from '../hooks';

const ProductContext = createContext();

function ProductContextProvider({ children, userId }) {
  const [selectedProduct, setSelectedProduct] = useState(undefined);

  const products = useProducts(userId);

  return (
    <ProductContext.Provider
      value={{
        products,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContextProvider, ProductContext };

const UserContext = createContext(null);

export default UserContext;

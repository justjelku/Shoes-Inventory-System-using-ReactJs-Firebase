import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/inventory.scss';
import { v4 as uuidv4 } from 'uuid';


function Inventory() {
  // Define state variables
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
//   const [isAddingProduct, setIsAddingProduct] = useState(false);
//   const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

  // Handle add product button click
	const handleAddClick = () => {
	const newProduct = { id: uuidv4(), name: '', price: 0 };
	setSelectedProduct(newProduct);
	setIsEditMode(true);
  };

  // Load products from API on component mount
  useEffect(() => {
    // TODO: Load products from API and set state
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsEditMode(false);
  };

  // Handle edit product button click
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  // Handle delete product button click
  const handleDeleteClick = () => {
    // TODO: Delete product from API and update state
  };

  // Handle save product button click
	const handleSaveClick = (product) => {
	if (product.id) {
	  // Update existing product
	  // TODO: Save product to API and update state
	} else {
	  // Add new product
	  setProducts([...products, product]);
	}
	setIsEditMode(false);
  };

  // Render product list
const renderProductList = () => {
	if (filteredProducts.length === 0) {
	  return <p>No products found.</p>;
	}
  
	return (
	  <ul>
		{filteredProducts.map((product) => (
		  <li key={product.id}>
			<button onClick={() => handleProductSelect(product)}>
			  {product.name}
			</button>
		  </li>
		))}
		<li>
		  <button onClick={handleAddClick}>Add Product</button>
		</li>
	  </ul>
	);
  };

// Render product details
const renderProductDetails = () => {
	if (isEditMode && !selectedProduct) {
	  return <p>Select a product to edit or click "Add Product" to add a new product.</p>;
	}
  
	return (
	  <div>
		{selectedProduct ? (
		  <>
			<h2>{isEditMode ? 'Edit Product' : selectedProduct.name}</h2>
			<form onSubmit={() => handleSaveClick(selectedProduct)}>
			  <label>
				Name:
				<input
				  type="text"
				  value={selectedProduct.name}
				  onChange={(event) =>
					setSelectedProduct({
					  ...selectedProduct,
					  name: event.target.value,
					})
				  }
				/>
			  </label>
			  <label>
				Price:
				<input
				  type="number"
				  value={selectedProduct.price}
				  onChange={(event) =>
					setSelectedProduct({
					  ...selectedProduct,
					  price: Number(event.target.value),
					})
				  }
				/>
			  </label>
			  <button type="submit">{selectedProduct.id ? 'Save' : 'Add'}</button>
			</form>
		  </>
		) : (
		  <p>Select a product to view details.</p>
		)}
		<button onClick={handleEditClick} disabled={!selectedProduct}>
		  Edit
		</button>
		<button onClick={handleDeleteClick} disabled={!selectedProduct}>
		  Delete
		</button>
		<button onClick={handleAddClick}>Add Product</button>
	  </div>
	);
  };
  

  return (
    <div>
      <h1>Inventory</h1>
      <label>
        Search:
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
      </label>
      {renderProductList()}
      {renderProductDetails()}
    </div>
  );
}

export default Inventory;

import firebase from 'firebase/compat/app';
import ProductForm from "./ProductForm";
import { useState, useEffect, useContext } from 'react';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { db } from '../firebase';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import { Modal } from '../components/ImageModal'
import {
  query,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import EditProduct from './EditProduct';
import DisplayProduct from './DisplayProduct';
import EditProductForm from './EditProductForm';

const StockInTab = ({ product }) => {
  // Render stock in content here
  return <div>Stock In Tab Content</div>;
};

const StockOutTab = ({ product }) => {
  // Render stock out content here
  return <div>Stock Out Tab Content</div>;
};



export const ContainerTables = () => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productTitle, setproductTitle] = useState()
  const [productSize, setproductSize] = useState()
  const [productPrice, setproductPrice] = useState()
  const [productDetails, setproductDetails] = useState()
  const [productQuantity, setProductQuantity] = useState()
  const [productBranch, setproductBranch] = useState()
  const [productImage, setproductImage] = useState()
  const [sizeSystem, setSizeSystem] = useState()

  const routes = [
    {
      path: '/edit/:productId',
      element: <EditProductForm product={selectedProduct} />,
    },
  ];

  const routing = useRoutes(routes);

  function handleSubmit(e) {

  }

  const handleClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (userId) {
      const getProduct = query(
        collection(
          db,
          'users',
          'qIglLalZbFgIOnO0r3Zu',
          'basic_users',
          userId,
          'products'
        )
      );
      const unsubscribe = onSnapshot(getProduct, (querySnapshot) => {
        let productsArr = [];
        querySnapshot.forEach((doc) => {
          productsArr.push({ id: doc.id, productTitle: doc.productTitle, ...doc.data() }); // Include all fields in the object
        });
        setProducts(productsArr);
      });
      return () => unsubscribe();
    }
  }, [setProducts, userId]);

  // const handleRowClick = (product) => {
  //   setSelectedProduct(product);
  // };
  const handleEdit = (e, product) => {
    e.stopPropagation();
    setSelectedProduct(product);

    // Navigate to the edit page with the selected product's ID
    navigate(`/edit/${product.productId}`);

  };

  const handleDelete = (e, product) => {
    e.stopPropagation(); // Prevent the row click event from firing
    // Handle delete functionality here
  };


  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Branch</th>
            <th>Brand</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} onClick={() => handleClick(product)}>
              <td data-label="Product ID">{product.id}</td>
              <td data-label="Name">{product.productTitle}</td>
              <td data-label="Category">{product.category}</td>
              <td data-label="Branch">{product.branch}</td>
              <td data-label="Brand">{product.productBrand}</td>
              <td data-label="Size"> {product.sizeSystem} {product.productSize}</td>
              <td data-label="Price">&#8369; {product.productPrice}</td>
              <td data-label="Quantity">{product.productQuantity}</td>
              <td data-label="Image"><img src={product.barcodeUrl} style={{ height: '50px', width: '50px', backgroundColor: 'white' }} alt={product.productTitle} /> </td>
              <td data-label="Action"> {/* Add the "Action" column */}
                <div className="flex space-x-5">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded" onClick={(e) => handleEdit(e, product)}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" onClick={(e) => handleDelete(e, product)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {routing}
      {selectedProduct && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <DisplayProduct 
          productTitle={selectedProduct.productTitle}
          productSize={selectedProduct.productSize} 
          productPrice={selectedProduct.productPrice} 
          productQuantity={selectedProduct.productQuantity}
          productBranch={selectedProduct.productBranch} 
          productImage={selectedProduct.productImage}  
          productDetails={selectedProduct.productDetails}  
          barcodeUrl={selectedProduct.barcodeUrl}  
          sizeSystem={selectedProduct.sizeSystem}  
          qrcodeUrl={selectedProduct.qrcodeUrl}
          category={selectedProduct.category}  
          color={selectedProduct.color}
          />
        </Modal>
      )}
    </>
  );
};

 {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={selectedProduct.productImage} style={{ maxWidth: '80%', backgroundColor: 'white', marginBottom: '10px' }} alt={selectedProduct.productTitle} />
            <img src={selectedProduct.barcodeUrl} style={{ maxWidth: '70%', backgroundColor: 'white', marginBottom: '10px' }} alt={selectedProduct.productTitle} />
          </div> */}
          {/* <ProductForm
            handleSubmit={handleSubmit}
            heading={selectedProduct.productTitle}
            productTitle={selectedProduct.productTitle}
            setproductTitle={setproductTitle}
            productSize={selectedProduct.productSize}
            setproductSize={setproductSize}
            productPrice={selectedProduct.productPrice}
            setproductPrice={setproductPrice}
            productQuantity={selectedProduct.productQuantity}
            setproductQuantity={setProductQuantity}
            productDetails={selectedProduct.productDetails}
            setproductDetails={setproductDetails}
            productBranch={selectedProduct.branch}
            setproductBranch={setproductBranch}
            productImage={selectedProduct.productImage}
            setproductImage={setproductImage}
            generateBarcodeButton={true}
            showButtons={true}
            setShowModal={setShowModal}
          /> */}

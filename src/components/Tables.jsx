import React from 'react';

const ContainerTables = () => {
	return ( 
		<table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Product ID">1</td>
              <td data-label="Name">Nike Air Max</td>
              <td data-label="Size">9</td>
              <td data-label="Price">$129.99</td>
              <td data-label="Quantity">20</td>
              <td data-label="Image"><img src="https://via.placeholder.com/150" alt="Nike Air Max" /></td>
            </tr>
            <tr>
              <td data-label="Product ID">2</td>
              <td data-label="Name">Adidas Superstar</td>
              <td data-label="Size">10</td>
              <td data-label="Price">$99.99</td>
              <td data-label="Quantity">15</td>
              <td data-label="Image"><img src="https://via.placeholder.com/150" alt="Adidas Superstar" /></td>
            </tr>
            <tr>
              <td data-label="Product ID">3</td>
              <td data-label="Name">Vans Old Skool</td>
              <td data-label="Size">8.5</td>
              <td data-label="Price">$79.99</td>
              <td data-label="Quantity">10</td>
              <td data-label="Image"><img src="https://via.placeholder.com/150" alt="Vans Old Skool" /></td>
            </tr>
          </tbody>
        </table>
	 );
}
 
export default ContainerTables;
import React from 'react';
import { BsGraphUp, BsClock, BsClipboardData, BsCart } from 'react-icons/bs';

const DashboardContainers = () => {
	return ( 
		<div className="dashboard">
          <div className="dashboard__item">
            <div className="dashboard__container">
              <div className="dashboard__icon">
                <BsGraphUp />
              </div>
              <div className="dashboard__text">
                <h3 className="dashboard__title">Total Sales</h3>
                <p className="dashboard__value">$20,000</p>
              </div>
            </div>
          </div>
          <div className="dashboard__item">
            <div className="dashboard__container">
              <div className="dashboard__icon">
                <BsClock />
              </div>
              <div className="dashboard__text">
                <h3 className="dashboard__title">Pending Order</h3>
                <p className="dashboard__value">5</p>
              </div>
            </div>
          </div>
          <div className="dashboard__item">
            <div className="dashboard__container">
              <div className="dashboard__icon">
                <BsClipboardData />
              </div>
              <div className="dashboard__text">
                <h3 className="dashboard__title">Stock Available</h3>
                <p className="dashboard__value">100</p>
              </div>
            </div>
          </div>
          <div className="dashboard__item">
            <div className="dashboard__container">
              <div className="dashboard__icon">
                <BsCart />
              </div>
              <div className="dashboard__text">
                <h3 className="dashboard__title">Total Order</h3>
                <p className="dashboard__value">25</p>
              </div>
            </div>
          </div>
        </div>
	 );
}
 
export default DashboardContainers;
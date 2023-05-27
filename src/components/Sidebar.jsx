import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProductContext } from '../context/ProductContextProvider'
import { ContainerTables } from './Tables';

function Sidebar({ children }){
    const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);

	// CONTEXT
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // REF
    const sidebarRef = useRef()

	useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
    })

    const handleClick = e => {
        if(e.target === sidebarRef.current || sidebarRef.current.contains(e.target)){
            setSelectedProduct( )
        }
    }

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };

	return ( 
		<div className={`Sidebar ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
      <div className="toggle-icon" onClick={handleToggleSidebar}>
        <i className={`fas fa-bars ${isSidebarOpen ? 'open' : ''}`}></i>
      </div>
      {children}
    </div>
	 );
}
 
export default Sidebar;
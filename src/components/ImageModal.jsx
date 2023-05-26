import React, {useRef} from 'react'

export function Modal({children, showModal, setShowModal}){
    const modalRef = useRef()

    const closeModal = (e) => {
        if(e.target === modalRef.current){
            setShowModal(false)
        }
    }
    
    return (
        showModal &&
        <div className="ImageModal" ref={modalRef} onClick={closeModal}>
            <div className="img_container">
				{/* <h1>Product Details</h1> */}
                {children}
            </div>
        </div>
    )
}
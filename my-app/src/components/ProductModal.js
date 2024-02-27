// components/ProductModal.js
import React, { useState } from 'react';
import { useEffect } from 'react';
import { showAlert } from '@/utils/showAlert';
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";

const ProductModal = ({ isOpen, onClose, updateProducts, product, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unitPrice: '',
    quantity: '',
    // Add more fields as needed
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // const formData = new FormData(e.target);
//     // const productData = {
//     //   productName: formData.get('productName'),
//     //   productDescription: formData.get('productDescription'),
//     //   unitPrice: parseFloat(formData.get('unitPrice')),
//     //   quantity: parseInt(formData.get('quantity')),
//     //   // Add more fields as needed
//     // };
  
//     try {
//       const response = await fetch(`${process.env.API_URL}api/inventory`, {
//         method: 'POST',
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       if (!response.ok) {
//         throw new Error('Error adding product');
//       }
  
//       // Optionally, fetch products again to update the list
//       // fetchProducts();
//       showAlert('Product added successfully!', 'success');
//       onUpdate(formData);
//       onClose(); // Close the modal after successful submission
//       updateProducts();
//     } catch (error) {
//       console.error('Error adding product:', error);
//       showAlert('Error adding product!', 'error');
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = product ? `${process.env.API_URL}api/inventory/${product._id}` : `${process.env.API_URL}api/inventory`;
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error ${product ? 'updating' : 'adding'} product`);
      }

      showAlert(`${product ? 'Updated' : 'Added'} product successfully`, 'success');

      if (onUpdate) {
        onUpdate(formData);
      }

      if (updateProducts) {
        updateProducts();
      }

      onClose();
    } catch (error) {
      showAlert(`Error ${product ? 'updating' : 'adding'} product: ${error.message}`, 'error');
    }
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="  bg-slate-400 p-8 rounded-lg shadow-lg relative">
        <button type="button" className=" bg-black rounded-full absolute top-0 right-3 mt-4 mr-4s  " onClick={onClose}>
          <IoMdCloseCircle size={24} />
              </button>
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit}>
                    <div className="mb-4 ">
              <label className=" block text-white-700 ">Product Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input w-full text-gray-900"/>
            </div>
            
            <div className="mb-4 ">
              <label className="blocktext-white">Product Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea w-full text-gray-900"></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-white">Unit Price:</label>
              <input
                type="number"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                className="form-input w-full text-gray-900"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-input w-full text-gray-900"
              />
            </div>
            <div >
              <button type="submit" className="btn btn-primary">
              <IoIosAddCircle  size={24}/>
              {product ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

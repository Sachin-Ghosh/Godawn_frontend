
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';


import { IoIosAddCircle } from "react-icons/io";

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


   const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/inventory`);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      console.log(data);  
      // setProducts(data);
      setProducts(data.products)
    } catch (error) {
      console.error(error.message);
    
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const updateProducts = () => {
    fetchProducts(); // Call fetchProducts function to update products
  };




  return (
    
    <div className="container min-h-screen mx-auto px-4 py-8">
      <div className='flex justify-between pt-2' >
      <div >
        <h1 className="  text-5xl pt-4 font-semibold mb-6">Inventory Management</h1>
        </div>
     
      <button
        className="btn  mt-4 btn-primary   "
        onClick={handleAddProduct}
      >
        <IoIosAddCircle size={24}/>

        Add New Product
      </button>
     
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {
        products.map((product) => (
          <ProductCard key={product.id} product={product} onUpdate={updateProducts} />
        ))}
      </div>
      
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={updateProducts}
        updateProducts={updateProducts}
      />
    </div>

  );
};

export default InventoryPage;

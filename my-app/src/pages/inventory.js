
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
    
    <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 min-h-screen mx-auto px-4 py-8 select-none">
      <div className='flex justify-between pt-2 bg-white bg-opacity-25 mb-3 rounded-xl mt-5 ' >
      <div >
        <h1 className="  text-bold shadow-2xl bg-cyan-50 bg-opacity-65 rounded-lg pt-4 mt-4 ml-4 pb-5 pr-5 pl-5 text-3xl text-neutral font-semibold mb-6">INVENTORY</h1>
        </div>
     
      <button
        className="btn btn-lg mt-6 border-green-600 bg-green-500 shadow-2xl btn-secondary mr-4   "
        onClick={handleAddProduct}
      >
        <IoIosAddCircle size={24} className='text-black'/>

        <p className='text-black'> Add product</p>
      </button>
     
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 rounded-lg bg-white bg-opacity-25 gap-6">
        
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

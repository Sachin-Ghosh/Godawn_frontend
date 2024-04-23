


import React, { useState, useEffect } from 'react';
import { FaShoppingBasket } from "react-icons/fa";
import SalesCard from '../components/SalesCard';
import SalesModal from '../components/SalesModal';
import { showAlert } from '@/utils/showAlert';
    

const Sales = () => {
    const [sales, setSales] = useState([]); // Initialize sales as an empty array
    const [productOptions, setProductOptions] = useState([]);
    const [formData, setFormData] = useState({
        buyerName: '',
        products: '',
        unitPrice: '',
        quantity: '',
        type: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Fetch sales data
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch(`${process.env.API_URL}api/sales`);
                if (!response.ok) {
                    throw new Error('Failed to fetch sales data');
                }
                const data = await response.json();
                // setSales(data);
                if (!Array.isArray(data)) {
                    throw new Error('Fetched data is not an array');
                }
                setSales(prevSales => {
                    if (!Array.isArray(prevSales)) {
                        return data; // Initialize as array if not already
                    }
                    return [...prevSales, ...data];
                });
                setLoading(false); // Update loading state after data is fetched
            } catch (error) {
                console.error(error);
                setLoading(false); // Update loading state in case of error
            }
        };

        fetchSalesData();
    }, []);

    // Fetch product options
    useEffect(() => {
        const fetchProductOptions = async () => {
            try {
                const response = await fetch(`${process.env.API_URL}api/inventory`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product options');
                }
                // const data = await response.json();
                // console.log('Fetched product options:', data);
                // setProductOptions(data);
                const data = await response.json();
if (Array.isArray(data.products)) {
    setProductOptions(data.products);
} else {
    console.error('Invalid product options data:', data);
}
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductOptions();
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'products') {
            const selectedProduct = productOptions.find(product => product._id === value);
            if (selectedProduct) {
                setFormData(prevState => ({
                    ...prevState,
                    unitPrice: selectedProduct.unitPrice,
                    type: selectedProduct.type
                }));
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const saleData = {
                buyerName: formData.buyerName,
                products: formData.products,
                unitPrice: formData.unitPrice,
                soldQuantity: parseInt(formData.quantity),
                type: formData.type,
            };

            const selectedProduct = productOptions.find(product => product._id === saleData.products);
        if (!selectedProduct) {
            throw new Error('Product not found');
        }
        if (saleData.soldQuantity > selectedProduct.quantity) {
            throw new Error('Quantity exceeds available inventory');
        }

            if (isNaN(saleData.soldQuantity) || saleData.soldQuantity <= 0) {
                throw new Error('Invalid quantity');
            }

            const saleResponse = await fetch(`${process.env.API_URL}api/sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saleData)
            });

            if (!saleResponse.ok) {
                throw new Error('Failed to add sale');
            }

            showAlert(` sold successfully`, 'success');

            const newSale = await saleResponse.json();

            console.log(newSale);

            // Update the sales state with the new sale
            setSales(prevSales => {
                if (!Array.isArray(prevSales)) {
                    return [newSale];
                }
                return [...prevSales, newSale];
            });

            closeModal();
        } catch (error) {
            console.error(error);
            showAlert('Failed to add sale: ' + error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gradient-to-r from-cyan-900 to-cyan-950 min-h-screen mx-auto px-4 py-8 select-none ">
            <div className='flex justify-between pt-2 bg-white bg-opacity-25 mb-3 rounded-xl mt-11'>
        <h1 className=" flex align-middle gap-3 text-bold shadow-2xl bg-cyan-50 bg-opacity-65 rounded-lg  pt-4 mt-4 ml-4 pb-5 pr-5 pl-5 text-3xl  text-neutral font-semibold mb-6">
        <FaShoppingBasket /> SALES</h1>
            <button onClick={openModal} className="btn btn-lg mt-6 border-green-600 bg-green-500 shadow-2xl btn-secondary mr-4 "> 
            <FaShoppingBasket />
            Add Sale</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {/* {sales.map(sale => (
                    <SalesCard key={sale._id} sale={sale} />
                ))} */}
                 {Array.isArray(sales) && sales.map(sale => (
          <SalesCard key={sale._id} sale={sale} soldQuantity={formData.quantity}/>
        ))}
            </div>
            <SalesModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                productOptions={productOptions}
                formData={formData}
            />
        </div>
    );
};

export default Sales;


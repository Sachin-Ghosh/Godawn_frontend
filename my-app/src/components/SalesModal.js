import React from 'react';

const SalesModal = ({ isOpen, closeModal, handleSubmit, handleChange, productOptions, formData }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add Sale</h3>
                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700">Buyer Name</label>
                                                <input type="text" name="buyerName" id="buyerName" value={formData.buyerName} onChange={handleChange} className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-gray-900" />
                                            </div>
                                            <div>
                                                <label htmlFor="productId" className="block text-sm font-medium text-gray-700">Product</label>
                                                <select name="productId" id="productId" value={formData.productId} onChange={handleChange} className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-gray-900">
                                                    <option value="">Select Product</option>
                                                    {productOptions.map(product => (
                                                        <option key={product._id} value={product._id}>{product.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Unit Price</label>
                                                <input type="number" name="unitPrice" id="unitPrice" value={formData.unitPrice} onChange={handleChange} className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-gray-900" />
                                            </div>
                                            <div>
                                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                                <input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-gray-900" />
                                            </div>
                                            <div>
                                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                                                <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md text-gray-900" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Sell</button>
                                <button onClick={closeModal} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SalesModal;


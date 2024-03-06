// // components/ProductModal.js
// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import { showAlert } from '@/utils/showAlert';
// import { IoMdCloseCircle } from "react-icons/io";
// import { IoIosAddCircle } from "react-icons/io";

// const ProductModal = ({ isOpen, onClose, updateProducts, product, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     type: '',
//     name: '',
//     description: '',
//     unitPrice: '',
//     quantity: '',
//     // Add more fields as needed
//   });

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         type: product.type,
//         name: product.name,
//         description: product.description,
//         unitPrice: product.unitPrice,
//         quantity: product.quantity,
//       });
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     // const formData = new FormData(e.target);
// //     // const productData = {
// //     //   productName: formData.get('productName'),
// //     //   productDescription: formData.get('productDescription'),
// //     //   unitPrice: parseFloat(formData.get('unitPrice')),
// //     //   quantity: parseInt(formData.get('quantity')),
// //     //   // Add more fields as needed
// //     // };
  
// //     try {
// //       const response = await fetch(`${process.env.API_URL}api/inventory`, {
// //         method: 'POST',
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });
  
// //       if (!response.ok) {
// //         throw new Error('Error adding product');
// //       }
  
// //       // Optionally, fetch products again to update the list
// //       // fetchProducts();
// //       showAlert('Product added successfully!', 'success');
// //       onUpdate(formData);
// //       onClose(); // Close the modal after successful submission
// //       updateProducts();
// //     } catch (error) {
// //       console.error('Error adding product:', error);
// //       showAlert('Error adding product!', 'error');
// //     }
// //   };

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const url = product ? `${process.env.API_URL}api/inventory/${product._id}` : `${process.env.API_URL}api/inventory`;
//       const method = product ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method: method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`Error ${product ? 'updating' : 'adding'} product`);
//       }

//       showAlert(`${product ? 'Updated' : 'Added'} product successfully`, 'success');

//       if (onUpdate) {
//         onUpdate(formData);
//       }

//       if (updateProducts) {
//         updateProducts();
//       }

//       onClose();
//     } catch (error) {
//       showAlert(`Error ${product ? 'updating' : 'adding'} product: ${error.message}`, 'error');
//     }
//   };

//   return (
//     <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="  bg-slate-400 p-8 rounded-lg shadow-lg relative">
//         <button type="button" className=" bg-black rounded-full absolute top-0 right-3 mt-4 mr-4s  " onClick={onClose}>
//           <IoMdCloseCircle size={24} />
//               </button>
//           <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//           <form onSubmit={handleSubmit}>

//             <div className="mb-4">
//               <label className="block text-white">Product Type:</label>
//               <input
//                 type="text"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="form-input w-full text-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-white">Product Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="form-input w-full text-gray-900"/>
//             </div>
            
//             <div className="mb-4 ">
//               <label className="blocktext-white">Product Description:</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="form-textarea w-full text-gray-900"></textarea>
//             </div>
//             <div className="mb-4">
//               <label className="block text-white">Unit Price:</label>
//               <input
//                 type="number"
//                 name="unitPrice"
//                 value={formData.unitPrice}
//                 onChange={handleChange}
//                 className="form-input w-full text-gray-900"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-white">Quantity:</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleChange}
//                 className="form-input w-full text-gray-900"
//               />
//             </div>
//             <div >
//               <button type="submit" className="btn btn-primary">
//               <IoIosAddCircle  size={24}/>
//               {product ? 'Update Product' : 'Add Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;



// import React, { useState } from 'react';
// import QrReader from 'react-qr-reader';

// const ProductModal = ({ isOpen, onClose, onScan }) => {
//   const [scannedData, setScannedData] = useState(null);

//   // Function to handle successful QR code scan
//   const handleScan = (data) => {
//     if (data) {
//       // Set the scanned data
//       setScannedData(data);
//       // Pass the scanned data to the parent component
//       onScan(data);
//     }
//   };

//   // Function to handle errors during QR code scan
//   const handleError = (error) => {
//     console.error('Error scanning QR code:', error);
//   };

//   return (
//     <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-white p-8 rounded-lg shadow-lg relative">
//           <button type="button" className="bg-black rounded-full absolute top-0 right-3 mt-4 mr-4" onClick={onClose}>
//             <IoMdCloseCircle size={24} />
//           </button>
//           <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//           {/* QR code scanner component */}
//           <QrReader
//             delay={300}
//             onError={handleError}
//             onScan={handleScan}
//             style={{ width: '100%' }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;


// ProductModal.js

// import React, { useState } from 'react';
// // import React, { useState } from 'react';
// import QrReader from 'react-qr-reader';

// const ProductModal = ({ isOpen, onClose }) => {
//   const [scannedData, setScannedData] = useState(null);
//   const [scanningError, setScanningError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleScan = (data) => {
//     if (data) {
//       setScannedData(data);
//       onScan(data);
//     }
//   };

//   const handleError = (error) => {
//     console.error('Error scanning QR code:', error);
//     setScanningError('Error scanning QR code. Please try again.');
//   };

//   const handleScanAgain = () => {
//     setScannedData(null);
//     setScanningError(null);
//   };

//   const toggleLoading = () => {
//     setLoading(prevLoading => !prevLoading);
//   };

//   return (
//     <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-white p-8 rounded-lg shadow-lg relative">
//           <button type="button" className="bg-black rounded-full absolute top-0 right-3 mt-4 mr-4" onClick={onClose}>
//             Close
//           </button>
//           <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//           <QrReader
//             delay={300}
//             onError={handleError}
//             onScan={handleScan}
//             style={{ width: '100%' }}
//           />
//           {scannedData && (
//             <div className="mt-4">
//               <p>Scanned Data: {scannedData}</p>
//               <button onClick={handleScanAgain}>Scan Again</button>
//             </div>
//           )}
//           {scanningError && <p className="text-red-500">{scanningError}</p>}
//           {loading && <p>Loading...</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;


// import React, { useState } from 'react';
// import QrReader from 'react-qr-reader';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { IoIosAddCircle } from 'react-icons/io';

// const ProductModal = ({ isOpen, onClose, updateProducts, product, onUpdate }) => {
//   const [formData, setFormData] = useState({
//     type: '',
//     name: '',
//     description: '',
//     unitPrice: '',
//     quantity: '',
//   });
//   const [scannedData, setScannedData] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleScan = (data) => {
//     if (data) {
//       setScannedData(data);
//       // Parse scanned data and update form fields accordingly
//       // For example:
//       // const parsedData = JSON.parse(data); // Assuming the scanned data is in JSON format
//       // setFormData(parsedData);
//     }
//   };

//   const handleError = (error) => {
//     console.error('Error scanning QR code:', error);
//     // Handle scanning error
//   };

//   const handleCloseModal = () => {
//     onClose();
//     setScannedData(null); // Reset scanned data when closing modal
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Use either form data or scanned data based on availability
//     const dataToSubmit = scannedData || formData;
//     // Handle form submission using dataToSubmit
//   };

//   return (
//     <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-white p-8 rounded-lg shadow-lg relative">
//           <button type="button" className="bg-black rounded-full absolute top-0 right-3 mt-4 mr-4" onClick={handleCloseModal}>
//             <IoMdCloseCircle size={24} />
//           </button>
//           <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//           <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
//           {scannedData && <p>Scanned Data: {scannedData}</p>}
//           <form onSubmit={handleSubmit}>
//             {/* Form fields */}
//             <button type="submit" className="btn btn-primary">
//               <IoIosAddCircle size={24} />
//               {product ? 'Update Product' : 'Add Product'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;



// import React, { useState, useRef, useEffect } from 'react';
// import { showAlert } from '@/utils/showAlert';
// import { IoMdCloseCircle } from "react-icons/io";
// import { IoIosAddCircle } from "react-icons/io";
// import QrScanner from 'qr-scanner'; // Import QR scanner library
// // import 'qr-scanner/qr-scanner-worker';  
// // import 'qr-scanner/qr-scanner-worker';
// // import { qr-scanner-worker } from "qr-scanner"; // Import QR scanner worker

// const ProductModal = ({ isOpen, onClose, updateProducts, product, onUpdate }) => {

//   const videoRef = useRef(null);
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [scannedData, setScannedData] = useState('');

//   const [formData, setFormData] = useState({
//     type: '',
//     name: '',
//     description: '',
//     unitPrice: '',
//     quantity: ''
//     // Add more fields as needed
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     const startVideoStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           setIsStreaming(true);
//         }
//       } catch (error) {
//         console.error('Error accessing webcam:', error);
//       }
//     };

//     startVideoStream();

//     // Cleanup function
//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const stream = videoRef.current.srcObject;
//         const tracks = stream.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//     };
//   }, []);

//   // const handleScanQRCode = async (e) => {
//   //   const fileInput = e.target;
//   //   const file = fileInput.files[0];
  
//   //   if (!file) return;
  
//   //   try {
//   //     const imageUrl = URL.createObjectURL(file);
//   //     const scanner = new QrScanner(document.createElement('img')); // Pass an image element to QrScanner
//   //     scanner.loadImage(imageUrl);
      
//   //     const result = await scanner.scan();
//   //     if (!result) {
//   //       showAlert('No QR code found in the image.', 'error');
//   //       return;
//   //     }
  
//   //     const data = JSON.parse(result);
//   //     setFormData(data);
//   //   } catch (error) {
//   //     console.error('Error scanning QR code:', error);
//   //     showAlert('Error scanning QR code.', 'error');
//   //   }
//   // };

//   // const handleScanQRCode = async () => {
//   //   try {
//   //     const scanner = new QrScanner(document.getElementById('qr-video'));
//   //     scanner.start();
//   //     scanner.addListener((data) => {
//   //       setScannedData(data);
//   //       scanner.stop();
//   //     });
//   //   } catch (error) {
//   //     console.error('Error scanning QR code:', error);
//   //     // Handle error
//   //   }
//   // };
  
//   const handleScanQRCode = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const scanner = new QrScanner(file);
//     try {
//       await scanner.scan();
//       const result = scanner.result;
//       if (!result) {
//         showAlert('No QR code found in the image.', 'error');
//         return;
//       }

//       const data = JSON.parse(result);
//       console.log(data);
//       setFormData(data);
//     } catch (error) {
//       console.error('Error scanning QR code:', error);
//       showAlert('Error scanning QR code.', 'error');
//     } finally {
//       scanner.destroy();
//     }
//   };
 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${process.env.API_URL}api/inventory`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       console.log(formData);
//       if (!response.ok) {
//         throw new Error('Error adding product');
//       }

//       showAlert('Product added successfully!', 'success');

//       if (onUpdate) {
//         onUpdate(formData);
//       }

//       if (updateProducts) {
//         updateProducts();
//       }

//       onClose(); // Close the modal after successful submission
//     } catch (error) {
//       console.error('Error adding product:', error);
//       showAlert('Error adding product!', 'error');
//     }
//   };

//   return (
//     <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="bg-slate-400 p-8 rounded-lg shadow-lg relative">
//           <button type="button" className="bg-black rounded-full absolute top-0 right-3 mt-4 mr-4" onClick={onClose}>
//             <IoMdCloseCircle size={24} />
//           </button>
//           <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
//           <form onSubmit={handleSubmit}>

//             {/* Your form fields go here */}

//             <div className="mb-4">
//   <label className="block text-gray-700">Scan QR Code:</label>
//   <video id="qr-video" className="w-full" />
//   <div>
//       {isStreaming ? (
//         <video ref={videoRef} autoPlay playsInline />
//       ) : (
//         <p>Accessing webcam...</p>
//       )}
//     </div>
// </div>
// <button className="btn btn-primary" onClick={handleScanQRCode}>Scan QR Code</button>


//             <div>
//               <label className="block text-white">Upload QR Code Image:</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleScanQRCode}
//                 className="form-input w-full text-gray-900"
//               />
//             </div>
//             <div>
//               <button type="submit" className="btn btn-primary">
//                 <IoIosAddCircle size={24}/>
//                 {product ? 'Update Product' : 'Add Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductModal;



import React, { useState,  useRef } from "react";
import { IoMdCloseCircle, IoIosAddCircle } from "react-icons/io";
// import QrReader from "react-qr-scanner";
// import Modal from "react-modal";
// Check if window is defined to determine if it's running in a browser environment
const isBrowser = typeof window !== "undefined";
let QrReader;
if (isBrowser) {
  QrReader = require("react-qr-scanner");
}

const ProductModal = ({
  isOpen,
  onClose,
  updateProducts,
  product,
  onUpdate,
}) => {
  const [scannedData, setScannedData] = useState("");
  // const [cameraFacingMode, setCameraFacingMode] = useState('environment');
  const qrRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setScannedData(data); // Set the scanned data object directly
    }
  };

  const handleError = (error) => {
    console.error("QR Scanner error:", error);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   alert("Scanned QR Code Data:" + scannedData.text);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Parse the scanned data string
      const scannedDataString = scannedData.text;
      console.log("Scanned Data:", scannedDataString);
      const fields = scannedDataString.split(' ');
  
      //  Split the scanned data string by newline characters to get individual lines
const lines = scannedDataString.split('\n');

// Initialize an object to store the extracted data
const productData = {};

// Loop through the lines to extract data
lines.forEach(line => {
  // Split each line by ':' to separate key and value
  const [key, value] = line.split(':').map(item => item.trim());

  // Adjust the key as needed
  const adjustedKey = key.toLowerCase().replace(' ', ''); // Convert to lowercase and remove spaces

  // Special handling for 'Unit Price' key
  const finalKey = adjustedKey === 'unitprice' ? 'unitPrice' : adjustedKey;

  // Store the extracted key-value pair in the productData object with adjusted key
  productData[finalKey] = value;
});

// Now productData contains the extracted data in the desired format
console.log(productData);
  
      // Create an object with the extracted data
      // const productData = { type, name, description, unitPrice, quantity };
  
      // Post the product data to the backend using fetch
      const response = await fetch(`${process.env.API_URL}api/inventory/addProductFromQR`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
  
      if (response.ok) {
        console.log("Product added successfully");
        onUpdate();
        onClose();
        // Optionally, update the UI or perform any other actions after successful addition
      } else {
        console.error("Error adding product:", response.statusText);
        // Handle errors
      }
    
    } catch (error) {
      console.error("Error adding product:", error.message);
      // Handle errors
    }
  };
  
  // const toggleCamera = () => {
  //   setCameraFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
  // };

  const switchCamera = () => {
    if (qrRef.current && qrRef.current.openImageDialog) {
      if (qrRef.current.mediaStream) {
        qrRef.current.mediaStream.getVideoTracks().forEach(track => track.stop()); // Stop the current camera stream
      }
      qrRef.current.openImageDialog(); // Open file dialog to allow the user to select another camera
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-slate-400 p-8 rounded-lg shadow-lg relative">
          <button
            type="button"
            className="bg-black rounded-full absolute top-0 right-3 mt-4 mr-4"
            onClick={onClose}
          >
            <IoMdCloseCircle size={24} />
          </button>
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div
              className="mb-4"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <label className="block text-white">Scan QR Code:</label>
              {isOpen && (
                
                <QrReader
                ref={qrRef}
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                facingMode="environment"
              />
              )}
            </div>

            <div className="mb-4">
              <button type="button" onClick={switchCamera}>Switch Camera</button>
            </div>

            <div className="mb-4">
              <button type="submit" className="btn btn-primary">
                <IoIosAddCircle size={24} />
                Add Product
              </button>
            </div>
            {scannedData && (
              <div className="mb-4">
                <p className="text-white">
                  Scanned QR Code Data: {scannedData.text}
                </p>
                {/* Display other relevant properties of scannedData */}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
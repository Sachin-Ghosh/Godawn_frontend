

import React, { useState,  useRef } from "react";
import { IoMdCloseCircle, IoIosAddCircle } from "react-icons/io";
import { showAlert } from '@/utils/showAlert';
import { FaCameraRotate } from "react-icons/fa6";
import SalesUpCard from "./SalesUpCard";
// import QrReader from "react-qr-scanner";
// import Modal from "react-modal";
// Check if window is defined to determine if it's running in a browser environment
const isBrowser = typeof window !== "undefined";
let QrReader;
if (isBrowser) {
  QrReader = require("react-qr-scanner");
}

const SalesUpModal   = ({
  isOpen,
  onClose,
  updateProducts,
  product,
  onUpdate,
}) => {
  const [scannedData, setScannedData] = useState("");
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');
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
        showAlert('Product added successfully!', 'success');
        onUpdate();
        onClose();
        // Optionally, update the UI or perform any other actions after successful addition
      } else {
        console.error("Error adding product:", response.statusText);
        // Handle errors
      }
    
    } catch (error) {
      console.error("Error adding product:", error.message);
      showAlert('Error adding product!', 'error');
      // Handle errors
    }
  };
  
  // const toggleCamera = () => {
  //   setCameraFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
  // };

  // const switchCamera = () => {
  //   if (qrRef.current && qrRef.current.openImageDialog) {
  //     if (qrRef.current.state.facingMode === "user") {
  //       qrRef.current.setState({ facingMode: "environment" }); // Switch to rear camera
  //     } else {
  //       qrRef.current.setState({ facingMode: "user" }); // Switch to front camera
  //     }
  //   }
  // };

  // Function to toggle between front and rear cameras
  const switchCamera = () => {
    console.log('Before switching, cameraFacingMode:', cameraFacingMode);
    setCameraFacingMode((prevMode) =>
      prevMode === "user" ? "environment" : "user"
    );
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-slate-400 p-8 rounded-lg shadow-lg relative">
        <div className="flex justify-end gap-x-80 mb-10  ">
        <h2 className="text-2xl font-semibold ">Add Product</h2>
          <button
            type="button"
            className="rounded-full border-0"
            onClick={onClose}
          >
            <IoMdCloseCircle size={24} />
          </button>
          </div>
          <form onSubmit={handleSubmit}>
          <label className="block text-white ml-8">Scan QR Code:</label>
            <div
              className="mb-4 border-2 border-black"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
          
              {isOpen && (
                
                <QrReader
                ref={qrRef}
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                // facingmode={cameraFacingMode} // Use lowercase 'facingmode' here
                constraints={{
                  audio: false,
                  video: { facingMode: "environment" }
                }}
              />
              )}
            </div>

            <div className="mb-4">
            <button type="button" className="btn  border-green-600 bg-green-500 shadow-2xl btn-secondary mt-5 ml-6" onClick={switchCamera}>
                 <FaCameraRotate  size={24}/>
                Switch Camera</button>
            </div>

            <div className="mb-4">
  <p>Current Camera Facing Mode: {cameraFacingMode}</p>
</div>

            <div className="mb-4">
            <button type="submit" className="btn border-green-600 bg-green-500 shadow-2xl btn-secondary ml-6">
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

export default SalesUpModal;
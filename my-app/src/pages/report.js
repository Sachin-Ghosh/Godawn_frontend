// pages/ReportPage.js
import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import PieChart from '../components/PieChart';
import LineGraph from '../components/LineGraph';

const ReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pieChartData, setPieChartData] = useState(null);
  const [lineGraphData, setLineGraphData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

//   const fetchData = async () => {
//     try {
//       const year = selectedDate.getFullYear();
//       const month = selectedDate.getMonth() + 1;
//       const day = selectedDate.getDate();

//       // Fetch data for selected date from backend
//       const response = await fetch(`${process.env.API_URL}api/reports/totalProductsSold/${year}/${month}/${day}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }

//       const data = await response.json();
//       console.log(data);

//       // Update state with fetched data
//       setPieChartData(data.pieChartData);
//       setLineGraphData(data.lineGraphData);
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//     }
//   };

const fetchData = async () => {
    try {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
  
      // Fetch data for total products added
      const addedResponse = await fetch(`${process.env.API_URL}api/reports/totalProductsAdded/${year}/${month}/${day}`);
      if (!addedResponse.ok) {
        throw new Error('Failed to fetch data for total products added');
      }
      const addedData = await addedResponse.json();
      console.log('Total products added:', addedData);
  
      // Fetch data for total products sold
      const soldResponse = await fetch(`${process.env.API_URL}api/reports/totalProductsSold/${year}/${month}/${day}`);
      if (!soldResponse.ok) {
        throw new Error('Failed to fetch data for total products sold');
      }
      const soldData = await soldResponse.json();
      console.log('Total products sold:', soldData);
  
      // Update state with fetched data
      setPieChartData({
        totalProductsAdded: addedData.totalProductsAdded,
        totalProductsSold: soldData.totalProductsSold
      });
      setLineGraphData({
        productsAdded: addedData.totalProductsAdded,
        productsSold: soldData.totalProductsSold
      });
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log('Selected date:', selectedDate);
  console.log('Pie chart data:', pieChartData);
  console.log('Line graph data:', lineGraphData);

  return (
    <div>
    <h1>Report Page</h1>
    <Calendar selectedDate={selectedDate} handleDateChange={handleDateChange} />
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {pieChartData !== null ? (
          <PieChart data={pieChartData} />
        ) : (
          <div>No data available for pie chart</div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        {lineGraphData !== null ? (
          <LineGraph data={lineGraphData} />
        ) : (
          <div>No data available for line graph</div>
        )}
      </div>
    </div>
  </div>
  );
};

export default ReportPage;

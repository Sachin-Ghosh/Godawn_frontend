// // components/PieChart.js
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ pieData }) => {
  if (!pieData || !pieData.totalProductsAdded || !pieData.totalProductsSold) {
    // Handle the case when data is undefined or missing required properties
    return <div>No data available</div>;
  }

  const chartData = {
    labels: ['Products Added', 'Products Sold'],
    datasets: [
      {
        data: [pieData.totalProductsAdded, pieData.totalProductsSold],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB']
      }
    ]
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <h2>Pie Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;

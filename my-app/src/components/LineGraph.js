// // components/LineGraph.js
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = ({ lineGraphData }) => {
  if (!lineGraphData) {
    // Handle the case when data is undefined
    return <div>No data available</div>;
  }

  const labels = Object.keys(lineGraphData).map(month => month);
  const productsAddedData = Object.entries(lineGraphData).map(([_, month]) => month.productsAdded);
  const productsSoldData = Object.entries(lineGraphData).map(([_, month]) => month.productsSold);
  

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Products Added',
        data: productsAddedData,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
      {
        label: 'Products Sold',
        data: productsSoldData,
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.4)',
      }
    ]
  };

  return (
    <div style={{ width: '600px', height: '600px' }}>
      <h2>Line Graph</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineGraph;
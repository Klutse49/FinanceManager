import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';  

const FinanceChart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [{
            data: data.values,
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
            hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
        }]
    };

    return <Doughnut data={chartData} />;
};

export default FinanceChart;

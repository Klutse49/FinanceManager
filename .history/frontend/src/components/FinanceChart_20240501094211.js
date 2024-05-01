import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const FinanceChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
            hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
        }]
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFinanceData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/chart');
                setChartData({
                    labels: response.data.map(item => item.category),
                    datasets: [{
                        data: response.data.map(item => item.value),
                        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                        hoverBackgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
                    }]
                });
            } catch (error) {
                console.error('Failed to fetch finance data:', error);
                setError('Failed to fetch finance data');
            }
        };

        fetchFinanceData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return <Doughnut data={chartData} />;
};

export default FinanceChart;

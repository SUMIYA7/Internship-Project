import  { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Swal from 'sweetalert2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const OrderChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Book Quantity per Person',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    });

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(data => {
                const labels = data.map(order => order.customerInfo.name);
                const bookQuantities = data.map(order => order.orders.reduce((total, item) => total + item.quantity, 0));

                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Book Quantity per Person',
                        data: bookQuantities,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                Swal.fire('Error', 'Failed to fetch orders', 'error');
            });
    }, []);

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Book Quantity per Person</h1>
            <div className='bg-white p-4 rounded shadow-md'>
                <Bar data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default OrderChart;

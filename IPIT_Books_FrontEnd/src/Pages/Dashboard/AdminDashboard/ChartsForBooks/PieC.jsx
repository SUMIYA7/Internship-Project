import  { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieC = () => {
    const [bookStats, setBookStats] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        // Fetch data from API to get book stats
        fetch("http://localhost:5000/allBooks")
            .then(response => response.json())
            .then(data => {
                // Count occurrences of each book type
                const stats = {};
                data.forEach(book => {
                    if (stats[book.BookType]) {
                        stats[book.BookType]++;
                    } else {
                        stats[book.BookType] = 1;
                    }
                });
                // Convert stats object to an array of objects
                const statsArray = Object.keys(stats).map(key => ({ bookType: key, count: stats[key] }));
                setBookStats(statsArray);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        // Destroy previous chart instance if it exists
        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }

        // Create new chart instance
        const ctx = document.getElementById('pieChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: bookStats.map(book => book.bookType),
                datasets: [{
                    label: 'Book Types',
                    data: bookStats.map(book => book.count),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'left',
                        labels: {
                            boxWidth: 20,
                            padding: 10
                        }
                    }
                }
            }
        });
    }, [bookStats]);

    return (
        <div style={{ width: '450px', height: '400px' }}>
            <canvas  id="pieChart"></canvas>
        </div>
    );
};

export default PieC;

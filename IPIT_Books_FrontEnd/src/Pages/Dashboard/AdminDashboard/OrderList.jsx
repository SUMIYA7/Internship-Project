import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => {
                console.error('Error fetching orders:', error);
                Swal.fire('Error', 'Failed to fetch orders', 'error');
            });
    }, []);

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4 text-center bg-blue-200 py-2'>Order List</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {orders.map(order => (
                    <div key={order._id} className='bg-white p-4 rounded a'>
                        <h2 className='text-xl font-semibold mb-2'>Order ID: {order._id}</h2>
                        <p><span className='font-semibold'>User:</span> {order.user}</p>
                        <p><span className='font-semibold'>Payment Method:</span> {order.paymentMethod}</p>
                        <div className='mt-2'>
                            <h3 className='font-semibold'>Customer Info:</h3>
                            <p>Name: {order.customerInfo.name}</p>
                            <p>Phone Number: {order.customerInfo.phoneNumber}</p>
                            <p>Address: {order.customerInfo.address}</p>
                        </div>
                        <div className='mt-2'>
                            <h3 className='font-semibold'>Order Details:</h3>
                            <ul className='list-disc pl-5'>
                                {order.orders.map((item, index) => (
                                    <li key={index}>
                                        {item.bookName} - Quantity: {item.quantity} - Price: {item.price} Taka
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className='mt-2 font-semibold'>Total Price: {order.totalPrice} Taka</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderList;

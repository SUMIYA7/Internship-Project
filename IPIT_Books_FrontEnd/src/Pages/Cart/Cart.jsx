import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { TbCurrencyTaka } from "react-icons/tb";
import { useForm } from 'react-hook-form';

const Cart = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery'); // Default payment method

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCartItems(storedCart);
        }
    }, []);

    const increaseCount = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].count = (updatedCart[index].count || 0) + 1;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decreaseCount = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].count = Math.max((updatedCart[index].count || 1) - 1, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const deleteItem = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove this item from the cart.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCart = [...cartItems];
                updatedCart.splice(index, 1);
                setCartItems(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                Swal.fire('Deleted!', 'Your item has been removed from the cart.', 'success');
            }
        });
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        const priceDetails = cartItems.map((item) => {
            const itemPrice = item.Price * (item.count || 1);
            totalPrice += itemPrice;
            return `${item.bookName}: ${item.Price} * ${item.count || 1} = ${itemPrice} Taka`;
        });
        return { totalPrice, priceDetails };
    };

    const onSubmit = (data) => {
        const orderData = {
            user: user.email,
            paymentMethod: paymentMethod,
            orders: cartItems.map((item) => ({
                bookName: item.bookName,
                quantity: item.count || 1,
                price: item.Price * (item.count || 1)
            })),
            totalPrice: calculateTotalPrice().totalPrice,
            customerInfo: {
                name: data.name,
                phoneNumber: data.phoneNumber,
                address: data.address
            }
        };

        if (paymentMethod === 'Cash on Delivery') {
            fetch('http://localhost:5000/postOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire('Order Placed', 'Your order has been placed successfully', 'success');
                    console.log(data);
                    reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else if (paymentMethod === 'Visa Card') {
            navigate('/bkash', { state: { orderData } });
        }
    };

    return (
        <div className='flex justify-around gap-5 m-5'>
            <ul>
                {cartItems.map((item, index) => (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-4  bg-blue-50 px-4 py-2 a ' key={index}>
                        <img className='h-24 w-16' src={item.image} alt={item.bookName} />
                        <div>
                            <p className='text-lg font-bold'>Book: {item.bookName}</p>
                            <p className='flex'><span className='font-bold'>Price: </span> <span className='flex items-center font-bold text-orange-600'>{item.Price} <TbCurrencyTaka /></span></p>
                            <div className='flex items-center gap-3 mt-1'>
                                <button onClick={() => decreaseCount(index)}><p className='text-2xl h-6 w-6 hover:bg-red-400 bg-red-300 flex justify-center items-center'>-</p></button>
                                <p className='text-2xl'>{item.count || 1}</p>
                                <button onClick={() => increaseCount(index)}><p className='text-2xl h-6 w-6 hover:bg-emerald-500 bg-emerald-400  flex justify-center items-center'>+</p></button>
                            </div>

                        </div>
                        <div>
                            <p><span className='font-bold'>Writer:</span> {item.Writer}</p>
                            <p><span className='font-bold'>Type:</span> {item.BookType}</p>
                            <button className='bg-red-600 mt-2 hover:bg-red-500 px-1 text-white  rounded-md' onClick={() => deleteItem(index)}>Delete</button>
                            {/* <p>{item._id}</p> */}
                        </div>
                    </div>
                ))}
            </ul>

            <div className='mt-4'>
                <div>
                    {calculateTotalPrice().priceDetails.map((detail, index) => (
                        <p className='font-bold text-slate-700' key={index}>{detail}</p>
                    ))}
                </div>

                <p className='border-t-2 font-bold border-slate-400 mb-10'>Total Price: <span className='text-orange-500'>{calculateTotalPrice().totalPrice}</span> Taka</p>

                <form onSubmit={handleSubmit(onSubmit)} className='bg-blue-100 a p-4 rounded'>
                    <div className='mb-4'>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
                        <input
                            type='text'
                            id='name'
                            {...register('name', { required: true })}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700'>Phone Number</label>
                        <input
                            type='text'
                            id='phoneNumber'
                            {...register('phoneNumber', { required: true })}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='address' className='block text-sm font-medium text-gray-700'>Address</label>
                        <textarea
                            type='text'
                            id='address'
                            {...register('address', { required: true })}
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        />
                    </div>

                    <div className='flex justify-evenly font-semibold mb-4'>
                        <label className='flex items-center gap-1'>
                            <input type="radio" value="Cash on Delivery" checked={paymentMethod === 'Cash on Delivery'} onChange={(e) => setPaymentMethod(e.target.value)} />
                            Cash on Delivery
                        </label>
                        <label className='flex items-center gap-1'>
                            <input type="radio" value="Visa Card" checked={paymentMethod === 'Visa Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                            Visa Card
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <button type='submit' className='bg-emerald-400 hover:bg-emerald-500 text-white rounded-sm font-semibold px-2 mb-2'>Order Now</button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default Cart;

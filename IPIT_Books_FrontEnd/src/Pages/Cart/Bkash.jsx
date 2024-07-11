/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';

// Load your publishable key from your Stripe dashboard
const stripePromise = loadStripe('your-publishable-key'); // Ensure this is your actual publishable key

const CheckoutForm = ({ orderData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent when the component loads
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalPrice: orderData.totalPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [orderData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: orderData.user,
                },
            },
        });

        if (error) {
            console.error(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            navigate('/success'); // Navigate to a success page
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

const Bkash = () => {
    const location = useLocation();
    const { orderData } = location.state || {};

    return (
        <div>
            <div className='m-10  mx-96 bg-blue-50 text-lg font-bold p-4 e'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm orderData={orderData} />
                </Elements>
                
            </div>
            <p className='text-center font-bold text-lg mb-80 text-red-600'>Payment Method is on Under Construction</p>
        </div>
    );
};

export default Bkash;

// SingleBook.js
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import QRCode from "qrcode.react";
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const SingleBook = () => {
    // const history = useHistory();
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const bookData = useLoaderData();
    const {
        bookName,
        image,
        Writer,
        Price,
        Publishers,
        NumberofPage,
        BookType,
        LastUpdate,
        Description,
        _id
    } = bookData;

    const addToCart = () => {
        const newItem = {
            bookName,
            image,
            Writer,
            Price,
            Publishers,
            NumberofPage,
            BookType,
            LastUpdate,
            Description,
            _id

        };
        const updatedCart = [...cartItems, newItem];
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        Swal.fire({
            icon: 'success',
            title: 'Added to Cart!',
            text: `${bookName} has been added to your cart.`,
            showConfirmButton: false,
            timer: 3000 // Automatically close after 2 seconds
        });
    };

    // Inline style for background image
    const backgroundImageStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px', // Adjust the height as needed
        position: 'relative', // Required for absolute positioning of overlay
    };

    // Inline style for overlay div
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust opacity here (0.5 for semi-transparent)
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
    };

    return (
        <div>
            <div style={backgroundImageStyle}>
                <div className="flex flex-col" style={overlayStyle}>
                    <img className="h-60 w-44 rounded-xl border-2 border-white e" src={image} alt="" />
                    <h2 className="text-xl font-bold mt-3">{bookName}</h2>
                </div>
            </div>

            <div className="flex justify-center e rounded-md p-1 items-center gap-3 text-xl font-bold mx-6 my-1">
                <p className="bg-slate-200 rounded-lg">Description:</p>
                <Marquee>
                    <p>{Description}</p>
                </Marquee>
            </div>

            <div className="flex justify-center items-center gap-10 mt-8 a p-10 rounded-xl mx-10">
                <div className="e rounded-xl">
                    <img className="h-72 w-52 rounded-xl border-2 " src={image} alt="" />
                </div>
                <div className="w-[300px]">
                    <h2 className="text-xl font-bold mt-3">{bookName}</h2>
                    <p className="font-semibold text-green-500">Writer: {Writer}</p>
                    <p className="text-blue-500 font-bold"><span className="text-red-600 font-bold">Price:</span> {Price} Taka/-</p>
                    <p className="text-blue-500 font-bold"><span className="text-red-600 font-bold">Publishers:</span> {Publishers}</p>
                    <p className="text-blue-500 font-bold"><span className="text-red-600 font-bold">Number of Pages:</span> {NumberofPage}</p>
                    <p className="text-blue-500 font-bold"><span className="text-red-600 font-bold">Book Type:</span> {BookType}</p>
                    <p className="text-blue-500 font-bold"><span className="text-red-600 font-bold">Last Update:</span> {LastUpdate}</p>
                    <div className="mt-4">
                        <p className="text-blue-500 font-bold"><span className="text-red-600 font-bold">Scan for Read:</span></p>
                        <div className="">
                            <QRCode className="e border-4 p-1 rounded-lg border-blue-300" value={Description} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-10'>
                <button className='e btn btn-error text-white text-lg' onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default SingleBook;

import { useState, useEffect } from 'react';
import Title from '../../../ReuseableComponents/Title';
import { Link } from 'react-router-dom';

const BestSelling = () => {
    const [latestBooks, setLatestBooks] = useState([]);

    useEffect(() => {
        const fetchLatestBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/latestThreeBooks');
                const data = await response.json();
                setLatestBooks(data);
            } catch (error) {
                console.error('Error fetching latest books:', error);
            }
        };

        fetchLatestBooks();
    }, []);

    // Function to toggle full description
    const toggleDescription = (index) => {
        const updatedBooks = [...latestBooks];
        updatedBooks[index].showFullDescription = !updatedBooks[index].showFullDescription;
        setLatestBooks(updatedBooks);
    };

    return (
        <div>
            <Title a="Best Selling Books" />
            <div className="grid grid-cols-3 gap-4 m-4">
                {latestBooks.map((book, index) => (
                    <div key={book._id} className="border p-4 rounded-lg e bg-white h-[420px]">
                        <img src={book.image} alt={book.bookName} className="w-full h-48 object-cover mb-4 rounded-lg" />
                        
                        {/*  */}
                        
                        {/*  */}

                        <div className='flex justify-between items-center'>
                            <h3 className="text-lg font-bold mb-2">{book.bookName}</h3>
                            <Link to={`/book/${book._id}`}>
                                <span className='e p-2 rounded-md font-bold text-red-600 hover:bg-red-100'>
                                    View Details
                                </span>
                            </Link>
                        </div>
                        <p className="text-gray-600">{book.Writer}</p>
                        <p className="text-gray-600">{`Price: $${book.Price}`}</p>
                        <p className="text-gray-600">
                            {book.showFullDescription ? book.Description : `${book.Description.slice(0, 25)}...`}
                            <button className="text-blue-500 hover:underline focus:outline-none" onClick={() => toggleDescription(index)}>
                                {book.showFullDescription ? 'Read Less' : 'Read More'}
                            </button>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSelling;

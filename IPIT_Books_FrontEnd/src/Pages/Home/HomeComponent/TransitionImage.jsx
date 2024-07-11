import { useState, useEffect } from 'react';
import Title from '../../../ReuseableComponents/Title';

const TransitionImage = () => {
    // Define state to keep track of the current index of the carousel
    const [startIndex, setStartIndex] = useState(0);
    // Define state to store the images fetched from the API
    const [apiImages, setApiImages] = useState([]);

    // Fetch data from API on component mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:5000/allBooks');
                const data = await response.json();
                // Extract image URLs from the API response
                const fetchedImages = data.map(book => book.image);
                // Update the state with fetched images
                setApiImages(fetchedImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    // Function to show the next set of items in the carousel
    const showNextItems = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % apiImages.length);
    };

    // Use useEffect to set up the interval for automatic sliding
    useEffect(() => {
        const interval = setInterval(showNextItems, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [apiImages]); // Re-run effect when apiImages changes

    return (
        <div>
            <Title a="Our Latest Books" />
            <div className='flex justify-center items-center'>
                <div className="carousel carousel-end rounded-box">
                    {[0, 1, 2, 3].map((offset) => (
                        <div key={startIndex + offset} className={`carousel-item ${offset === 0 ? 'active' : ''}`}>
                            {/* Use apiImages array instead of static images array */}
                            <img className='m-4 rounded-xl e w-72 shadow-2xl h-96' src={apiImages[(startIndex + offset) % apiImages.length]} alt="Book" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransitionImage;

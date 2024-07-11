import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        // Fetch data from the API endpoint
        fetch('http://localhost:5000/allBooks')
            .then(response => response.json())
            .then(data => {
                // Set the fetched books to state
                setBooks(data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, []);

    const filteredBooks = books.filter(book =>
        book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType === '' || book.BookType === selectedType)
    );

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-4">Books</h2>
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search by book name"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full mr-4"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select
                    className="border border-gray-300 rounded-md px-4 py-2"
                    value={selectedType}
                    onChange={handleTypeChange}
                >
                    <option value="">All Types</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Biography">Biography</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Science">Science</option>
                    <option value="Story">Story</option>
                    <option value="Poetry">Poetry</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {filteredBooks.map(book => (
                    <div data-aos="fade-up" data-aos-duration="2000" key={book._id} className="bg-white rounded-md e p-4 my-6 mx-10">
                        <div>
                            <img src={book.image} alt={book.bookName}
                                className="rounded-lg e w-44 h-60 object-cover mb-4"
                            />
                        </div>

                        <h3 className="text-xl font-semibold">{book.bookName}</h3>
                        <p className="text-gray-500 mb-2 font-semibold">{book.Writer}</p>
                        <p className="text-gray-600 mb-2">Price: <span className='text-green-500 font-semibold'>{book.Price} Taka/-</span></p>
                        <p className="text-gray-600 mb-4">{book.Description.substring(0, 70)}<Link to={`/book/${book._id}`} className="text-blue-500 font-semibold"> ...Read More</Link></p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;

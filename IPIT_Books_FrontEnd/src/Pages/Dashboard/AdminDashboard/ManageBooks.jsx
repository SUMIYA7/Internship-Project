import  { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch("http://localhost:5000/allBooks")
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Function to determine row color based on index
    const getRowColor = (index) => {
        return index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-300';
    };

    // Function to handle book deletion
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this book!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                // Make API request to delete the book
                fetch(`http://localhost:5000/deleteBooks/${id}`, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire(
                            'Deleted!',
                            data.message,
                            'success'
                        );
                        // Remove the deleted book from the UI
                        setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
                    })
                    .catch(error => {
                        console.error('Error deleting book:', error);
                        Swal.fire(
                            'Error!',
                            'Failed to delete book.',
                            'error'
                        );
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your book is safe :)',
                    'info'
                );
            }
        });
    };

    return (
        <div data-aos="zoom-in" className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead className='font-bold text-lg text-white bg-slate-700'>
                    <tr>
                        <th>Name</th>
                        <th>Writer</th>
                        <th>Price</th>
                        <th>Last Update</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Dynamically render rows based on fetched data */}
                    {books.map((book, index) => (
                        <tr key={book._id} className={getRowColor(index)}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={book.image} alt={book.bookName} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{book.bookName}</div>
                                        <div className="text-sm opacity-50">{book.BookType}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {book.Writer}
                                <br />
                                <span className="badge badge-ghost badge-sm a">{book.Publishers}</span>
                            </td>
                            <td>{book.Price}</td>
                            <td>{book.LastUpdate}</td>
                            <td>
                                <button className="btn text-red-700 e btn-red btn-xs font-bold" onClick={() => handleDelete(book._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBooks;

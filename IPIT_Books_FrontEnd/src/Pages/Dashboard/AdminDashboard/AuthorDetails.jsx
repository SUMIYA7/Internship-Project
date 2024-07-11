
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AuthorDetails = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch("http://localhost:5000/AllAuthors")
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
                fetch(`http://localhost:5000/deleteAuthor/${id}`, {
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
        <div data-aos="zoom-in" className="overflow-x-auto rounded-2xl">
            <table className="table">
                {/* head */}
                <thead className='font-bold text-lg text-white bg-slate-700'>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Dynamically render rows based on fetched data */}
                    {books.map((a, index) => (
                        <tr key={a._id} className={getRowColor(index)}>
                            <td className='font-bold'>{a.AuthorName}</td>
                            <td><img className='w-16 h-16 rounded-full e p-1' src={a.image} alt="" /></td>
                            <td>
                                <button className="btn text-red-700 e btn-red btn-xs font-bold" onClick={() => handleDelete(a._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuthorDetails;

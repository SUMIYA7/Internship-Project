


import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
import Swal from "sweetalert2";

const AddBooks = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const imageHostKey = `771e92fe5bf3b4553445891d6b44f4a1`;
    // const { user } = useContext(AuthContext);

    const handleAddBook = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const intern = {
                        bookName: data.bookName,
                        image: imgData.data.url,
                        Writer: data.Writer,
                        Price: data.Price,
                        Publishers: data.Publishers,
                        NumberofPage: data.NumberofPage,
                        BookType: data.BookType,
                        LastUpdate: data.LastUpdate,
                        Description: data.Description,
                    };

                    fetch('http://localhost:5000/postBook', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(intern)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);

                            // Use SweetAlert for a nicer notification
                            Swal.fire({
                                title: 'Added Successfully',
                                icon: 'success',
                                showClass: {
                                    popup: 'animate__animated animate__fadeInDown'
                                },
                                hideClass: {
                                    popup: 'animate__animated animate__fadeOutUp'
                                }
                            });

                            reset();

                            // You can navigate or perform any other actions here
                            navigate('/dashboard/AddBooks');
                        });
                }
            });
    };




    return (
        <div data-aos="zoom-in">
            <h2 className="text-3xl bg-slate-300 text-center p-2">Add Books Here</h2>

            <div className="flex justify-center mt-10 rounded-xl  mx-20 e py-6">
                <form className="" onSubmit={handleSubmit(handleAddBook)}>

                    <section className="flex gap-5">
                        <div className="">
                            <label className=""> <span className="">Book Name</span></label> <br />
                            <textarea type="text" {...register("bookName", {
                                required: "Required"
                            })} className="input input-bordered w-96 a" />
                        </div>
                        <div className="">
                            <label className=""> <span className="">Add Picture</span></label> <br />
                            <input type="file" {...register("image", {
                                required: "Image is Required"
                            })} className="input input-bordered w-96 a" />
                        </div>
                    </section>

                    <section className="flex gap-5">
                        <div className="">
                            <label className=""> <span className="">Writer</span></label> <br />
                            <textarea type="text" {...register("Writer", {
                                required: "Required"
                            })} className="input input-bordered w-96 a" />
                        </div>
                        <div className="">
                            <label className=""> <span className="">Price</span></label> <br />
                            <textarea type="text" {...register("Price", {
                                required: "Required"
                            })} className="input input-bordered w-96 a" />
                        </div>
                    </section>

                    <section className="flex gap-5">
                        <div className="">
                            <label className=""> <span className="">Publishers</span></label> <br />
                            <textarea type="text" {...register("Publishers", {
                                required: "Required"
                            })} className="input input-bordered w-96 a" />
                        </div>
                        <div className="">
                            <label className=""> <span className="">Number of Page</span></label> <br />
                            <input type="number" {...register("NumberofPage", {
                                required: "Required"
                            })} className="input input-bordered w-96 a" />
                        </div>
                    </section>

                    <section className="flex gap-5">
                        <div className="">
                            <label className=""> <span className="">Book Type</span></label> <br />
                            <select
                                {...register('BookType')}
                                className="w-96 input input-bordered a">
                                {<option>Fiction</option>}
                                {<option>Biography</option>}
                                {<option>Mystery</option>}
                                {<option>Science</option>}
                                {<option>Story</option>}
                                {<option>Poetry</option>}
                            </select>
                        </div>
                        <div className="">
                            <label className=""> <span className="">Last Update</span></label> <br />
                            <input type="text" {...register("LastUpdate", {
                                required: "Required"
                            })} className="input input-bordered w-96 a" />
                        </div>
                    </section>

                    <div className="mt-4">
                        <label className=""> <span className="">Description</span></label> <br />
                        <textarea type="text" {...register("Description", {
                            required: "Required"
                        })} className="input input-bordered w-full h-24 a" />
                    </div>


                    <input className='btn btn-accent w-full mt-4' value="Add Book" type="submit" />
                </form>
            </div>

        </div>
    );
};

export default AddBooks;
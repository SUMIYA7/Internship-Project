




import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import AuthorDetails from "./AuthorDetails";

const ManageAuthor = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const imageHostKey = `771e92fe5bf3b4553445891d6b44f4a1`;
    // const { user } = useContext(AuthContext);

    const handleAdd = data => {
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
                        AuthorName: data.AuthorName,
                        image: imgData.data.url,
                    };

                    fetch('http://localhost:5000/postAuthor', {
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
                            navigate('/dashboard/ManageAuthor');
                        });
                }
            });
    };




    return (
        <div data-aos="zoom-in">
            <h2 className="text-3xl bg-slate-300 text-center p-2">Add Author</h2>

            <div className="flex justify-center mt-10 rounded-xl  mx-20 e py-6">
                <form className="" onSubmit={handleSubmit(handleAdd)}>

                    <section className="">
                        <div className="">
                            <label className=""> <span className="">Author Name</span></label> <br />
                            <textarea type="text" {...register("AuthorName", {
                                required: "Required"
                            })} className="input input-bordered w-96 a" />
                        </div>
                        <div className="mt-5">
                            <label className=""> <span className="">Add Author Image</span></label> <br />
                            <input type="file" {...register("image", {
                                required: "Image is Required"
                            })} className="input input-bordered w-96 a" />
                        </div>
                    </section>
                    <input className='btn btn-accent w-full mt-4' value="Add Author" type="submit" />
                </form>
            </div>
            <div className="mt-20 m-8 e rounded-2xl">
                <AuthorDetails/>
            </div>
        </div>
    );
};

export default ManageAuthor;
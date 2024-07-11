
import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import logo from "../../assets/Image/a.png"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { MdInsertLink } from "react-icons/md";
import { Link } from 'react-router-dom';

const ContactCard = () => {
    const { register, handleSubmit,  } = useForm();
    // const navigate = useNavigate();

    const handleAddMessage = data => {
        const certificateData = {
            YourName: data.YourName,
            PhoneNumber: data.PhoneNumber,
            Email: data.Email,
            Message: data.Message,
        };

        fetch('http://localhost:5000/message', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(certificateData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    window.location.reload();
                });
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                });
            });
    };

    return (
        <div data-aos="fade-up" data-aos-duration="2000" className='flex justify-center items-center gap-20 bg-emerald-200 p-5 mx-40 mt-32 e rounded-2xl' >
            
            <div className='text-center'>
                
                <div className='bg-white p-2 rounded-lg e'>
                    <p className='font-bold text-xl text-emerald-600 mb-2'>Contact Us</p>
                    <img className='h-56 w-56 rounded-lg' src={logo} alt="" />

                    <div className='flex justify-center items-center gap-5 my-2'>
                        <Link target="_blank" to="https://www.facebook.com/groups/1673292646267918/?hoisted_section_header_type=recently_seen&multi_permalinks=2768420733421765" className='e p-2 rounded-full bg-red-200 hover:bg-red-300'><FaFacebook /></Link>
                        <Link target="blank" to="https://www.ictexpertbd.com/" className='e p-2 rounded-full bg-red-200 hover:bg-red-300'><FaInstagram /></Link>
                        <Link target="blank" to="https://www.linkedin.com/company/ipit-ltd/" className='e p-2 rounded-full bg-red-200 hover:bg-red-300'><RiLinkedinFill /></Link>
                        <Link target="blank" to="https://ipitltd.com/" className='e p-2 rounded-full bg-red-200 hover:bg-red-300'><MdInsertLink /></Link>
                    </div>

                </div>
            </div>

            <div>
                <div>
                    <form onSubmit={handleSubmit(handleAddMessage)}>
                        <section className="">
                            <div className="">
                                <label className=""> <span className="">Your Name</span></label> <br />
                                <textarea type="text" {...register("YourName", {
                                    required: "Required"
                                })} className="input border-2 border-slate-400  w-96" />
                            </div>

                            <div className="">
                                <label className=""> <span className="">Phone Number</span></label> <br />
                                <textarea type="text" {...register("PhoneNumber", {
                                    required: "Required"
                                })} className="input border-2 border-slate-400  w-96" />
                            </div>

                            <div className="">
                                <label className=""> <span className="">Email</span></label> <br />
                                <textarea type="text" {...register("Email", {
                                    required: "Required"
                                })} className="input border-2 border-slate-400  w-96" />
                            </div>

                            <div className="">
                                <label className=""> <span className="">Message</span></label> <br />
                                <textarea type="text" {...register("Message", {
                                    required: "Required"
                                })} className="input border-2 border-slate-400  w-96 h-20" />
                            </div>
                        </section>
                        <div className='flex justify-center'>
                            <input className='btn btn-active btn-neutral w-40 mt-4 ' value="Sent" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default ContactCard;

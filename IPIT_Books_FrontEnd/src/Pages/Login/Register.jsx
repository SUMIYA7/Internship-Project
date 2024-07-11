import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigation = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);

            updateUserProfile(data.name)
            .then(()=> {
                const saveUser = { name: data.name, email: data.email, password: data.password, role: 'user'}
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json' 
                    },
                    body: JSON.stringify(saveUser)
                })
                .then(res=> res.json())
                .then (data=> {
                    if ( data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'User Registration Completed',
                            timer: 1500
                        });
                        navigation('/')
                    }
                })
            })
        })
    }


    return (
        <div className="hero min-h-screen ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                
                <div className="card border-2 border-white e w-96  bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"  {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text--red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn e btn-success" type="submit" value="Sign Up" />
                        </div>
                        <p><small>Already have an account <Link to="/login"><small className="text-blue-700 font-bold">Login</small></Link></small></p>
                    </form>
                    <SocialLogin/>
                </div>
            </div>
        </div>
    );
};

export default Register;

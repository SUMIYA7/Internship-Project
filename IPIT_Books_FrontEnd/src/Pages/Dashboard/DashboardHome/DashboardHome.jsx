
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";


const DashboardHome = () => {

    const { user } = useContext(AuthContext)
    // console.log(user.email)

    const [userData, setUserData] = useState([]);
    useEffect(() => {
        // Fetch user data from the API
        axios.get(`http://localhost:5000/email?email=${user?.email}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [user?.email]);
    console.log(userData)

    return (
        <div className="" data-aos="zoom-in">
            {userData.map(b => <div
                key={b._id}
            >
                <div className="d rounded-lg font-bold flex flex-col justify-center items-center p-10 m-10 bg-slate-300">
                    <p>Name: {b.name}</p>
                    <p>Email: {b.email}</p>
                    <p className="text-emerald-600">Role: {b.role}</p>
                </div>
            </div>)}
        </div>
    );
};

export default DashboardHome;
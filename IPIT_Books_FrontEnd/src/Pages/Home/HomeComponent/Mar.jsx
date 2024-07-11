import Marquee from "react-fast-marquee";

import './HomeComponent.css'
import Title from "../../../ReuseableComponents/Title";
import { useEffect, useState } from "react";

const Mar = () => {

    const [a, setA] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch("http://localhost:5000/AllAuthors")
            .then(response => response.json())
            .then(data => setA(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div className="mt-10 author-image a pt-1">
        <Title a="Our Top Authors"/>
            <Marquee>
                {a.map((b) => (
                    <div className="flex flex-col justify-center items-center my-10" key={b._id}>
                        <img className="e" src={b.image} alt="" />
                        <p className="mt-2">{b.AuthorName}</p>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Mar;
import Title from "../../../ReuseableComponents/Title";
import ipit from "../../../assets/Partnership/ipit.png"
import ict from "../../../assets/Partnership/ict.png"
import { Link } from "react-router-dom";

const Partnership = () => {
    return (
        <div className="bg-slate-100 pb-5 pt-1 e mt-10">
            <Title a="Our Partnership With"/>

            <div className="flex justify-center gap-20 mt-10">
                <Link target="_blank" to='https://ipitltd.com/'>
                    <div data-aos="fade-right" data-aos-duration="2000" className="flex flex-col justify-center items-center">
                        <img className="w-40 h-40 rounded-full e p-4" src={ipit} alt="" />
                        <p className="mt-3 font-bold">IPIT Limited</p>
                    </div>
                </Link>
                
                <Link target="_blank" to='https://www.ictexpertbd.com/'>
                    <div data-aos="fade-left" data-aos-duration="2000" className="flex flex-col justify-center items-center">
                        <img className="w-40 h-40 rounded-full e p-4" src={ict} alt="" />
                        <p className="mt-3 font-bold">ICT Expert</p>
                    </div>
                </Link>
            </div>

        </div>
    );
};

export default Partnership;
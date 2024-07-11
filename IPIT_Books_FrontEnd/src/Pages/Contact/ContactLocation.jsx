import { MdEmail, MdOutlineLink } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const ContactLocation = () => {
    return (
        <div className="flex e justify-evenly items-center mt-10 bg-slate-100 py-6">
            <div data-aos="fade-right" data-aos-duration="2000">
                <iframe
                    className="w-[600px] h-96 rounded-xl e p-1 bg-red-200"
                    title="Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.394743401416!2d91.18156031498266!3d23.455698684736767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750a76711ae09d1%3A0x4db12670a45270c3!2sChittagong%20University%20of%20Engineering%20%26%20Technology%20(CUET)!5e0!3m2!1sen!2sbd!4v1640321774851!5m2!1sen!2sbd"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            <div data-aos="fade-left" data-aos-duration="2000" className="text-md">
                <p className="flex justify-start items-center gap-3 font-semibold"><MdEmail /> ipitltd@gmail.com</p>
                <p className="flex justify-start items-center gap-3 font-semibold"><FaPhoneAlt /> +8801312-010261</p>
                <p className="flex justify-start items-center gap-3 font-semibold"><MdOutlineLink /> https://ipitltd.com</p>
                <p className="flex justify-start items-center gap-3 font-semibold"><MdOutlineLink /> https://www.ictexpertbd.com</p>
            </div>
        </div>
    );
};

export default ContactLocation;

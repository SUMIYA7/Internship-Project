import ContactCard from "../Contact/ContactCard";
import BestSelling from "./HomeComponent/BestSelling";
import HomeFaq from "./HomeComponent/HomeFaq";
import ImageHover from "./HomeComponent/ImageHover";
import Mar from "./HomeComponent/Mar";
import Par from "./HomeComponent/Par";
import TransitionImage from "./HomeComponent/TransitionImage";


const Home = () => {
    return (
        <div>
            <div data-aos="zoom-in" data-aos-duration="2000">
                <TransitionImage />
            </div>

            <Par />
            <div data-aos="zoom-out" data-aos-duration="1000" className="bg-slate-100 pb-8 pt-1">
                <BestSelling />
            </div>
            <div data-aos="zoom-in" data-aos-duration="2000">
                <Mar />
            </div>
            <HomeFaq/>
            <ImageHover/>
            
            <div data-aos="zoom-in">
                <ContactCard />
            </div>
        </div>
    );
};

export default Home;
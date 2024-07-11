import { Parallax } from "react-parallax";
import image1 from "../../../assets/Book/h.jpg";

const Par = () => {
    return (
        <div className='my-28'>
            <Parallax
                blur={{ min: -50, max: 40 }}
                bgImage={image1}
                bgImageAlt="Img"
                strength={200}
                className="parallax-container"
            >
                <div className="parallax-content">
                    <div className="hero h-screen flex items-center justify-center">
                        <div className="hero-overlay bg-black bg-opacity-60 absolute inset-0"></div>
                        <div className="hero-content text-neutral-content z-10">
                            <div className="">
                                <h1 className="mb-4 text-3xl font-bold uppercase">IPIT Books</h1>
                                <p className="mb-2"><b>
                                    IPIT Books is a premier online destination for book enthusiasts, offering a curated collection of literature across various genres. As a book selling website, IPIT Books prides itself on providing customers with a seamless shopping experience, featuring an extensive catalog of both popular bestsellers and niche titles.
                                    Founded and operated by IPIT Limited, a renowned name in the realm of technology and innovation, IPIT Books embodies a commitment to excellence and customer satisfaction. With a passion for literature and a dedication to fostering a love for reading, IPIT Books endeavors to connect readers with captivating stories, insightful knowledge, and enriching experiences through the world of books.
                                    At IPIT Books, customers can explore a diverse range of genres, including fiction, non-fiction, biographies, self-help, academic texts, and more. The website is designed to cater to the preferences and interests of readers of all ages and backgrounds, ensuring that there is something for everyone.
                                </b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Parallax>
        </div>
    );
};

export default Par;

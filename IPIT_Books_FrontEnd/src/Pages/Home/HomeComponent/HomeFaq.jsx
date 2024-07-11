import Faq from "../../../ReuseableComponents/Faq";
import Title from "../../../ReuseableComponents/Title";


const HomeFaq = () => {
    return (
        <div className="mt-28">
            <Title a="Some Frequently Asked Questions / FAQ" />
            <div className="mt-10">
                <div data-aos="fade-right">
                    <Faq
                        q="What is IPIT Books?"
                        a="IPIT Books is an online book-selling platform operated by IPIT Limited, offering a wide range of books across various genres, including fiction, non-fiction, academic, and more."
                    />
                </div>

                <div data-aos="fade-left">
                    <Faq
                        q="How can I purchase books from IPIT Books?"
                        a="To purchase books from IPIT Books, you can visit our website and browse through the available categories or use the search feature to find specific titles. Once you've selected the books you want to purchase, simply add them to your cart and proceed to checkout. You can then choose your preferred payment method and complete your purchase securely."
                    />
                </div>
                <div data-aos="fade-right">
                    <Faq
                        q="Does IPIT Books offer international shipping?"
                        a="Yes, IPIT Books offers international shipping to many countries worldwide. During the checkout process, you'll have the option to select your shipping destination, and shipping costs will be calculated based on your location."
                    />
                </div>
                <div data-aos="fade-left">
                    <Faq
                        q="Are the books on IPIT Books brand new or used?"
                        a="The majority of books available on IPIT Books are brand new, unless otherwise specified. We take pride in offering high-quality, new books to our customers to ensure an enjoyable reading experience."
                    />
                </div>
                <div data-aos="fade-right">
                    <Faq
                        q="Does IPIT Books offer any discounts or promotions?"
                        a="Yes, IPIT Books frequently runs promotions and offers discounts on select books or during special occasions. Be sure to check our website regularly or subscribe to our newsletter to stay updated on the latest promotions and offers."
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeFaq;
/* eslint-disable react/prop-types */


const Faq = ({ q, a }) => {
    return (
        <div className="mx-40 mt-1">
           


            <div className="collapse collapse-plus bg-base-200 border-2 border-white">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                    {q}
                </div>
                <div className="collapse-content">
                    {a}
                </div>
            </div>
        


        </div>
    );
};

export default Faq;
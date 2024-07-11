/* eslint-disable react/prop-types */
const Title = ({ a, b }) => {
    return (
        <div>
            <h1 className={`text-center my-4 mt-10 font-bold text-2xl ${b === 'red' ? 'text-red-500' : 'text-emerald-400'}`}>
                <span className={`w-96 e rounded-md ${b === 'red' ? 'bg-red-200' : 'bg-emerald-50'}  px-4`}>{a}</span>
            </h1>
        </div>
    );
};

export default Title;

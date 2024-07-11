
import BarC from './ChartsForBooks/BarC';
import LineC from './ChartsForBooks/LineC';
import OrderChart from './ChartsForBooks/OrderChart';
import PieC from './ChartsForBooks/PieC';

const Stats = () => {
    return (
        <div>
            <div className='flex h-96 justify-center items-center bg-emerald-50'>
                <PieC />
            </div>
            <div className='flex justify-center items-center '>
                <BarC />
                <LineC />
            </div>

            <OrderChart/>
            
        </div>
    );
};

export default Stats;

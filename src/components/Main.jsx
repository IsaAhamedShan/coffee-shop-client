
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='bg-[#F4F3F0]'>
            <Header></Header>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Main;
import Header from "../components/NavBarMain";
import Footer from "../components/FooterMain";
import { Outlet } from 'react-router-dom';

function BaseLayout() {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default BaseLayout;
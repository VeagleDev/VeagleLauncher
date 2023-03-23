import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar';
import Popup from './Popup';

function Layout() {
    
    return (
        <div>
            <Sidebar />
            {/* <Popup /> */}
            <Outlet />
        </div>
    );
}
  
export default Layout;
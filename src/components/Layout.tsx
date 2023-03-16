import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar';

function Layout() {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    );
}
  
export default Layout;
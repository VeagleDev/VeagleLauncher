import { Link, NavLink } from 'react-router-dom';
import DefaultPP from '../assets/img/base_pp.jpg';
import Icon from './Icon' 

import appsI from '../assets/icons/apps.txt'
import shopI from '../assets/icons/shop.txt'
import searchI from '../assets/icons/search.txt'
import downloadI from '../assets/icons/download.txt'
import settingsI from '../assets/icons/settings.txt'

function Sidebar() {
    return (
        <div className="fixed h-screen w-sidebar flex flex-col">
            <div className="absolute inset-0 z-0 bg-black opacity-30 backdrop-blur-sm w-full h-full"></div>

            <div className="z-10 flex flex-col justify-between items-center">
                <button className="rounded-full overflow-hidden w-50 h-50 mt-10">
                    <img src={DefaultPP} alt="profile picture"/>
                </button>

                <nav>
                    <NavLink to="/">
                        <Icon path={appsI} />
                    </NavLink>

                    <NavLink to="/">
                        <Icon path={shopI} />
                    </NavLink>

                    <NavLink to="/">
                        <Icon path={searchI} />
                    </NavLink>

                    <NavLink to="/">
                        <Icon path={downloadI} />
                    </NavLink>

                    <NavLink to="/">
                        <Icon path={settingsI} />
                    </NavLink>
                </nav>

                <div>
                </div>
            </div>
        </div>
    );
}
  
export default Sidebar;
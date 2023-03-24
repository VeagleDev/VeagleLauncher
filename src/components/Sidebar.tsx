import {NavLink} from 'react-router-dom';
import DefaultPP from '../assets/img/base_pp.jpg';
import Icon from './Icon'

import appsI from '../assets/icons/apps.txt'
import shopI from '../assets/icons/shop.txt'
import searchI from '../assets/icons/search.txt'
import downloadI from '../assets/icons/download.txt'
import settingsI from '../assets/icons/settings.txt'

function Sidebar() {
    return (
        <div className="fixed h-screen w-sidebar flex flex-col z-sidebar bg-black/50 backdrop-blur-md">
            <div className="z-40 flex flex-col justify-between items-center h-full">
                <button className="rounded-full overflow-hidden w-40 h-40 mt-10">
                    <img src={DefaultPP} alt="profile picture"/>
                </button>

                <nav className="flex flex-col items-center flex-wrap space-y-40">
                    <NavLink to="/">
                        <Icon path={appsI} color="auto" />
                    </NavLink>

                    <NavLink to="/">
                        <Icon path={shopI} color="auto"/>
                    </NavLink>

                    {/*<NavLink to="/">*/}
                    {/*    <Icon path={searchI} color="auto"/>*/}
                    {/*</NavLink>*/}

                    {/*<NavLink to="/">*/}
                    {/*    <Icon path={downloadI} color="auto"/>*/}
                    {/*</NavLink>*/}

                    {/*<NavLink to="/Connexion">*/}
                    {/*    <Icon path={settingsI} color="auto"/>*/}
                    {/*</NavLink>*/}
                </nav>

                <div className="w-50 h-50 mb-10"></div>
            </div>
        </div>
    );
}
  
export default Sidebar;
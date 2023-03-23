import { useState } from "react";
import Icon from './Icon'
import CloseI from '../assets/icons/close.txt'

interface InstallStatus {
    name?: string;
    gameId?: number;
    status?: string;

    message?: string;

    active?: boolean;
    progress?: number;
}

function PopupCard(props:InstallStatus) {
    const [effect, setEffect] = useState(false);
    const [show, setShow] = useState(false);

    return (
        <button
        className={`${effect && "animate__animated animate__fadeOutRight animate__faster"} ${show && "hidden"} w-full h-[70px] mt-10 rounded-2xl z-50 bg-gray/60 backdrop-blur-xl text-left flex justify-center items-center transition-all duration-500`}
        onAnimationEnd={() => setShow(true)}
        >
            <div className="w-[90%] h-[70%] flex flex-col justify-between">
                <div className="flex justify-between">
                    <h2 className="text-[15px] font-[300]">{props.status}</h2>
                    <button onClick={() => {setEffect(true)}}>
                        <Icon path={CloseI} color="#FFFFFF" size={15} />
                    </button>
                </div>
                <div className="flex justify-between">
                    <p className="font-thin text-[14px] leading-5">{props.name}</p>
                    <p className="font-thin text-[14px] leading-5 text-[#aeaeae]">{props.progress}%</p>
                </div>
                <div className="w-[calc(100%)] h-[4px] bg-primary-bg rounded-full overflow-hidden">
                    <div className="bg-blue h-full" style={{width: `${props.progress}%`}}></div>
                </div>
            </div>
        </button>
    );
}
  
export default PopupCard;
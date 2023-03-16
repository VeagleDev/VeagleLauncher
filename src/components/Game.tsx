import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import downloadI from '../assets/icons/download.txt'
import starI from '../assets/icons/star.txt'

function Game() {
    const location = useLocation()
    const { key } = location.state

    return (
        <div className="absolute top-0 right-0 w-[calc(100%-theme(space.sidebar))] h-full flex items-center">
                <div className="absolute top-0 pl-40 w-[calc(100%-350px-80px)] h-auto">
                    <h2 className="text-[60px] mt-20 mb-10 leading-none">{key.name}</h2>
                    <div className="flex gap-2">
                        <div className="inline-flex bg-gray py-[3px] pl-[6px] mb-20 pr-10 rounded-full shadow-btn shadow-black">
                            <div className="mr-1 scale-[80%]">
                                    <Icon path={downloadI} color="#FFFFFF" />
                            </div>
                            <p className="font-normal">{key.installations}</p>
                        </div>
                        <div className="inline-flex bg-gray py-[3px] pl-[6px] mb-20 pr-10 rounded-full shadow-btn shadow-black">
                            <div className="mr-1 scale-[80%]">
                                    <Icon path={starI} color="#FFFFFF" />
                            </div>
                            <p className="font-normal">{key.rate}</p>
                        </div>
                    </div>
                    <img src={key.background} alt="" className="w-[calc(100%-20px)]" />
                    <p className="my-20 mr-20 text-base font-primary font-normal">{key.description}</p>
                    <p className="my-20 mr-20 text-base font-primary font-normal">{key.description}</p>
                    <p className="my-20 mr-20 text-base font-primary font-normal">{key.description}</p>
                </div>  

                <div className="fixed w-[350px] h-[650px] right-40">
                    <img src={key.icon} alt="" className="w-[100%] h-[450px] object-cover object-top"/>

                    <div className="flex flex-col justify-between">
                        <button className="w-full h-[50px] bg-gradient-to-r from-orange to-dark-orange font-normal rounded my-20 uppercase tracking-wide">
                            <span className="text-[16px]">Télécharger</span>
                        </button>

                        <button className="w-full h-[50px] border font-normal rounded mb-20 uppercase tracking-wider">
                            <span className="text-[16px]">Site officiel</span>
                        </button>
                    </div>

                    <div className="flex justify-between">
                        <button className="w-[165px] h-[30px] border font-normal rounded mb-20 uppercase tracking-wider">
                            <p className="text-[12px]">Partager</p>
                        </button>

                        <button className="w-[165px] h-[30px] border font-normal rounded mb-20 uppercase tracking-wider">
                            <p className="text-[12px]">Laissez un avis</p>
                        </button>
                    </div>  
                </div>
        </div>
    );
}
  
export default Game;
import {useState} from "react";

declare const api: any;

import {useLocation} from 'react-router-dom'
import Icon from './Icon'
import downloadI from '../assets/icons/download.txt'
import starI from '../assets/icons/star.txt'
import ProgressBlock from "./ProgressBar";

function Game() {
    const location = useLocation()
    const { key } = location.state

    const [progress, setProgress] = useState(false);

    // @ts-ignore
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
                            <p className="font-normal">5.0</p>
                        </div>
                    </div>
                    <img src={key.background} alt="" className="w-[calc(100%-20px)] rounded" />
                    <p className="my-20 mr-20 text-xl font-primary font-normal">{key.description}</p>
                </div>  

                <div className="fixed w-[350px] h-[650px] right-40">
                    <img src={key.icon} alt="" className="w-[100%] h-[450px] object-cover object-top rounded"/>

                    <div className="flex flex-col justify-between">
                        <button className="w-full h-[50px] bg-gradient-to-r from-orange to-dark-orange font-normal rounded my-20 uppercase tracking-wide" onClick={() => {


                            console.log("Téléchargement de " + key.name);
                            console.log("Identifiant: " + key.id);

                            setProgress(true);

                            console.log("Début du téléchargement");
                            api.installGame(key.id)
                                .then((res: any) => {
                                    console.log("Téléchargement terminé");
                                    console.log(res);
                                })
                                .catch((err: any) => {
                                    console.log("Erreur lors du téléchargement");
                                    console.log(err);
                                });
                        }
                        }>
                            <span className="text-[16px]">Télécharger</span>
                        </button>

                        <div className={progress ? "" : "hidden"}>
                            <ProgressBlock state="downloading" percentage={53} />
                        </div>

                        <button disabled={true} className="w-full h-[50px] border font-normal rounded mb-20 uppercase tracking-wider tracking-wider hover:outline-none hover:bg-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" >
                            <span className="text-[16px]">Site officiel</span>
                        </button>
                    </div>

                    <div className="flex justify-between">
                        <button disabled={true} className="w-[165px] h-[30px] border font-normal rounded mb-20 uppercase tracking-wider tracking-wider hover:outline-none hover:bg-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" >
                            <p className="text-[12px]">Partager</p>
                        </button>

                        <button disabled={true} className="w-[165px] h-[30px] border font-normal rounded mb-20 uppercase tracking-wider tracking-wider hover:outline-none hover:bg-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" >
                            <p className="text-[12px]">Laissez un avis</p>
                        </button>
                    </div>  
                </div>
        </div>
    );
}
  
export default Game;
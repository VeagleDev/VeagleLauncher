import {useState} from "react";

declare const api: any;

import {useLocation} from 'react-router-dom'
import Icon from './Icon'
import downloadI from '../assets/icons/download.txt'
import starI from '../assets/icons/star.txt'
import InstallStatus from "../lib/interfaces/gamemanagerinterfaces";
import DownloadBox from "./DownloadBox";
import {setGameInstalled} from "./Library";

let latestNews:any = [];

let percentage = 0;
let step = "starting";

function Game() {
    const location = useLocation()
    const key = location.state.game;

    const gameId = key.id;


    for(const game of latestNews)
    {
        if(game.gameId == gameId)
        {
            percentage = game.progress;
            step = game.status;
        }
    }

    const [progress, setProgress] = useState("disabled");
    const [infos, setInfos] = useState([]);

    function getUpdates(news: InstallStatus[])
    {
        if(news != latestNews)
        {
            latestNews = news;
            for(const game of latestNews)
            {
                if(game.gameId == key.id)
                {
                    step = game.status;
                    percentage = game.progress;
                    setProgress("enabled");

                }
            }
            setInfos(latestNews);
        }        
    }

    api.setInstallListener(getUpdates);

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

                    <div className="flex flex-col justify-between" >
                        <button id="launchGame" className="launchGame w-full h-[50px] bg-gradient-to-r from-orange to-dark-orange font-normal rounded my-20 uppercase tracking-wide transition-all duration-500" onClick={() => {

                            if(key.installed)
                            {
                                // set a greyscale and change the text to "Chargement" and disable the button
                                const launchGame = document.getElementById("launchGame");
                                launchGame.style.filter = "grayscale(100%)";
                                launchGame.style.cursor = "not-allowed";
                                launchGame.innerHTML = "Lancement";
                                // make a 3 dots animation
                                let dots = 0;

                                const interval = setInterval(() => {
                                    if(dots < 3)
                                    {
                                        launchGame.innerHTML += ".";
                                        dots++;
                                    }
                                    else
                                    {
                                        launchGame.innerHTML = "Lancement";
                                        dots = 0;
                                    }
                                }, 1000);

                                api.launchGame(key.id)
                                    .then((res: any) => {
                                        launchGame.style.filter = "none";
                                        launchGame.style.cursor = "pointer";
                                        launchGame.innerHTML = "Lancer";
                                        clearInterval(interval);
                                    })
                                    .catch((err: any) => {
                                        launchGame.style.filter = "none";
                                        launchGame.style.cursor = "pointer";
                                        launchGame.innerHTML = "Erreur lors du lancement";
                                        clearInterval(interval);
                                        console.log("Erreur lors du lancement : ", err);
                                    });
                            }
                            else
                            {
                                setProgress("enabled");

                                api.installGame(key.id)
                                    .then((res: any) => {
                                        key.installed = true;
                                        setGameInstalled(key.id, true);

                                        setProgress("finished");
                                    })
                                    .catch((err: any) => {
                                        console.log("Erreur lors du téléchargement");
                                        console.log(err);
                                        setProgress("error");
                                    });
                            }

                        }
                        }>
                            <span className="text-[16px]">{key.installed ? "Lancer" : "Télécharger"}</span>
                        </button>

                        <div className={(progress === "disabled") ? "hidden" : ""}>
                            <DownloadBox informations={{"step": step, "percentage": percentage}} />
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
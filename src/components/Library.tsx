import Landing from './Landing'
import Carousel from './Carousel';
import {useState} from "react";

let Data: any = {"ressources": []};
let setState = (state: any) => { return state; };
export function setGameInstalled(id: number, installed: boolean) {
    Data.ressources.forEach((element: any) => {
        if(element.id === id)
        {
            element.installed = installed;
        }
    });
    setState(true);
}

function Library(props: any = undefined) {
    const [, setInstalled] = useState(false);
    setState = setInstalled;

    if (!props) { /* empty */ }
    else
    {
        const ressources = {"ressources": props.games.games};
        Data = ressources;
        console.log(Data);
    }


    return (
        <div>
            <Landing landingImg="https://cdn.gamekult.com/optim/images/news/30/3050849819/forza-horizon-5-a-rassemble-plus-de-20-millions-de-joueurs-sept-mois-apres-sa-sortie-4c2118c9__1920_1080__1-384-1883-992.jpg" />
            {/* @ts-ignore*/}
            <Carousel informations={Data} filter="popular"/>
            {/* @ts-ignore*/}
            <Carousel informations={Data} filter="installed"/>
            {/* @ts-ignore*/}
            <Carousel informations={Data} filter="recent"/>
        </div>
    );
}
  
export default Library;
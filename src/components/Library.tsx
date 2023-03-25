import Landing from './Landing'
import Carousel from './Carousel';
import CardCarousel from './CardCarousel';

let Data: any = {"ressources": []};

function Library(props: any = undefined) {
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
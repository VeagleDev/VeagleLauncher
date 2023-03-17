import {Link} from 'react-router-dom';
import videoBg from '../assets/img/forza.webm';


function Landing(props:any) {
    return (
        <div className="relative h-screen w-full">
            <div className="absolute h-screen w-full z-[0] bg-black-trans"></div>
            <div className="absolute h-screen w-full z-bg bg-no-repeat bg-cover bg-top flex justify-center items-center" style={{ backgroundImage: `url(${props.landingImg})` }}>
                <video src={videoBg} autoPlay loop muted className="object-cover w-full h-full"/>
            </div>
            <div className="absolute w-full h-[400px] bottom-0 translate-y-1/2 bg-gradient-to-t from-primary-bg via-primary-bg to-transparent"></div>
            <div className="ml-[82px] z-50 absolute top-[40%] -translate-y-1/2 mb-[200px]">
                <h1 className="text-[8vw]">Forza Horizon 5</h1>
                <p className="w-paragraphe max-w-[700px] text-base">Forza Horizon 5 est un jeu de course en monde ouvert développé par Playground Games. Il prend place dans les villes et magnifiques décors du Mexique.</p>
                
                <div className="flex mt-40">
                    <Link to="/Game" className="w-button h-50 flex items-center justify-center rounded-full bg-gradient-to-r from-orange to-dark-orange shadow-btn shadow-black mr-[20px]">
                        <span>Télécharger</span>
                    </Link>

                    <Link to="/Game" className="w-button h-50 flex items-center justify-center rounded-full border border-orange shadow-btn shadow-black backdrop-blur-sm">
                        <span>En savoir plus</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
  
export default Landing;
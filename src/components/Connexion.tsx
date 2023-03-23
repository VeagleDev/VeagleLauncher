import { useState } from "react";
import bg from "../assets/img/fh5_template.jpg";


function Connexion() {
    const [focusE, setFocusE] = useState(false);
    const [focusP, setFocusP] = useState(false);

    return (
        <div className="absolute w-full h-full flex items-center justify-around">
            <div className={`absolute z-bg w-full h-full flex items-center justify-around bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(${bg})` }}></div>
            <div className="absolute h-screen w-full z-bg bg-black-trans"></div>
            <p className="w-[300px]">Connectez-vous avec votre compte Veagle-Connect ou Créez votre compte.</p>

            <div className="max-h-[550px] h-[90%] w-[450px] bg-white rounded-xl p-[40px]">
                <h2 className="text-black text-2xl font-extrabold mb-10">Connexion</h2>
                <p className="font-normal text-[16px] text-black">
                    Pas encore membre ?
                    <button className="text-blue ml-1 hover:underline">Créez un compte</button>
                </p>
                <div className={`
                w-full mt-40 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] 
                after:origin-center after:transition-transform after:duration-200 after:bg-blue 
                ${focusE && "after:scale-x-100"} ${!focusE && "after:scale-x-0"}`}>
                    <p className="font-normal text-[14px] opacity-80 text-black leading-none">Adresse Email</p>
                    <input type="text" className="w-full border-b border-b-[#00000026] py-1" onFocus={() => { setFocusE(true) }} onBlur={() => { setFocusE(false) }} />
                </div>

                <div className={`
                w-full mt-40 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] 
                after:origin-center after:transition-transform after:duration-200 after:bg-blue 
                ${focusP && "after:scale-x-100"} ${!focusP && "after:scale-x-0"}`}>
                    <p className="font-normal text-[14px] opacity-80 text-black leading-none">Mot de passe</p>
                    <input type="text" className="w-full border-b border-b-[#00000026] py-1" onFocus={() => { setFocusP(true) }} onBlur={() => { setFocusP(false) }} />
                </div>

                <button className="font-normal text-[14px] bg-blue w-full h-40 rounded-full mt-40 hover:bg-blue hover:bg-opacity-90" >Se connecter</button>
            </div>
        </div>
    );
}
  
export default Connexion;
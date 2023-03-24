import bg from "../assets/img/fh5_template.jpg";
import React, { Component, useState } from "react";
import { Start } from "../lib/login";

export default class Connexion extends Component {


    // when the component is mounted
    componentDidMount() {
        Start();
    }

    componentDidUpdate() {
        Start();
    }

    constructor(props: any) {
        super(props);
        this.state = {
            focusE: false,
            setFocusE: (value: boolean) => { this.setState({ focusE: value }) },
            focusP: false,
            setFocusP: (value: boolean) => { this.setState({ focusP: value }) },
            focusS: false,
            setFocusS: (value: boolean) => { this.setState({ focusS: value }) }
        };
    }

    render()
    {
        // @ts-ignore
        const { focusE, setFocusE, focusP, setFocusP, focusS, setFocusS } = this.state;

        return (
            <div className="absolute w-full h-full flex items-center justify-around">
                <div className={`absolute z-bg w-full h-full flex items-center justify-around bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: `url(${bg})` }}></div>
                <div className="absolute h-screen w-full z-bg bg-black-trans"></div>
                <p className="w-[300px]">Connectez-vous avec votre compte Veagle-Connect ou Créez votre compte.</p>

                <div className="max-h-[550px] h-[90%] w-[450px] bg-white rounded-xl p-[40px]">
                    <h2 className="text-black text-2xl font-extrabold mb-10">Connexion</h2>
                    <p className="font-normal text-[16px] text-black">
                        Pas encore membre ?
                        <button className="text-blue ml-1 hover:underline">Contactez-nous</button>
                    </p>
                    <div className={`
                w-full mt-40 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] 
                after:origin-center after:transition-transform after:duration-200 after:bg-blue 
                ${focusE && "after:scale-x-100"} ${!focusE && "after:scale-x-0"}`}>
                        <p className="font-normal text-[14px] opacity-80 text-black leading-none">Pseudo</p>
                        <input id="pseudo" type="text" className="w-full border-b border-b-[#00000026] py-1" onFocus={() => { setFocusE(true) }} onBlur={() => { setFocusE(false) }} />
                    </div>

                    <div className={`
                w-full mt-40 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] 
                after:origin-center after:transition-transform after:duration-200 after:bg-blue 
                ${focusP && "after:scale-x-100"} ${!focusP && "after:scale-x-0"}`}>
                        <p className="font-normal text-[14px] opacity-80 text-black leading-none">Mot de passe</p>
                        <input type="text" id="password" className="w-full border-b border-b-[#00000026] py-1" onFocus={() => { setFocusP(true) }} onBlur={() => { setFocusP(false) }} />
                    </div>

                    <div className={`
                w-full mt-40 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] 
                after:origin-center after:transition-transform after:duration-200 after:bg-blue 
                ${focusS && "after:scale-x-100"} ${!focusS && "after:scale-x-0"}`}>
                        <p className="font-normal text-[14px] opacity-80 text-black leading-none">Serveur</p>
                        <input type="text" id="server" className="w-full border-b border-b-[#00000026] py-1" defaultValue="https://launcher.veagle.fr" onFocus={() => { setFocusS(true) }} onBlur={() => { setFocusS(false) }} />
                    </div>

                    <div id="errorDisplay" className="text-red-500 font-medium text-center mt-8"></div>

                    <button id="submit" className="font-normal text-[14px] bg-blue w-full h-40 rounded-full mt-40 hover:bg-blue hover:bg-opacity-90" >Se connecter</button>
                </div>
            </div>
        );
    }

}
interface InstallStatus {
    name?: string;
    gameId?: number;
    status?: string;

    message?: string;

    active?: boolean;
    progress?: number;
}

function PopupCard(props:InstallStatus) {
    return (
        <button className="w-full h-[90px] mt-10 rounded-2xl shadow-2xl z-50 bg-black/30 backdrop-blur-2xl text-left flex justify-center items-center transition-all duration-1000">
            <div className="w-[90%] h-[70%] flex flex-col justify-between">
                <h2 className="text-[18px] font-semibold tracking-wide">{props.status}Téléchargement</h2>
                <p className="font-normal text-[16px] leading-5">{props.name}Forza Horizon 5</p>
                <div className="w-[calc(100%)] h-1 bg-primary-bg rounded-full overflow-hidden">
                    <div className="bg-blue h-full" style={{width: `${props.progress}`}}></div>
                </div>
            </div>
        </button>
    );
}
  
export default PopupCard;
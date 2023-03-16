interface Props {
    type: string,
    game?: string,
    message?: string,
    loadingbar?: boolean,
}

function Popup(props:Props) {
    return (
        <div className="fixed right-10 bottom-10 w-[330px] h-[90px] rounded-2xl shadow-2xl z-50 bg-black/50 backdrop-blur-2xl flex justify-center items-center">
            <div className="w-[90%] h-[70%] flex flex-col justify-between">
                <h2 className="text-[18px] font-semibold tracking-wide">{props.type}</h2>
                <p className="font-normal text-[16px] leading-5">{props.game}</p>
                <div className="w-[calc(100%)] h-1 bg-primary-bg rounded-full overflow-hidden">
                    <div className="bg-blue w-[5px] h-full">

                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default Popup;
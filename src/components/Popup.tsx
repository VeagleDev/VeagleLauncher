import PopupCard from "./PopupCard";

function Popup() {
    return (
        <div className="fixed right-10 bottom-10 z-50 bg-orange w-[330px] h-[300px] overflow-hidden inline-flex flex-col-reverse">
            <PopupCard name="1" />
            <PopupCard name="2" />
        </div>
    );
}
  
export default Popup;
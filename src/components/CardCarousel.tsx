function CardCarousel() {
    return (
        <div className="w-[calc(100%-theme(space.sidebar))] h-[600px] ml-sidebar bg-orange">
            <h2 className="pt-60 ml-70 text-xl absolute">Soirée jeux vidéos ?</h2>
            <div className="w-full h-full flex justify-center items-center">
                <div className="inline-block z-10">
                    <div className="w-[500px] h-[250px] bg-blue z-10 translate-x-1/2 rounded-2xl">

                    </div>
                </div>

                <div className="inline-block z-20">
                    <div className="w-[600px] h-[350px] bg-blue z-20 shadow-card shadow-black rounded-2xl">

                    </div>
                </div>

                <div className="inline-block z-10">
                    <div className="w-[500px] h-[250px] bg-blue z-10 -translate-x-1/2 rounded-2xl">

                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default CardCarousel;
import { Component } from "react";
import PopupCard from "./PopupCard";

export default class Popup extends Component {
    constructor(props: any){
        super(props);
        this.state = {
            cards: [
                <div className="inline" onClick={() => {this.addCard()}}> <PopupCard name="1" progress={5} status="Téléchargement" /> </div>,
                <div className="inline"> <PopupCard name="2" progress={10} status="Décompression" /> </div>
            ]
        };

        this.renderCards = this.renderCards.bind(this)
        this.addCard = this.addCard.bind(this)
    }

    public renderCards() {
        // @ts-ignore
        const { cards } = this.state
        if (!cards) return null;
        const result: any[] = [];
        cards.forEach((card: any) => {
            result.push(
                card
            )
        });
        return result;
    }

    addCard() {
        const newCard = <div className="inline animate__animated animate__slideInRight animate__faster">
                            <PopupCard name="3" progress={20} status="YES" />
                         </div>;

        // @ts-ignore
        const cards = [
            ...this.state.cards,
            newCard
        ]
        this.setState({cards});
    }

    render() {
        return (
            <div className="fixed right-10 bottom-10 z-50 w-[280px] h-auto overflow-hidden flex flex-col-reverse bg-none">
                {this.renderCards()}
            </div>
        )
    }
}
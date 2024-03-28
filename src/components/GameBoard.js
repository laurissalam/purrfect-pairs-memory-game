import React, { useEffect } from 'react';
import Card from './Card';

const GameBoard = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const initializedCards = [
            {id: 1, image: 'images/cat1.jpg', isFlipped: false, isMatched: false},
            {id: 2, image: 'images/cat2.jpg', isFlipped: false, isMatched: false},
            {id: 3, image: 'images/cat3.jpg', isFlipped: false, isMatched: false},
            {id: 4, image: 'images/cat4.jpg', isFlipped: false, isMatched: false},
            {id: 5, image: 'images/cat5.jpg', isFlipped: false, isMatched: false},
            {id: 6, image: 'images/cat6.jpg', isFlipped: false, isMatched: false},
        ];
        // TODO: shuffle initializedCards here 
        setCards(initializedCards)
    };

    const shuffleCards = (cardsArray) => {
        for(let i = cardsArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }
        return cardsArray;
    };

    const handleCardClick = (id) => {
        if(flippedCards.length === 2){
            return;
        }

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        // flip the clicked card 
        const updatedCards = cards.map(card => {
            if(card.id === id){
                return { ...card, isFlipped: true };
            }
            return card;
        });
        setCards(updatedCards);
        
        // Check for a match if two cards are flipped 
        if(newFlippedCards.length === 2){
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = updatedCards.find(card => card.id === firstCardId);
            const secondCard = updatedCards.find(card => card.id === secondCardId);

            if(firstCard.image === secondCard.image){
                // It's a match
                setMatchedCards(prev => [...prev, firstCardId, secondCardId]);
                // reset flipped cards 
                setFlippedCards([]);
            }else{
                // not a match, flip them back after a delay
                setTimeout(() => {
                    setCards(cards =>
                        cards.map(card => {
                            if(card.id === firstCardId || card.id === secondCardId){
                                return { ...card, isFlipped: false };
                            }
                            return card;
                        }),
                        );
                setFlippedCards([]);
                }, 1000);
            }
        }

        useEffect(() => {
            if(matchedCards.length === cards.length){
                alert("You have won! You found all matches:)");
                // reset game or restart function here
            }
        }, [matchedCards, cards]);
    };

    return (
        <div className="game-board">
            {cards.map((card) => (
                <Card key={card.id} id={card.id} image={card.image} onCardClick={handleCardClick} />
            ))}
        </div>
    );
};

export default GameBoard;
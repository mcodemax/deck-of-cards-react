import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";


const CardDisplay = () => {
    const [cards, setCards] = useState([]); //future implementation: this in an obj {code/image, rotational position}
    const [deckId, setDeckId] = useState(null);
    const [keepDrawCards, setKeepDrawCards] = useState(false);
    const timerId = useRef();
  
    useEffect(() => {
      async function getNewDeck(){
        try{
          const res = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`); //returns
          if(res.data.success === false) throw new Error('API Error');
          
          // const card = res.data.cards[0].image; //or .code instead of .image if using svg files
          const deckId = res.data.deck_id;
          
          setDeckId(deckId);
          
        }catch(error){
          return alert(error.msg);
        }
      }
      
      getNewDeck();
    }, []);

    useEffect(() => {
        
        if(keepDrawCards === true){
            timerId.current = setInterval(() => {
                drawCard();
            }, 1000)    
        }

        return () => {
            clearInterval(timerId.current);
            timerId.current = null;
        }
    },[keepDrawCards])

    async function drawCard(){
        try{
            const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`); 
            
            if(res.data.remaining === 0){
                setKeepDrawCards(!keepDrawCards)
                throw new Error('Error: no cards remaining!');
            }
            
            if(res.data.success === false) {
                setKeepDrawCards(!keepDrawCards)
                throw new Error('API Error');
            }

            const card = res.data.cards[0].image; //or .code instead of .image if using svg files
            
            setCards(cards => [...cards, card]);
            
        }catch(error){
            return alert(error.message);
        }        
    }

    const toggleCardDraws = () => {
        setKeepDrawCards(!keepDrawCards);
    };
  
    return (
        <div className="CardDisplay">
     
            {(cards.length !== 0) && <Card image={cards[cards.length - 1]}/>}
            

            { keepDrawCards ? 
                <button onClick={toggleCardDraws}>Stop Drawing</button> :
                <button onClick={toggleCardDraws}>Draw Cards</button>
            }
        </div>
    );
};

export default CardDisplay;

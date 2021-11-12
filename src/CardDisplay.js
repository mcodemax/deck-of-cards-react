import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
// import { v4 as uuid } from 'uuid';

const CardDisplay = () => {
    const [cards, setCards] = useState([]); //this in an obj {code, deck_id}
    const [deckId, setDeckId] = useState(null);
  
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
    
    const drawCard = async () => {
      try{
          const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`); 
          
          if(res.data.remaining === 0) throw new Error('Error: no cards remaining!');
          if(res.data.success === false) throw new Error('API Error');

          const card = res.data.cards[0].image; //or .code instead of .image if using svg files
          
          setCards(cards => [...cards, card]);
          
        }catch(error){
          return alert(error.message);
        }
        
    };
  
    return (
        <div className="CardDisplay">
     
            {(cards.length !== 0) && <Card image={cards[cards.length - 1]}/>}
            {console.log(cards.length, deckId)}
            <button onClick={drawCard}>Draw a Card</button>
        </div>
        
        //for part2 maybe do something like: if { deckId && <button onClick={drawCard}>Draw a Card</button> }
    );
};

export default CardDisplay;

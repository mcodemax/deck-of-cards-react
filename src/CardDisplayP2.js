import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
// import { v4 as uuid } from 'uuid';

const CardDisplayP2 = () => {
    const [cards, setCards] = useState([]); //this in an obj {code, deck_id}
    const [deckId, setDeckId] = useState(null);
  
    useEffect(() => {
      async getNewDeck() => {
        try{
          const res = await axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=1`); //returns
          if(res.data.success === false) throw Error('API Error');
          
          const card = res.data.cards[0].image; //or .code instead of .image if using svg files
          const deckId = res.data.deck_id;
          
          setDeckId(deckId);
          setCards(cards => [...cards, card]);
          
        }catch(error){
          return alert(error.msg);
        }
      }
      
      getNewDeck();
    }, []);
    
    const drawCard = () => {
      try{
          const res = await axios.get(`http://deckofcardsapi.com/api/${deckId}/new/draw/?count=1`); //returns
          if(res.data.success === false) throw Error('API Error');
          if(res.data.remaining === 0) throw Error('Error: no cards remaining!');
        
          const card = res.cards[0].image; //or .code instead of .image if using svg files
          
          setCards(cards => [...cards, card]);
          
        }catch(error){
          return alert(error.msg);
        }
    };
  
    return (
        <div className="CardDisplayP2">
     
            <Card image={cards[cards.length - 1]}/>
            <button onClick={drawCard}>Draw a Card</button>
        </div>
        
        //for part2 maybe do something like: if { deckId && <button onClick={drawCard}>Draw a Card</button> }
    );
};

export default CardDisplayP2;

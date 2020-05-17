import React, { Component } from 'react';
import './App.scss';
import Layout from './Layout.js';
import Game from './Game.js';
import { CardGrid, FoundSets } from './GameComponents.js';



class App extends Component {

  constructor(props) {
    super(props);

    this.gameEngine = new Game();

    this.state = {
      cardsInPlay: this.gameEngine.getCardsInPlayIds(), // card IDs for now... need to decide between ids and card objects
      selectedCards: [],
    }
  }

  handleClick(card_id){
    console.log('Finally: Click handled for card: ' + card_id );
    this.setState({
      cardsInPlay: this.gameEngine.getCardsInPlayIds(), // card IDs for now... need to decide between ids and card objects
      selectedCards: this.gameEngine.getSelectedCardIds(),
    });

    if(this.cardIsSelected(card_id)){
      this.removeCardFromSelection(card_id);
    } else {
      this.addCardToSelection(card_id);
    }
  }

  //completeSet(card1_id, card2_id){
  //  return this.gameEngine.completeSet(this.gameEngine.deck.getCardFromId(card1_id), this.gameEngine.deck.getCardFromId(card2_id));
  //}

  addCardToSelection(card_id){
    if(this.state.selectedCards.length < 3){
      let selectedCards = this.state.selectedCards.slice();
      selectedCards.push(card_id);
      this.setSelectedCards(selectedCards);
      if(this.gameEngine.selectedCardsAreASet() && !this.gameEngine.setIsAlreadyFound(selectedCards)){
        this.gameEngine.addSelectedCardsToFoundSets();
        this.setSelectedCards([]);
      }
    }
  }

  removeCardFromSelection(card_id){
    let selectedCards = this.state.selectedCards.slice();
    const index = selectedCards.indexOf(card_id);
    if (index > -1) {
      selectedCards.splice(index, 1);
    }
    this.setSelectedCards(selectedCards);
  }

  setSelectedCards(selectedCards){
    console.log('change state from: ' + this.state.selectedCards+' to: ' + selectedCards);
    this.setState({
      cardsInPlay: this.state.cardsInPlay.slice(),
      selectedCards: selectedCards
    });
    this.gameEngine.selectedCards = selectedCards;
  }

  cardIsSelected(card_id){
//    console.log('Card '+card_id+ ' is selected: '+(this.state.selectedCards.indexOf(card_id) > -1));
    return (this.state.selectedCards.indexOf(card_id) > -1);
  }

  render(){
    console.log('App::render()');
    return (
        <Layout>
          <CardGrid onClick={(id) => this.handleClick(id)} gameEngine={this.gameEngine} />
          <FoundSets gameEngine={this.gameEngine} />
          <div>settings</div>
        </Layout>
    );
  }
}

export default App;

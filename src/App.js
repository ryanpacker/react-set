import React from 'react';
import './App.css';
import Game from './Game.js';

var game = new Game();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        SET
      </header>
      <GameView />
    </div>
  );
}

class GameView extends React.Component {

  constructor(props) {
    super(props);

    var cards = game.deck.drawCards(11);
    cards.push(game.completeSet(cards[9], cards[10]));

    var card_ids = cards.map((card) => {
      return card.base3id;
    });

    game.cardsInPlay = card_ids;

    this.state = {
      cardsInPlay: card_ids, // card IDs for now... need to decide between ids and card objects
      selectedCards: [],
    }
  }

  handleClick(card_id){
    console.log('click handled for card: ' + card_id );
    if(this.cardIsSelected(card_id)){
      this.removeCardFromSelection(card_id);
    } else {
      this.addCardToSelection(card_id);
    }
  }

  //completeSet(card1_id, card2_id){
  //  return game.completeSet(game.deck.getCardFromId(card1_id), game.deck.getCardFromId(card2_id));
  //}

  addCardToSelection(card_id){
    if(this.state.selectedCards.length < 3){
      let selectedCards = this.state.selectedCards.slice();
      selectedCards.push(card_id);
      this.setSelectedCards(selectedCards);
      if(game.selectedCardsAreASet() && !game.setIsAlreadyFound(selectedCards)){
        game.addSelectedCardsToFoundSets();
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
      cardsInPlay: this.state.cardsInPlay,
      selectedCards: selectedCards
    });
    game.selectedCards = selectedCards;
  }

  cardIsSelected(card_id){
//    console.log('Card '+card_id+ ' is selected: '+(this.state.selectedCards.indexOf(card_id) > -1));
    return (this.state.selectedCards.indexOf(card_id) > -1);
  }

  render() {
    return (
      <div className="Game">
        <div className="GridContainer">
          <CardGrid
            onClick={(id) => this.handleClick(id)}
            cardsInPlay={this.state.cardsInPlay}
            selectedCards={this.state.selectedCards}
          />
        </div>
        <div className="SetsContainer">
          <FoundSets />
        </div>
      </div>
    );
  }
}

class CardGrid extends React.Component {

  getRow(card_ids) {
//    console.log('getRow:');

    return (
      <div>
      {card_ids.map((card_id) => {
//        console.log('Rendering card: '+card_id);
//        console.log('Selected Cards: '+this.props.selectedCards);
        return (
          <CardView
            id={card_id}
            onClick={this.props.onClick}
            isSelected={(this.props.selectedCards.indexOf(card_id) > -1)}
          />);
      })}
      </div>
    );
  }

  render() {

    const rows = [];
    const num_columns = 3;
    const num_rows = Math.ceil(this.props.cardsInPlay.length / num_columns);
    for(let i = 0; i < num_rows; i++){
//      console.log('getting row '+ i );
      rows[i] = this.getRow(this.props.cardsInPlay.slice(i*num_columns, (i+1)*num_columns));
    }

    return (
      <div className="CardGrid">
        {rows}
      </div>
    );
  }
}

class FoundSets extends React.Component {

  render() {
    let cheat_card_view = null;
    let cheat_card_id = game.getCheatCardId();
    if(cheat_card_id !== -1){
      cheat_card_view = (
        <div className="CheatCard">
          <CardView id={cheat_card_id} />
        </div>
      );
    }

    let found_sets = game.foundSets.map((found_set) => {
      return (
        <div className="FoundSet">
          <CardView id={found_set[0]} />
          <CardView id={found_set[1]} />
          <CardView id={found_set[2]} />
        </div>
      );
    });

    let all_sets = game.findAllSets().map((found_set) => {
      return (
        <div className="FoundSet">
          <CardView id={found_set[0]} />
          <CardView id={found_set[1]} />
          <CardView id={found_set[2]} />
        </div>
      );
    });

    return (
      <div className="FoundSets">
        {cheat_card_view}
        <div>Found sets go here</div>
        {found_sets}
        <div>All sets</div>
        {all_sets}
      </div>
    );
  }
}

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    }
  }

  render() {
//    console.log('CardView::render() | card_id: ' + this.props.id);
    let className = this.props.isSelected ? 'Card selected' : 'Card';
    return (
      <div
        className={className}
        onClick={() => this.props.onClick(this.props.id)}
      >
        <img
          src={require('./images/card-images/card-'+this.state.id+'.png')}
          alt={'set-card-'+this.state.id}
        />
      </div>
    );
  }
}

export default App;

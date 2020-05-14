import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { AppSwitch } from '@coreui/react';


class CardGrid extends Component {

  constructor(props) {
    super(props);

    this.gameEngine = this.props.gameEngine;

    this.state = {
      cardsInPlay: this.gameEngine.getCardsInPlayIds(), // card IDs for now... need to decide between ids and card objects
      selectedCards: [],
    }
  }

  handleClick(card_id){
    console.log('click handled for card: ' + card_id );

    if(this.props.gameEngine.cardIsSelected(card_id)){
      this.removeCardFromSelection(card_id);
    } else {
      this.addCardToSelection(card_id);
    }

  }

  addCardToSelection(card_id){
    if(this.state.selectedCards.length < 3){
      let selectedCards = this.gameEngine.getSelectedCardIds().slice();
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
      cardsInPlay: this.gameEngine.getCardsInPlayIds(),
      selectedCards: selectedCards
    });
    this.gameEngine.selectedCards = selectedCards;
  }

  getRow(card_ids) {
//    console.log('getRow:');
    let selectedCardIds = this.props.gameEngine.getSelectedCardIds();
    return (
      <div key={card_ids}>
      {card_ids.map((card_id) => {
//        console.log('Rendering card: '+card_id);
//        console.log('Selected Cards: '+this.props.selectedCards);
        return (
          <CardView
            key={'card-'+ card_id }
            id={card_id}
            onClick={() => this.handleClick(card_id)}
            isSelected={(selectedCardIds.indexOf(card_id) > -1)}
          />);
      })}
      </div>
    );
  }

  render() {

    let cardsInPlayIds = this.props.gameEngine.getCardsInPlayIds();
    const rows = [];
    const num_columns = 3;
    const num_rows = Math.ceil(cardsInPlayIds.length / num_columns);
    for(let i = 0; i < num_rows; i++){
//      console.log('getting row '+ i );
      rows[i] = this.getRow(cardsInPlayIds.slice(i*num_columns, (i+1)*num_columns));
    }

    return (
      <div className="CardGrid">
        {rows}
      </div>
    );
  }
}

class FoundSets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAllSets: false,
      temp: this.props.temp
    }
    this.gameEngine = this.props.gameEngine;
  }

  toggleShowAllSets(){
    this.setState({
      showAllSets: !this.state.showAllSets,
    });
  }

  render() {
    console.log('FoundSet::render()');
    let cheat_card_view = null;
    let cheat_card_id = this.gameEngine.getCheatCardId();
    if(cheat_card_id !== -1){
      cheat_card_view = (
        <div className="CheatCard">
          <CardView id={cheat_card_id} />
        </div>
      );
    }

    let found_sets = this.gameEngine.foundSets.map((found_set) => {
      return (
        <div className="FoundSet">
          <CardView id={found_set[0]} />
          <CardView id={found_set[1]} />
          <CardView id={found_set[2]} />
        </div>
      );
    });

    let all_sets = this.gameEngine.findAllSets().map((found_set) => {
      return (
        <div className="FoundSet" key={'found_set-' + found_set}>
          <CardView id={found_set[0]} />
          <CardView id={found_set[1]} />
          <CardView id={found_set[2]} />
        </div>
      );
    });

    return (
      <div className="FoundSets">
        <Card>
          <CardHeader className="d-flex align-items-center justify-content-between w-auto p-3">
            Cheat Card
            <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked />
          </CardHeader>
          <CardBody>
            {cheat_card_view}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            Found sets
          </CardHeader>
          <CardBody>
            {found_sets}
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="d-flex align-items-center justify-content-between">
            All Sets
            <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked />
          </CardHeader>
          <CardBody>
            {all_sets}
          </CardBody>
        </Card>
      </div>
    );
  }
}

class CardView extends Component {
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

export { CardView, CardGrid, FoundSets };

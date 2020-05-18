import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader } from 'reactstrap';
import { AppSwitch } from '@coreui/react';


class CardGrid extends Component {

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
            onClick={() => this.props.onClick(card_id)}
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

    let numFoundSets  = this.props.gameEngine.getNumberOfFoundSets();
    let numSets       = this.props.gameEngine.getNumberOfSets();

    return (
      <Card className="card-accent-primary h-100 w-100">
        <CardHeader className="d-flex flex-row">
          <div className="mr-auto">Find Sets</div>
          <Badge className="mr-1 p-2" color="primary" pill>Found {numFoundSets}/{numSets}</Badge>
        </CardHeader>
        <CardBody>
          <div className="CardGrid">
            {rows}
          </div>
        </CardBody>
      </Card>
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
      <div className="FoundSets h-100 w-100">
        <Card className="card-accent-info flex-grow-1 w-100">
          <CardHeader>
            All Sets
          </CardHeader>
          <CardBody>
            {all_sets}
          </CardBody>
        </Card>
        <Card className="card-accent-success flex-grow-1 w-100">
          <CardHeader>
            Found sets
          </CardHeader>
          <CardBody>
            {found_sets}
          </CardBody>
        </Card>
        <Card className="card-accent-warning flex-grow-1 w-100">
          <CardHeader>
            Cheat Card
          </CardHeader>
          <CardBody>
            {cheat_card_view}
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
    let className = this.props.isSelected ? 'SetCard selected' : 'SetCard';
    let onClick   = this.props.onClick ? () => this.props.onClick(this.props.id) : null;

    return (
      <div
        className={className}
        onClick={onClick}
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

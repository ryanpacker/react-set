class Game {
  constructor(){
    this.name = 'Set';
    this.selectedCards = []; // card IDs
    this.deck = new Deck();
    this.foundSets = []; // card IDs
    this.cardsInPlay = []; // cardIDs
    // TODO: change all card lists to be cards and create convenience function to get list of IDs

    this.startNewGame();
  }

  startNewGame() {
    var cards = this.deck.drawCards(11);
    let guaranteeSet = this.completeSet(cards[9], cards[10]);
    if(cards.indexOf(guaranteeSet) < 0){
      cards.push(guaranteeSet);
    }

    var card_ids = cards.map((card) => {
      return card.base3id;
    });

    this.cardsInPlay = card_ids;
  }

  addCardToSelection(card_id){
    this.selectedCards.push(card_id);
  }

  removeCardFromSelection(card_id){
    const index = this.selectedCards.indexOf(card_id);
    if (index > -1) {
      this.selectedCards.splice(index, 1);
    }
  }

  getSelectedCardIds(){
    return this.selectedCards;
  }

  cardIsSelected(card_id){
    console.log('Checking to see if card '+card_id+ ' is selected: ' + (this.selectedCards.indexOf(card_id) > -1));
    return (this.selectedCards.indexOf(card_id) > -1);
  }

  getCardsInPlayIds() {
    return this.cardsInPlay;
  }

  selectedCardsAreASet(){
    console.log('Checking to see if ' + this.selectedCards + ' are a set' );
    if(this.selectedCards.length === 3){
      return this.isSet(this.getCardsFromIds(this.selectedCards));
    } else {
      return false;
    }
  }

  addSelectedCardsToFoundSets(){
    console.log("Found a set: " + this.selectedCards);
    this.foundSets.push(this.selectedCards);
    this.selectedCards = [];
  }

  setIsAlreadyFound(set){
//    set.sort();
    return this.foundSets.some((found_set) => {
//      found_set.sort();
      console.log('comparing new set: ' + set + ' and previously found set '+ found_set);
      return (set.every( card_id => found_set.includes(card_id)));
    })
  }

  isSet(cards){
    if(cards.length !== 3) return false;
    return cards[2].equals(this.completeSet(cards[0], cards[1]))
  }

  completeSet(card1, card2){
    var values = card1.values.map(function(val, index) {
      // If the properties are the same, the third card's should be too
      if (val === card2.values[index]) return val;

      // If they are different, the third card should be one of (0, 1, 2)
      // By subtracting from three, we find the correct property number.
      // For example: 3-(1+2) == 0, 3-(0+2) == 1, 3-(1+0) == 2
      return 3 - (val + card2.values[index]);
    });
    return new Card(null, values.join(''))
  }

  completeSetIds(card1_id, card2_id){
    let card3 = this.completeSet(
        this.getCardFromId(card1_id),
        this.getCardFromId(card2_id)
    );
    return card3.base3id;
  }

  getCheatCardId(){
    if(this.selectedCards.length === 2){
      let cheatCard = this.completeSet(
          this.getCardFromId(this.selectedCards[0]),
          this.getCardFromId(this.selectedCards[1])
      );
      return cheatCard.base3id;
    } else {
      return -1;
    }
  }

  getCardFromId(base3id){
    return new Card(null, base3id);
  }

  getCardsFromIds(card_ids){
    return (
      card_ids.map((card_id) => {
        return this.getCardFromId(card_id);
      })
    );
  }

  findAllSets(){
    console.log('Game::findAllSets()');
    let card_ids = this.cardsInPlay;
    let all_sets = [];
    for(let i=0; i < (card_ids.length - 2); i++){
      for(let j=i+1; j < (card_ids.length - 1); j++){
        let card3_id = this.completeSetIds(card_ids[i], card_ids[j])
        // console.log('checking for ' + card3_id + ' in ' + card_ids);
        if(card_ids.slice(j).includes(card3_id)){
          all_sets.push([card_ids[i], card_ids[j], card3_id]);
        }
      }
    }
    return all_sets;
  }
}

class Deck {
  constructor(){
    const num_cards = 81;
    this.cards = []; // actual Cards, not CardIDs

    for(let i=0; i<num_cards; i++){
      this.cards.push(new Card(i));
    }
    this.shuffle();
  }

  shuffle(){
    var array = this.cards;
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    while (0 !== currentIndex) {
  		randomIndex = Math.floor(Math.random() * currentIndex);
  		currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.cards = array;
  }

  drawCards(n){
    return this.cards.splice(0, n);
  }

  getCardFromId(base3id){
    return new Card(null, base3id);
  }

}

class Card {
  constructor(base10id, base3id){
    if(base3id === undefined){
      this.base10id = base10id;
      this.base3id  = this.base10ToBase3(base10id);
    } else {
      this.base10id = parseInt(base3id, 3);
      this.base3id  = base3id;
    }
    this.values   = this.base3id.split('').map(function(i) { return parseInt(i)});
  }

  equals(card){
    return (this.base3id === card.base3id);
  }

  base10ToBase3(base10){
    let base3   = base10.toString(3);
    let values  = base3.split('').map(function(i) { return parseInt(i)});
    while(values.length < 4) { values.unshift(0); }
    return values.join('');
  }

  getCount(){
    let counts = [1, 2, 3];
    return counts[this.getAttribute('count')];
  }

  getFill(){
    let fills = ['open', 'striped', 'solid'];
    return fills[this.getAttribute('fill')];
  }

  getColor(){
    let colors = ['green', 'red', 'purple'];
    return colors[this.getAttribute('color')];
  }

  getShape(){
    let shapes = ['squiggle', 'diamond', 'oval'];
    return shapes[this.getAttribute('shape')];
  }

  getAttribute(key){
    let attributes = ['count', 'fill', 'color', 'shape'];
    let index = attributes.indexOf(key);
    return this.values[index];
  }

}

export default Game;
export { Deck, Card };

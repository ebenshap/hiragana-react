import React from 'react'
import Cards from './cards'
import Modal from './modal'
import NumOfTries from './numOfTries'
import ExpressionItem from './expressionItem'
import createGameDeck from '../gameDeck'
import * as wanakana from 'wanakana'

export default class GameBoard extends React.Component {
  
  state={
    showModal:0,
    updateBuffer:'',
    tryNum: 3,
    level:0,
    isCorrect:0,
    showScore: 0,
    score:0
  }

  constructor(props) {
    super(props);
    this.cards = React.createRef();
    this.expression = React.createRef();
    this.gameDeck = createGameDeck();
  }

  getScore = () => {
    let cluesTaken = this.cards.current.state.highestIndex * (1/8);
    let finalScore = 0;
    let tryNum = this.state.tryNum ;

    if( tryNum-1 !== 0 ) {
      finalScore = (tryNum * 3) + 1;
      if(cluesTaken) {
        finalScore = finalScore - cluesTaken;
      }  
    }
    return finalScore;
  }

  showModal = (isCorrect) => {
    
    this.setState((currState) => ({
      ...currState,
      isCorrect,
      showModal:1,
      tryNum: !isCorrect ? currState.tryNum-1 : currState.tryNum ,
      showAnswer: (isCorrect || currState.tryNum <=1 ) ? 1 : 0 ,
      score: (isCorrect || currState.tryNum <=1 ) ? currState.score + this.getScore() : currState.score
    }))
    setTimeout(this.hideModal, 500)
  }

  hideModal = () => {
    this.setState((currState) => ({
      ...currState,
      showModal:0
    }))
  }

  updateAnswer = (e) => {

    let romaji = e.currentTarget.querySelector(".romaji").innerText;
    
    const translatedInput = wanakana.toHiragana(romaji);
    const hiraganaCells = document.querySelectorAll("#hiraganaInput #hiraganaRow td");
    const inputItems = document.querySelectorAll("#hiraganaInput #inputRow input");
    let stateObj = {}
    
    hiraganaCells.forEach((element, index) => {
      if (element.innerText === translatedInput) {
        stateObj[index] = romaji.toLowerCase();
      }
    });

    this.expression.current.setState((currState) => ({
      ...currState,
      ...stateObj
    }))
  }

  nextLevel = () => {
    if(this.state.level < this.gameDeck.length -1) {
      
      this.setState((currState) => ({
        ...currState,
        showModal:0,
        updateBuffer:'',
        tryNum: 3,
        showAnswer: 0,
        level: currState.level + 1
      }));
      this.cards.current.createClueGroup(1);
      //this.expression.current.resetState(this.gameDeck[this.state.level][0])
    }
  }

  showScore = () => {
    this.setState((curState) => ({
      ...curState,
      showScore:1
    }))
  }

  testSubmission = () => {
    let inputs = document.querySelectorAll("#hiraganaInput input");
    let anyEmptyInputs = 0;
    let joinedString = "";
    let curAnswer = this.gameDeck[this.state.level][0].join("").toLowerCase();
    inputs.forEach((item, index)=>{
      if(item.value === "") {
        anyEmptyInputs++;
      } else {
        joinedString += item.value;
      }
    });
    if(!anyEmptyInputs) {
      if(curAnswer === joinedString) {
        this.showModal(1);
      } else {
        this.showModal();
      }
    }
  }

  newGame = () => {
    this.gameDeck = createGameDeck();
    this.setState({
      showModal:0,
      updateBuffer:'',
      tryNum: 3,
      level:0,
      isCorrect:0,
      showAnswer: 0,
      showScore: 0,
      score:0
    });
  }

  render () {
    return ( 
      
    <div id='game'>
      <NumOfTries tryNum={this.state.tryNum} />
      { !this.state.showScore ? 
      
       !this.state.showAnswer ? 
        <React.Fragment>
          <p className='announcement'>The Word is...</p>
          <ExpressionItem
            updateBuffer={this.state.updateBuffer} 
            hiragana={this.gameDeck[this.state.level][0]}
            levelLength={this.state.levelLength}
            ref={this.expression}
            updateExpressionAnswer={this.updateExpressionAnswer}
            />
          <button onClick={this.testSubmission} >Submit Answer</button>
        </React.Fragment>
      : 
        <React.Fragment>
          <p className='announcement'>The Word is...</p>
          <p>{ wanakana.toHiragana( this.gameDeck[this.state.level][0].join(" ") ) }</p>
          <p>{ this.gameDeck[this.state.level][0].join(" ") }</p>
          <p>In english: { this.gameDeck[this.state.level][1] }</p>
          {this.state.level < (this.gameDeck.length-1) ?
          <button onClick={this.nextLevel} >Next Question</button> :
          <button onClick={this.showScore} >See Score</button>
          }
        </React.Fragment>
       : 
        <React.Fragment>
          <h2>Your Score</h2>
          <p>{ Math.floor((this.state.score * 10)/this.gameDeck.length )}%</p>
          <button onClick={this.newGame} >New Game</button>
        </React.Fragment>
       }


      <Modal hideModal={this.hideModal} isCorrect={this.state.isCorrect} showModal={this.state.showModal}/>
      {!this.state.showScore ?
        <Cards 
          updateAnswer={this.updateAnswer}
          ref={this.cards} /> : null
      }     
      
    </div> );
  }
}
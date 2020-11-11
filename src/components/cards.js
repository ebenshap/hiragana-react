import React from 'react'
import backButtonImage from '../images/back.png'
import forwardButtonImage from '../images/forward.png'
import {shuffle} from '../utils'
import * as wanakana from 'wanakana'

let hiraganaObject = [
  'A' , 'I', 'U', 'E', 'O',  
  'KA', 'KI', 'KU', 'KE', 'KO',
  'SA', 'SHI', 'SU', 'SE', 'SO',
  'TA', 'CHI', 'TSU', 'TE', 'TO',
  'NA', 'NI', 'NU', 'NE', 'NO',
  'HA', 'HI', 'FU', 'HE', 'HO',
  'MA',  'MI',  'MU',  'ME',  'MO',
  'YA',  'YU',  'YO',
  'RA',  'RI',  'RU',  'RE',  'RO',
  'WA',
  'N',  
  'GA',  'GI', 'GU',  'GE',  'GO',
  'ZA',  'JI',  'ZU',  'ZE',  'ZO',
  'DA',  'DE',  'DO',
  'BA',  'BI',  'BU',  'BE',  'BO',  
  'PA',  'PI',  'PU',  'PE',  'PO',
]


export default class Cards extends React.Component {

  constructor(props) {
    super(props);
    this.createClueGroup();  
  }

  state={
    index:0,
    highestIndex:0
  }

  createClueGroup = (resetState) => {

    hiraganaObject = shuffle( hiraganaObject );

    let i,j,temparray,chunk = 8;
    let clueGroups = [];

    // Chunk the array into groups
    for (i=0,j=hiraganaObject.length; i<j; i+=chunk) {
      let slicedGroup = hiraganaObject.slice(i,i+chunk);
      let chunkDiff = chunk - slicedGroup.length;
      if( chunkDiff > 0 ) {
        for(let i = 0 ; i < chunkDiff; i++) {
          slicedGroup.push("");
        }
      }
      clueGroups.push( slicedGroup );
    }
    this.clueGroups = clueGroups;
    if(resetState) {
      this.setState({index:0, highestIndex:0})
    }
  }

  render() {
    return <div id='cards'>
    
      <div id='recentCards'>
        <p className='text-center'>Clues</p>
        <div className='cards'>
          {
            this.clueGroups[this.state.index].map((romaji, index) => {

              return <div className='card' onClick={this.props.updateAnswer} key={index}>
                <p className='hiragana'>{ wanakana.toHiragana(romaji) }</p>
                <p className='romaji'>{romaji}</p>
              </div>
            })
          }
          
        </div>
        <p className='small clear'></p>
      </div>
      <div id='deckNav' className='clear'>
      <img src={backButtonImage} alt="Back button" className='back' 
        style={ this.state.index === 0
          ? {visibility:"hidden"}
          : {} } onClick={() => { this.setState(currState => ({ ...currState, index: (currState.index-1) }) ) } }
      />
        
        <img src={forwardButtonImage} alt="Forward button" className='forward' 
          style={ this.state.index === ( this.clueGroups.length -1 )
            ? {visibility:"hidden"}
            : {} } onClick={() => { this.setState(currState => ({ 
              index: (currState.index+1),
              highestIndex : currState.highestIndex < currState.index+1 ? currState.index+1 : currState.highestIndex
            }) ) } }
        />
        <p className='clear'></p>
      </div>
        
    </div>
  }
}
import React from 'react'
import * as wanakana from 'wanakana'

export default class ExpressionItem extends React.Component {
  
  state={}

  constructor(props) {
    super(props);
    this.resetState(props.hiragana);
  }

  resetState= (hiragana) => {
    hiragana.map((item, index)=> {
      this.state[index] = ''
    })
  }

  // A helper function. 
  updateAnswer = (newData) => {
    
    this.setState((currState)=>{
      return {
        ...currState,
        ...newData
      }
    })
    
  }

  render(){
    return <div id="expression" ><table id="hiraganaInput">
      <tbody>
      <tr id="hiraganaRow">
        {this.props.hiragana.map( (item, index) => <td key={index} >{wanakana.toHiragana(item)}</td>  ) }
      </tr>
      <tr id="inputRow" className="row2">
        {this.props.hiragana.map((item, index )=> <td key={index} >
          <input value={this.state[index]} onChange={(e)=>{
            const keyboardInput = e.target.value;

            this.updateAnswer({
              [index]: keyboardInput
            })
            
          }} className="hiraganaChunk" size="2"/>
        </td> ) }
      </tr>
      </tbody>
    </table></div>
  }
}
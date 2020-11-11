import React from 'react'

export function scoreCard(){
  return <div id='endMessage'>
    <p>End Of Game</p>
    <p className='score'>Your score is: <span></span></p>
    <p><input id='playAgain' type='submit' className='button' value='Play Again?' /></p>
  </div>
}
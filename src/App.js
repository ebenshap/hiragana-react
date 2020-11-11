import React, { Fragment } from 'react';
import GameBoard from './components/gameBoard'
import Navigation from './components/navigation'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'

import "./css/style.css"

function App() {
  return (
    <Router>
      <Fragment>
        <div id="mainArea">
          <Navigation/>
          <div id="contentWrapper">
            <Route path='/' exact component={GameBoard} />
            <Route path='/instructions' exact >
              <div id='instructions'>
              <h2>Instructions</h2>
                <p>In each round of the game a Japanese word is provided in hiragana. The object of the game is to enter the correct romaji for each character. In each round you have three guesses. Clue cards are provided in case you don't remember the romaji for a character. But the less you have to reference the deck of clues the better.</p> 
                <p>Each game has 20 rounds. At the end of the game, you'll be scored based on how many words you've gotten correct, taking into account how many times you've accessed the clue cards.</p>

                <h2>Introduction</h2>
                <p>The Japanese language has three character sets: kanji, katakana, and hiragana. This game is designed to help you learn the characters in the hiragana character set. It differs from the English alphabet, where letters (consonants and vowels) are used to compose syllables. Instead hiragana characters correspond directly to syllables (except for 30 syllables which are created by combining 2 hiragana symbols, but at the present moment this game doesn't concern itself with those 30 syllables since the focus is on learning the characters and not the sounds). There are 101 syllables in the Japanese Language, all of which can be represented in hiragana with it's 71 unique characters.</p>
                <p>Romaji is a fourth set of the characters that uses the Roman alphabet to write Japanese syllables. While some frown on learning to associate romaji with hiragana, and not simply learning the sound to symbol relationship without any reference to the Roman alphabet, the use of romaji makes it possible to play this game. And hopefully it won't screw up the genuineness of your hiragana learning efforts. But perhaps that's something you should be mindful of in playing the game.</p>        
                <br /><br />
              </div>
            </Route>
            <Route path='/links' exact> 
              <div id='links'>
                <br />
                <p>This game was help put together by referencing information from:</p> 
                <p><a href ='http://www.amazon.com/Japanese-Step-Innovative-Approach-Speaking/dp/0658014900/ref=pd_cp_b_0' target='_blank' >Japanese Step By Step</a>, written by Gene Nishi.</p>
                <p><a href='http://www.tofugu.com/2010/10/01/the-100-most-important-japanese-words/' target='_blank' >The 100 most important japanese words</a>, by Koichi, for tofugu.com.</p>
                <br />
              </div>
            </Route>
          </div> 
        </div>
      </Fragment>
    </Router>
  );
}

export default App;

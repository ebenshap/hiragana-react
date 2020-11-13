import "./css/style.css"

import React, { Fragment } from 'react';
import GameBoard from './components/gameBoard'
import Instructions from './components/instructions'
import Links from './components/links'

import Navigation from './components/navigation'

class App extends React.Component {
  
  state={
    page: "game"
  }

  setPage = (page) => {
    this.setState({
      page
    })
  } 
  
  render() {
    return <Fragment>
      <div id="mainArea">
        <Navigation setPage={this.setPage} />
        <div id="contentWrapper">
          <div style={ this.state.page == "game"? { display : "block" }: { display : "none" }}  >
            <GameBoard />
          </div>
          <div style={ this.state.page == "instructions"? { display : "block" }: { display : "none" }}  >
            <Instructions />
          </div>
          <div style={ this.state.page == "links"? { display : "block" }: { display : "none" }}  >
            <Links />
          </div>
        </div> 
      </div>
    </Fragment>
  }
}

export default App;

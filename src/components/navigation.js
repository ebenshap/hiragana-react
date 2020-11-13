// The source for the nav is:
// https://github.com/awulkan/FlexNav

import React from 'react'
import history from '../history';


function myFunction() {
  var navButton = document.querySelector("#nav-menu-button");
  var navUl = document.querySelector(".nav-ul");
  navUl.classList.toggle("hide-ul");
}

function getPageName(pathname) {
  let pageName = pathname.replace( process.env.PUBLIC_URL, "" );
  pageName = pageName.replace(/^\//, '');
  pageName = pageName.split("/")[0].split("?")[0].split("#")[0];
  if(pageName === ""){
    pageName = "game";
  }
  return pageName;
}


export default class Navigation extends React.Component {
  
  state={
    page:"game"
  }

  componentDidMount() {
    history.listen((obj, type) => {
      let pageName = getPageName(obj.pathname);
      if(type === "POP") {
        this.setPage(pageName, 1)
      }
    });
    let pageName = getPageName(window.location.pathname);
    this.setPage(pageName, 1);
  }

  setPage = (page, skipPush) => {
    this.setState({ page })
    this.props.setPage(page)
    if(page === "game") {
      page = process.env.PUBLIC_URL;
    } else {
      page = process.env.PUBLIC_URL + "/" + page;
    }
    if(!skipPush) {
      history.push(page)
    }
  }


  render () {
    return <div id="nav-background">
      <div id="nav-container">
        <header id="nav-header">
          <h1 id="nav-logo">Hiragana to Romanji</h1>
          <div id="nav-menu-button" onClick={myFunction}>MENU</div>
        </header>
        <nav>
          <ul className="nav-ul hide-ul">
            <li className={`nav-link ${ this.state.page == "game" ? "active-link" :""  }`} onClick={()=>{ this.setPage("game")}} >Home</li>
            <li className={`nav-link ${ this.state.page == "instructions" ? "active-link" :""  }`} onClick={()=>{ this.setPage("instructions")}} >Instructions</li>
            <li className={`nav-link ${ this.state.page == "links" ? "active-link" :""  }`} onClick={()=>{ this.setPage("links")}} >Links</li>
          </ul>
        </nav>
      </div>
    </div>
  }
}
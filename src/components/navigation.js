// The source for the nav is:
// https://github.com/awulkan/FlexNav

import React from 'react'
import { NavLink } from 'react-router-dom'

function myFunction() {
  var navButton = document.querySelector("#nav-menu-button");
  var navUl = document.querySelector(".nav-ul");
  navUl.classList.toggle("hide-ul");
}

export default function Navigation() {
    return <div id="nav-background">
      <div id="nav-container">
        <header id="nav-header">
          <h1 id="nav-logo">Hiragana to Romanji</h1>
          <div id="nav-menu-button" onClick={myFunction}>MENU</div>
        </header>
        <nav>
          <ul className="nav-ul hide-ul">
            <li><NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/`} exact activeClassName='active-link' >Home</NavLink></li>
            <li><NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/instructions`} exact  activeClassName='active-link' >Instructions</NavLink></li>
            <li><NavLink className="nav-link" to={`${process.env.PUBLIC_URL}/links`} exact activeClassName='active-link' >Links</NavLink></li>
          </ul>
        </nav>
      </div>
    </div>
    /*<div className="topnav" id="myTopnav">
    <a href="#play" className="active">Play</a>
    <a href="#instructions">Instructions</a>
    <a href="#contact">Contact</a>
    <a href="#link">Link</a>
    <button style={{fontSize:"15px"}} className="icon" onClick={myFunction}>&#9776;</button>
  </div> */
}
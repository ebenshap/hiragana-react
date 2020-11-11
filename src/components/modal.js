import React from 'react'

// Modals are best operated by event triggering. 
// How to do that in react?
// https://www.w3schools.com/howto/howto_css_modals.asp


export default class Modal extends React.Component {

    render(){
    return <div onClick={this.props.hideModal} style={ (this.props.showModal) ? {display:"block"} : {} } className={ this.props.isCorrect ? "modal correct" : "modal wrong" }>
    <div className="modal-content">
      <span className="close">&times;</span>
      { this.props.isCorrect ? <p>&#27491;&#35299;</p> : <p>&#27531;&#24565;</p> }
    </div>
  </div>
  }
}

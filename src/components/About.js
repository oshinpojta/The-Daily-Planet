import React, { Component } from 'react'

export default class About extends Component {
    constructor(){
        super();
        this.state = {
            arr : [],
            category : "Entertainment"
        }
    }

    async componentDidMount(){
        console.log("Mounting About", this.state,  this.props);
    }


  render() {
    return (
        <div style={{ padding: 20 }}>
        <h2>About View</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
      </div>
    )
  }
}

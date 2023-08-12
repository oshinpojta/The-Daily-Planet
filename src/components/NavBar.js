import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import LogoComponent from './LogoComponent';

export default class NavBar extends Component {

  static defaultProps = {
    selectedCategory : "general",
    categories : ["Business", "Entertainment", "Health", "Science", "Sports", "Technology"]
  }

  static propTypess = {
    selectedCategory : PropTypes.string,
    categories : PropTypes.array
  }

  render() {
    const categories = this.props.categories;
    const locationPath = window.location.href.split("/");
    const location = locationPath[locationPath.length-1];
    // console.log(locationPath, location)

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <LogoComponent /> 
            <Link key={"news-guide"} className="navbar-brand" to="/"  style={{marginLeft:"2rem"}}>The Daily Planet</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link key={"nav_home"}  className={`nav-item nav-link ${location == ""? "active" : "" }`} to="/">Home</Link>
                {/* <Link key={"about"} className="nav-item nav-link" to="/about">About</Link> */}
                {categories.map((category) =>{
                  let link = `/${category.toLowerCase()}`;
                  return <Link key={"nav_"+category}  className={`nav-item nav-link ${location.toLowerCase() == category.toLowerCase()? "active" : "" }`}  to={link}>{category}</Link>
                })}
                </div>
            </div>
            </nav>
      </div>
    )
  }
}

const UseLocation = () => {
  return (
    <div>
      
    </div>
  )
}




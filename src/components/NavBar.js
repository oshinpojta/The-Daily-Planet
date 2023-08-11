import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

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
    const selectedCategory = this.props.selectedCategory;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link key={"news-guide"} className="navbar-brand" to="/"  style={{marginLeft:"2rem"}}>The Daily Planet</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link key={"nav_home"}  className="nav-item nav-link" to="/">Home</Link>
                {/* <Link key={"about"} className="nav-item nav-link" to="/about">About</Link> */}
                {categories.map((category) =>{
                  let link = `/${category.toLowerCase()}`;
                  return <Link key={"nav_"+category}  className="nav-item nav-link" to={link}>{category}</Link>
                })}
                </div>
            </div>
            </nav>
      </div>
    )
  }
}




import React, { Component } from 'react'

const defaultImageToUrl = "https://cdn-icons-png.flaticon.com/512/2964/2964063.png"

export default class NewsItem extends Component {

  render() {
    // let { description, source, title, url, urlToImage } = this.props;
    let { summary, author, title, link, media } = this.props;
    // console.log(author, description, source, title, url, urlToImage)
    let name = !author || !author.name ? "" : author.name; 
    return (
         <div className="card news-item-container col-md-4" style={{ width: "25rem", margin : "2rem", padding:"1rem" }}>
            <h4 className="card-name">{name}</h4>
            <img className="card-img-top" src={!media || media=="" ? defaultImageToUrl : media } alt="Card" style={{maxWidth:"500px", maxHeight:"300px"}}/>
            <div className="card-body">
                <h4 className="card-title">{title.length<134 ? title : title.slice(0, 131)+"..."}</h4>
                {/* <h5 className="card-title">{author}</h5> */}
                <p className="card-text">{ summary.length<180 ? summary : summary.slice(0, 233)+"..."}</p>
                <a href={link} className="btn btn-primary">View More</a>
            </div>
        </div>
    )
  }
}


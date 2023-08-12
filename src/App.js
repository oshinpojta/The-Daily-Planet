import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const categories = ["Business", "Entertainment", "Health", "Science", "Sports", "Technology"]

export default class App extends Component {

  constructor(){
    super();
    ///console.log("constructor runs during initializing");
    //call state
    this.state = {
        progress : 0
    }
  }

  setProgress = (value) => {
    // console.log("val ", value)
    if(!value){
      value = 0;
    }
    this.setState({...this.state, progress : value})
  }

  render() {
    const pageSize = 12;
    return (
        <>
          <NavBar categories={categories}/>
          <LoadingBar
            color='#f50c0c'
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            {categories.map((category)=>{
              let link = `/${category.toLowerCase()}`;
              return <Route key={"route_"+category} exact path={link}  element={<News key={"app_"+category.toLowerCase()} setProgress={this.setProgress} pageSize={pageSize} category={category} />} />
            })}
            <Route key={"route_home"} exact path="/" element={<News key={"app_home"} pageSize={pageSize} setProgress={this.setProgress} category="General" />} />
          </Routes>
        </>
    )
  }
}
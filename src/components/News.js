import React, { Component } from 'react'
import NewsItem from './NewsItem'
import axios from 'axios';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
// import news from '../data/news'

const apiKey = "wjnqjtoyOiRP1OJZD6jkyVS6wNtxP6k3pNhMDvKvDxw" //NewsCatcher
// const apiKey = "5f185344340640a2b4e029bfdb3a60d7"; //NewsApi
// const apiKey = "69cc7b23df6a49f5be39f955e795301d"; //NewsApi
const headers = {
  "x-api-key" : apiKey
}

export default class News extends Component {
    
  static defaultProps = {
    pageSize : 12,
    category : "General"
  }

  static propTypess = {
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

    constructor(){
        super();
        ///console.log("constructor runs during initializing");
        //call state
        this.state = {
            articles : [],
            loading : true,
            totalResults : 0,
            page : 1,
            category : "General"
        }
      }

    async componentDidMount(){
        try {
            const setProgress = this.props.setProgress;
            // console.log(setProgress, this.props)
            setProgress(10);
            const pageSize = this.props.pageSize;
            // const url = `https://newsapi.org/v2/everything?q=${this.props.category.toLowerCase()}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${pageSize}`;
            const url = `https://api.newscatcherapi.com/v2/search?q=${this.props.category.toLowerCase()}&countries=US&page_size=${pageSize}&page=${this.state.page}`
            let response = await axios.get( url, { headers : headers });
            console.log("News : ", url, response)
            if(response && response.data && response.data.articles){
              this.setState({ 
                ...this.state, 
                articles : response.data.articles,
                loading : false,
                totalResults : response.data.total_pages, // response.data.totalResults,
                category : this.props.category
              })
              setProgress(100);
              
            }else{
              this.setState({ 
                ...this.state, 
                loading : false,
              })
              setProgress(100);
            }
            // console.log("Mount Comp ", this.state);
        } catch (error) {
            const setProgress = this.props.setProgress;
            console.log("Api Error : ", error);
            this.setState({ 
              ...this.state, 
              loading : false,
            })
            setProgress(100);
        }  
    }

    handleClick =  async (e) => {
      try {
        // console.log("Clicked", e.target.id, e.target.parentNode.id);
        // if(e.target.id == "button-prev" || e.target.parentNode.id == "button-prev"){
        //   window.scrollTo(0,0);
        //   this.setState({ 
        //     ...this.state, 
        //     loading : true
        //   })
        //   const pageSize = this.props.pageSize;
        //   const page = this.state.page <= 1 ? 1 : this.state.page-1; 
        //   const url = `https://newsapi.org/v2/everything?q=${this.state.category.toLowerCase()}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
        //   let response = await axios.get(url);
        //   //console.log("News : ", response);
        //   if(response && response.data && response.data.articles){
        //     this.setState({ 
        //       ...this.state, 
        //       articles : response.data.articles,
        //       totalResults : response.data.totalResults,
        //       loading : false,
        //       page : page
        //     })
        //   }
  
        //   //console.log("prev", url);
        // }
        // if(e.target.id == "button-next" || e.target.parentNode.id == "button-next"){
        //   window.scrollTo(0,0);
        //   this.setState({ 
        //     ...this.state, 
        //     loading : true
        //   })
        //   const pageSize = this.props.pageSize;
        //   const page = this.state.page+1; 
        //   const url = `https://newsapi.org/v2/everything?q=${this.state.category.toLowerCase()}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
        //   let response = await axios.get(url);
        //   //console.log("News : ", response)
        //   if(response && response.data && response.data.articles){
        //     this.setState({ 
        //       ...this.state, 
        //       articles : response.data.articles,
        //       totalResults : response.data.totalResults,
        //       loading : false,
        //       page : page
        //     })
        //   }
        //   //console.log("next", url);
        // } 
        if(e.target.id == "button-scroll-top" || e.target.parentNode.id == "button-scroll-top" || e.target.parentNode.parentNode.id == "button-scroll-top"){
          window.scrollTo(0,0);
        } 
      } catch (error) {
        console.log(error); 
      }
    }

    fetchData = async () => {
      try {
          const setProgress = this.props.setProgress;
          setProgress(10);
          const pageSize = this.props.pageSize;
          const page = this.state.page+1; 
          // const url = `https://newsapi.org/v2/everything?q=${this.state.category.toLowerCase()}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
          const url = `https://api.newscatcherapi.com/v2/search?q=${this.props.category.toLowerCase()}&countries=US&page_size=${pageSize}&page=${this.state.page}`
          let response = await axios.get(url, { headers : headers });
          //console.log("News : ", response)
          if(response && response.data && response.data.articles){
            this.setState({ 
              ...this.state, 
              articles : [...this.state.articles,  ...response.data.articles],
              totalResults : response.data.total_pages, // response.data.totalResults,
              loading : false,
              page : page
            })
            setProgress(100);
            // console.log("next", url, response);
          }else{
            this.setState({ 
              ...this.state, 
              loading : false,
            })
            setProgress(100);
          }
        } catch (error) {
            const setProgress = this.props.setProgress;
            console.log("Api Error : ", error);
            this.setState({ 
              ...this.state, 
              loading : false,
            })
            setProgress(100);
        }
    }
    
    // refreshFunction = async () =>{
    //   const pageSize = this.props.pageSize;
    //   const page = this.state.page+1; 
    //   const url = `https://newsapi.org/v2/everything?q=${this.state.category.toLowerCase()}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`
    //   let response = await axios.get(url);
    //   //console.log("News : ", response)
    //   if(response && response.data && response.data.articles){
    //     this.setState({ 
    //       ...this.state, 
    //       articles : [...this.state.articles,  ...response.data.articles],
    //       totalResults : response.data.totalResults,
    //       loading : false,
    //       page : page
    //     })
    //     console.log("next", url, response);
    //   }
    // }

  render() {
    // console.log(news)
    // console.log("Running ...", this.state)
    // console.log(news)
    let data = this.state.articles;
    let id = 1;
    // const pageSize = this.props.pageSize;
    // console.log("hasMore", this.state)
    
    return (
      <>
      <h1 className='text-center heading' style={{ marginTop:"5rem", marginLeft:"2rem"}}><u>Top Headlines {this.props.category!== "General" ? `( ${this.props.category} )` : ""}</u></h1>
      { this.state.loading && <Spinner />}
      { !this.state.loading && <div className='container-fluid news-container'>
        <div className="row">
        <InfiniteScroll style={{ display: "flex", flexWrap: "wrap"}}
          dataLength={data.length} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.articles.length<this.state.totalResults}
          loader={<h4></h4>}
          endMessage={<></>}
          // below props only if you need pull down functionality
          // refreshFunction={this.refreshFunction}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          // }
        >
          {data.map((item)=>{
                return <NewsItem key={"news_item_"+id++} {...item} />
            })}
        </InfiniteScroll> 
        
        </div>
        {/* <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-light" id="button-prev" onClick={this.handleClick}><i className="bi bi-arrow-left"></i> Previous</button>
          <button id='button-scroll-top' style={{ borderRadius:"40%", width:"50px", height:"48px", backgroundColor:"#3d3d3d", color:"white", paddingTop:"4px"}}><h3><i className="bi bi-arrow-up" onClick={this.handleClick}></i></h3></button>
          <button disabled={this.state.articles.length/pageSize <1}  type="button" className="btn btn-dark"  id="button-next" onClick={this.handleClick}>Next <i className="bi bi-arrow-right"></i></button>
        </div>  */}
      </div>}
      { ( !this.state.loading && this.state.articles.length<=0 ) && <h2 className='api-error'>API Query Limit Exhausted for this Month! Please Try Again Next Month!</h2>}

      </>
    )
  }
}

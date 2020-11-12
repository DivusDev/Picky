import React, { Component } from 'react';
import "./App.css";
import Header from './Components/Header/Header';
import Post from './Components/Post/Post'

//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from "redux-thunk";
import reducers from './reducers/data';

//router
import { BrowserRouter, Route, Switch } from "react-router-dom";


//pages
import Error from "./Components/pages/Error";
import Hot from "./Components/pages/Hot";
import Create from "./Components/pages/Create";
import New from "./Components/pages/New";
import Top from "./Components/pages/Top";
import View from "./Components/pages/View";
import Nearby from "./Components/pages/Nearby";

class App extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <BrowserRouter>
        <Header />
        <div className="container">
            <Switch>
              <Route path="/" component={ Hot } exact/>
              <Route path="/hot" component={ Hot } exact/>
              <Route path="/new" component={ New } exact/>
              <Route path="/top" component={ Top } exact/>
              <Route path="/create" component={ Create }/>
              <Route path="/nearby" component={ Nearby } />
              <Route path="/view/:postID" component={ View } />
              <Route component={ Error }/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
  
}

export default App;

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from "./redux/store"
import { withRouter } from 'react-router-dom';
import Router from './router';
import './App.css'


class App extends Component {
    componentWillMount(){

    }
    componentDidMount(){

    }
  render() {
    return (
        <Provider store = { store }>
            <div className="App" >
                <Router></Router>
            </div>
        </Provider>

    );
  }
}

export default App;

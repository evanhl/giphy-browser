import './App.css';
import React from 'react';
import GifDetail from './GifDetail';
import GiphyBrowser from './GiphyBrowser';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route component={GiphyBrowser} path="/" exact/>
        <Route component={GifDetail} path="/gif/:gifId"/>
      </Router>
    </div>
  );
}

export default App;

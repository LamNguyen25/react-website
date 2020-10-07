import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import main from './pages/main';
import Navbar from './components/Navbar';
import home from './components/pages/Home';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={home}/>
        </Switch>
      </div>
    </Router>
  )
   
}

export default App;

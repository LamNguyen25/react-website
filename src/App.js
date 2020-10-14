import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import main from './pages/main';
import Navbar from './components/Navbar';
import home from './components/pages/Home';
import pinItem from '../src/components/pages/PinItems';

function App() {
  return (
    <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={home}/>
          <Route exact path="/pinItems" component={pinItem}/>
        </Switch>
    </Router>
  )
   
}

export default App;

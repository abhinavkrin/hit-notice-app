import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './bootstrap.scss';
import './App.scss';
import Home from './Components/Pages/Home';
import ScrollToTop from './Components/Common/ScrollToTop';
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Switch>
        <Route path="/" exact render={()=><Home page={1}/>}/>
        <Route path="/page/:page" exact render={({match})=> <Home page={match.params.page}/>}/>
        <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

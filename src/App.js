import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from "react-router-dom";

import Homepage from './page/homepage/Homepage';
import Login from './page/login/Login';

export default () => {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route component={Homepage} exact path={'/'} />
          <Route component={Login} exact path={'/login'} />
        </Switch>
      </div>
    </HashRouter>
  );
};

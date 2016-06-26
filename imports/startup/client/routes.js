import React from 'react';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router';
import App from '../../ui/components/App.jsx';
import Focus from '../../ui/pages/Focus.jsx';
import Decide from '../../ui/pages/Decide.jsx';
import Assign from '../../ui/pages/Assign.jsx';


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/filter" />
      <Route path="filter" component={Focus}/>
      <Route path="decide" component={Decide}/>
      <Route path="assign" component={Assign}/>
    </Route>
  </Router>
);

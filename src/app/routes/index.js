import React from 'react'
import { Route, Redirect, Switch } from "react-router-dom";
import PrivateRoute from './privateRoute';
import P from '../../lib/pages/containers/p';
import Login from '../../lib/pages/containers/login';
import Index from '../../lib/pages/containers/index';
import CancelAsync from '../../lib/pages/containers/cancelAsync';
import AsyncCounter from '../../lib/pages/containers/asyncCounter';
import DynamicContent from "../../lib/pages/containers/dynamicContent";
const AppRoutes = (props) => {
  const { redirect, redirectPath } = props
  var rp = (redirect) ? {
    path: redirectPath,
    comp: DynamicContent
  } : {
      path: '/index',
      comp: Index
    };
  return (
    <Switch>
      {redirect ? <Redirect exact from="/" to={rp.path} component={rp.comp} /> : null}
      <Route exact path="/" component={Index} />
      <Route exact path="/index" component={Index} />
      <Route exact path="/index/ca" component={CancelAsync} />
      <Route exact path="/index/ac" component={AsyncCounter} />
      <Route exact path="/index/login" component={Login} />
      <PrivateRoute path='/indexp' component={P} />
      <Route path="/index/:pageUrl" component={DynamicContent} />
    </Switch>
  )
}
export default AppRoutes

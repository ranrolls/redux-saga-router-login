import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { withRouter } from 'react-router';
import './styles/app.css';
import { requestRedirect } from '../lib/infra/actions'
import Cookies from 'js-cookie';
import TemplateOne from './templates/one'
class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // Cookies.set('reqPage', 'ac', { path: '', expires: 1 });
    var cookie = Cookies.get('reqPage');
    if(typeof cookie === 'string'){
      if(cookie.length > 0) {
        let newRoutePath = '/index/' + cookie;
        this.props.dispatch(requestRedirect({
          redirect: true, redirectPath: newRoutePath }
        ))
      }
    } 
  }
  componentDidUpdate(prevProps) {
    console.log('component did update')
    if(this.props.redirect === true) {
      Cookies.remove('reqPage', { path: '' });
      this.props.dispatch(requestRedirect({
        redirect: false, redirectPath: '/' }
      ))
    }
  }
  render() {
    return (
      <Router>
        <TemplateOne {...this.props} />
      </Router>
    )
  }
}
function mapStateToProps(state) {
  const { redirect, redirectPath } = state.core;
  const { user } = state;
  return {
    redirect, redirectPath, user
  }
}
export default withRouter(connect(mapStateToProps)(App))

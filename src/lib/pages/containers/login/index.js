import * as React from 'react'
import _ from 'lodash'
function Login(props) {
  if(_.get(props, 'location.state.from.pathname', '').substring(0, 7) === '/indexp')
    alert("kindly login first");
  return (
    <h1>Login 1</h1>
  );
}
export default Login;
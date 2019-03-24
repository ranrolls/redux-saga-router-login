import '@babel/polyfill'
import * as React from 'react'
import _ from 'lodash'
window._ = _;
window.React = React;
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './lib/config/registerServiceWorker'
import './main.css'
import configureStore from './lib/config/store/configureStore'
import rootSaga from './lib/infra/sagas'
import App from './app/App'
const store = configureStore()
store.runSaga(rootSaga)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker();
/**
 * Vendor imports.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

/**
 * Custom imports.
 */
import './styles/index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import checkersReducer from './store/reducers/checkers';

/**
 * The store.
 * @constant {object} store
 */
const store = createStore(checkersReducer);

/**
 * A JSX element to setup the app as the store provider.
 * @constant {JSX} app
 */
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

/** Render app on 'root' element */
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

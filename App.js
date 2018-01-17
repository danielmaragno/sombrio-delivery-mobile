
// import * as Expo from "expo";
import React from 'react';
import { Provider } from 'react-redux';

import store from './src/store';
import DefaultApp from './src/App';

export default class App extends React.Component {
  render() {
    return (
      	<Provider store={store} >
      		<DefaultApp />
      	</Provider>
    );
  }
}
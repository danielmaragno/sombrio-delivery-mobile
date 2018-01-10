import React from 'react';
import { StackNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import { Text } from 'react-native'

import store from './store';

import Login from './components/Login';
import Register from './components/Register';

const AppNavigator = StackNavigator(
	{
    Login: {screen: Login},
    Register: {screen: Register},
	}
);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Current dev screen for hot reload
    // this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <Provider store={store}>
      	<AppNavigator />
      </Provider>
    );
  }
}

import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native'

import store from './store';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const LoginNavigator = StackNavigator(
	{
    Login: {screen: Login},
    Register: {screen: Register},
    // Home: {screen: Home}
	}
);


import routesList from './routes';
import DrawerMenu from './components/DrawerMenu';

let routes = {};
for(i in routesList)
  routes[routesList[i].key] = {screen: routesList[i].screen}

const AppNavigator = DrawerNavigator(
  routes,
  {
    contentComponent: DrawerMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
);

let Navigator = LoginNavigator;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {token: null}
    // Current dev screen for hot reload
    // this.props.navigation.navigate('Register');
  }

  async _checkToken() {
    const token = await AsyncStorage.getItem('token');
    this.setState({token: token})
  }

  componentWillMount() {
    this._checkToken();
  }

  render() {
    if(this.state.token){
      Navigator = AppNavigator;
    }

    return (
      <Provider store={store}>
      	<Navigator />
      </Provider>
    );
  }
}

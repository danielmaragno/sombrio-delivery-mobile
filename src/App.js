import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native'

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart';
import ExecOrder from './components/ExecOrder';
import AddressNew from './components/AddressNew';

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
routes['Cart'] = {screen: Cart}
routes['ExecOrder'] = {screen: ExecOrder}
routes['AddressNew'] = {screen: AddressNew}

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {token: null}
    // Current dev screen for hot reload
    // this.props.navigation.navigate('Register');
  }

  async _checkToken() {
    const token = await AsyncStorage.getItem('token');
    this.props.dispatch({type: 'FETCH_TOKEN', token: token})
    const id = await AsyncStorage.getItem('id');
    this.props.dispatch({type: 'FETCH_ID', id: id})
  }

  componentWillMount() {
    this._checkToken();
  }

  render() {
    
    if(this.props.user.token){
      Navigator = AppNavigator;
    }

    return (
      <Navigator />
    );
  }
}


const mapStateProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateProps,
  null
)(App)
import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { base_url } from './http_config';
import { fetchOrders } from './actions/ordersActions';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart';
import ExecOrder from './components/ExecOrder';
import AddressNew from './components/AddressNew';
import OrderExpand from './components/OrderExpand';

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
routes['OrderExpand'] = {screen: OrderExpand}

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

    setInterval(() => this.fetchOrders(), 15000);

  }

  fetchOrders() {
    // First off all, check out for a token (User have to be logged in)
    const { token } = this.props.user;
    if(token){
      // Alright, now lets check for a waiting order 
      const { orders } = this.props.orders;
      for(let i in orders){
        if(['requested', 'confirmed', 'on_road'].indexOf(orders[i].status) >= 0){
          this.props.dispatch(fetchOrders(token));
          break;
        }
      }
    }
  }

  async _checkToken() {
    const token = await AsyncStorage.getItem('token');
    this.props.dispatch({type: 'FETCH_TOKEN', token: token})
    const id = await AsyncStorage.getItem('id');
    this.props.dispatch({type: 'FETCH_ID', id: id})
    this.props.dispatch(fetchOrders(token));
  }

  componentWillMount() {
    this._checkToken();
    
  }

  render() {
    const { token } = this.props.user;
    if(token){
      Navigator = AppNavigator;
      // handleSocket(this.props.user.token);
    }

    return (
      <Navigator />
    );
  }
}


const mapStateProps = state => {
  return {
    user: state.user,
    orders: state.orders
  }
}

export default connect(
  mapStateProps,
  null
)(App)

const handleSocket = (token) => {

    const ws = new WebSocket('ws://'+base_url+'?token='+token);

    ws.onmessage = (e) => {
      console.log(e.data);
      console.log(token);
    }
}
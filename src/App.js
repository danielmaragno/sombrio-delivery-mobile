import React from 'react';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import OneSignal from 'react-native-onesignal';

import { base_url } from './http_config';

import { fetchOrders, updateOrderStatus } from './actions/ordersActions';
import { fetchUser, registerPlayerId } from './actions/userActions';

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
  
  }

  async _checkToken() {

    const token = await AsyncStorage.getItem('token');
    
    // if user logged in, link OneSignal player_id to this user
    if(token){

        const { dispatch } = this.props;

        OneSignal.addEventListener('ids', (device)=> {
          dispatch(registerPlayerId(token, device.userId));
        });

        OneSignal.addEventListener('received', this.handleNotification.bind(this));
        
        // Fetch token and stuff
        this.props.dispatch({type: 'FETCH_TOKEN', token: token})
        this.props.dispatch(fetchUser(token));
        this.props.dispatch(fetchOrders(token));
    }

      const id = await AsyncStorage.getItem('id');
      this.props.dispatch({type: 'FETCH_ID', id: id}); // User ID
      this.props.dispatch({type: 'CHANGE_ID', payload: {id: id}}); // Login ID

      const passwd = await AsyncStorage.getItem('passwd');
      this.props.dispatch({type: 'CHANGE_PASSWD', payload: {passwd: passwd}}); // Login Passwd
      
  }

  handleNotification(notification) {
    const { token } = this.props.user;
    this.props.dispatch(fetchOrders(token));
    
    // const data = notification.additionalData;
    // this.props.dispatch({
    //   type: 'UPDATE_ORDER_STATUS',
    //   order_id: data.order_id,
    //   status: data.status
    // })
  }

  componentWillMount() {
    this._checkToken();
    OneSignal.configure({});
    
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
    orders: state.orders,
    login: state.login
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
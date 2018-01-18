import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { viewStyle } from '../colors';
import Header from './Header';

import { fetchOrders } from '../actions/ordersActions';

class Orders extends React.Component {
	
	constructor(props) {
		super(props);

		const token  = this.props.user.token;
		const pos_id = this.props.pos.id; 
		this.props.dispatch(fetchOrders(pos_id, token))
	}

	render() {
		console.log(this.props.orders);
		return (
			<View style={viewStyle} >
				<Header title="Meus Pedidos"  navigate={this.props.navigation.navigate} />
			</View>
		);
	}
}

const mapStateProps = state => {
	return {
		user: state.user,
		pos: state.pos,
		orders: state.orders,
	}
}

export default connect(
	mapStateProps,
	null
)(Orders)
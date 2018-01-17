import React from 'react';
import { View, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { viewStyle } from '../colors';
import Header from './Header';

export default class Orders extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={viewStyle} >
				<Header title="Meus Pedidos"  navigate={this.props.navigation.navigate} />
			</View>
		);
	}
}

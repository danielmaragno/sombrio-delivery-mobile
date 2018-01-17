import React from 'react';
import { View, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { viewStyle } from '../colors';
import Header from './Header';

export default class Address extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={viewStyle} >
				<Header title="Endereço"  navigate={this.props.navigation.navigate} />
			</View>
		);
	}
}

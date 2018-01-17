import React from 'react';
import { View, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { colorsTable, headerStyle,headerTitleStyle, viewStyle } from '../colors';
import Header from './Header'

export default class Home extends React.Component {
	
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
	    // drawerLabel: "Teste"
  	}

	render() {
		return (
			<View style={viewStyle}>
				<Header title="SOMBRIO DELIVERY"  navigate={this.props.navigation.navigate} />
					
			</View>
		);
	}
}

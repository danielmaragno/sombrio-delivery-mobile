import React from 'react';
import { View, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { colorsTable, headerStyle,headerTitleStyle, viewStyle } from '../colors';
import { Header } from 'react-native-elements';

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
				<Header 
					leftComponent={{ icon: 'menu', color: headerTitleStyle.color, onPress: () => this.props.navigation.navigate('DrawerOpen') }}
  					centerComponent={{ text: 'SOMBRIO DELIVERY', style: { color: '#fff' } }}
  					rightComponent={{ icon: 'home', color: headerTitleStyle.color, onPress: () => this.props.navigation.navigate('Home') }}
				/>
					
			</View>
		);
	}
}

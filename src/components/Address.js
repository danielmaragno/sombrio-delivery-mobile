import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { viewStyle } from '../colors';
import Header from './Header';

class Address extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		const { address } = this.props.user;

		return (
			<View style={viewStyle} >
				<Header title="Endereço"  navigate={this.props.navigation.navigate} />
				<KeyboardAvoidingView>
					<Card containerStyle={{display: "none"}}>
						<Text style={{textAlign: 'center', fontWeight: 'bold', color: '#444'}}>
							Você ainda não possui endereço!
						</Text>
					</Card>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

const mapStateProps = state => {
	return {
		user: state.user,
	}
}

export default connect(
	mapStateProps,
	null
)(Address)
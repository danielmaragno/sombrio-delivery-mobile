import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorsTable, viewStyle } from '../colors';
import Header from './Header';

import { updateAddress } from '../actions/userActions';

class Address extends React.Component {
	
	constructor(props) {
		super(props);
	}

	// Alerts
	showUpdateAddressOk() {
		Alert.alert(
			'Confirmado',
      		'Seu endereço foi atualizado com sucesso.'
		)
		this.props.dispatch({type: 'ADDRESS_UPDATE_FALSE'})
	}

	// Regular functions

	changeAddress(a) {
		this.props.dispatch({type: 'UPDATE_USER_ADDRESS', address: a})
	}

	updateAddress() {
		const { token, address } = this.props.user;
		this.props.dispatch(updateAddress(token, address));
	}

	componentDidUpdate() {
		const { addressUpdateOk } = this.props.user;
		if(addressUpdateOk){
			this.showUpdateAddressOk();
		}
	}

	render() {
		const { address } = this.props.user;
		
		return (
			<View style={viewStyle} >
				<Header title="Endereço"  navigate={this.props.navigation.navigate} />
				<KeyboardAvoidingView>
					<Card containerStyle={address ? {display: "none"} : {}}>
						<Text style={{textAlign: 'center', fontWeight: 'bold', color: '#444'}}>
							Você ainda não informou endereço!
						</Text>
					</Card>

					<Card>
						<FormInput 
							placeholder="Informe um endereço"
							value={address}
							onChangeText={(a) => this.changeAddress(a)}
						/>
						<Button 
							backgroundColor={colorsTable.primary}
							title='SALVAR ENDEREÇO'
							loading={this.props.user.isLoadingAddressUpdate}
							onPress={this.updateAddress.bind(this)}
						/>
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
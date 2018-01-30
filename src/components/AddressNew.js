import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text } from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorsTable, viewStyle } from '../colors';
import Header from './Header';
import { Col, Row, Grid } from "react-native-easy-grid";

import { updateAddress } from '../actions/userActions';

class AddressNew extends React.Component {

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

	updateAddress() {
		const { address } = this.props;
		const { token } = this.props.user;
		
		const newAddress = address.cidade+";"+address.bairro+";"+address.rua+";"+address.complemento+";"+address.referencia;
		
		this.props.dispatch(updateAddress(token, newAddress));
	}

	componentDidUpdate() {
		const { addressUpdateOk } = this.props.user;
		if(addressUpdateOk){
			this.showUpdateAddressOk();
		}
	}

	render() {
		
		const { address, dispatch } = this.props;

		return (
			<View style={viewStyle}>
				<Header title="Editar Endereço"  navigate={this.props.navigation.navigate} />

				<ScrollView>
					<KeyboardAwareScrollView style={{marginBottom: 10}}>
						<Card>
							
							<FormLabel>Cidade</FormLabel>
							<FormInput  
								value={address.cidade}
								onChangeText={(cidade) => dispatch({type: 'SET_CIDADE', cidade: cidade})}
							/>

							<FormLabel>Bairro</FormLabel>
							<FormInput  
								value={address.bairro}
								onChangeText={(bairro) => dispatch({type: 'SET_BAIRRO', bairro: bairro})}
							/>							

							<FormLabel>Endereço</FormLabel>
							<FormInput  
								value={address.rua}
								onChangeText={(rua) => dispatch({type: 'SET_RUA', rua: rua})}
							/>
							
							<FormLabel>Complemento</FormLabel>
							<FormInput 
								value={address.complemento}
								onChangeText={(complemento) => dispatch({type: 'SET_COMPLEMENTO', complemento: complemento})}
							/>
							
							<FormLabel>Referência</FormLabel>
							<FormInput 
								value={address.referencia}
								onChangeText={(referencia) => dispatch({type: 'SET_REFERENCIA', referencia: referencia})}
							/>

						</Card>
					</KeyboardAwareScrollView>	
				</ScrollView>
				<View>
					<Button
						large
						backgroundColor={colorsTable.primary}
						containerViewStyle={{width: '100%', marginLeft:0}}
						title='SALVAR ENDEREÇO'
						onPress={this.updateAddress.bind(this)}
						loading={this.props.user.isLoadingAddressUpdate}
					/>
				</View>
			</View>
		);
	}
}

const mapStateProps = state => {
	return {
		user: state.user,
		address: state.address
	}
}

export default connect(
	mapStateProps,
	null
)(AddressNew)
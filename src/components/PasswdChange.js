import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text } from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorsTable, viewStyle } from '../colors';
import Header from './Header';

import { updatePasswd } from '../actions/userActions';

class PasswdChange extends React.Component {
	
	constructor(props) {
		super(props);
	}

	updatePasswd() {
		const { newPasswd, newPasswdConfirm } = this.props.passwdChange;
		const { token } = this.props.user;

		if(!newPasswd){
			this._triggerAlert("Ops!","Desculpe, a senha não pode ser nula :/");
		}
		else if(newPasswd === newPasswdConfirm){
			this.props.dispatch(updatePasswd(token, newPasswd));
		}
		else {
			this._triggerAlert("Ops!","As senhas não conhecidem. Por favor, repira a operação.");
		}
	}

	_triggerAlert(title, message) {
		Alert.alert(title, message)
	}

	componentDidUpdate() {
		const { responseFlag } = this.props.passwdChange;
		const { dispatch } = this.props;

		if(responseFlag){
			dispatch({type: 'SET_PASSWD_CHANGE_RESPONSE_FLAG', responseFlag: false});

			switch(responseFlag) {
				case 200: {
					this._triggerAlert(
						"Sucesso",
						"Sua senha foi alterada com sucesso!"
					)
					dispatch({type: 'RESET_PASSWD_CHANGE'});					
					break;
				}
			}
		}
	}

	render() {
		
		const { dispatch } = this.props;
		const { newPasswd, newPasswdConfirm, isLoading } = this.props.passwdChange;

		return (
			
			<View style={viewStyle}>
				<Header title={"Alterar Senha"}  navigate={this.props.navigation.navigate} />
				
				<ScrollView>
					<Card>
						<KeyboardAwareScrollView style={{marginBottom: 10}}>
							<FormLabel>Nova Senha</FormLabel>
							<FormInput  
								secureTextEntry={true}
								autoCapitalize='none'
								value={newPasswd}
								onChangeText={(newPasswd) => dispatch({
									type: 'SET_PASSWD_CHANGE_NEW_PASSWD', 
									newPasswd: newPasswd
								})}
							/>

							<FormLabel>Confirme a Nova Senha</FormLabel>
							<FormInput
								secureTextEntry={true}
								autoCapitalize='none'
								value={newPasswdConfirm}
								onChangeText={(newPasswdConfirm) => dispatch({
									type: 'SET_PASSWD_CHANGE_NEW_PASSWD_CONFIRM', 
									newPasswdConfirm: newPasswdConfirm
								})}
							/>							
						</KeyboardAwareScrollView>
					</Card>
				</ScrollView>
				<View>
					<Button
						large
						backgroundColor={colorsTable.primary}
						containerViewStyle={{width: '100%', marginLeft:0}}
						title='ALTERAR SENHA'
						onPress={this.updatePasswd.bind(this)}
						loading={isLoading}
					/>
				</View>

			</View>

		);
	}
}

const mapStateProps = state => {
	return {
		user: state.user,
		passwdChange: state.passwdChange
    }
}

export default connect(
	mapStateProps,
	null
)(PasswdChange)

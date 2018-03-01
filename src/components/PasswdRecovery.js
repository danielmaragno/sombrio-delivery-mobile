import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, Text } from 'react-native';
import { Header, FormLabel, FormInput, Button, Avatar, Card } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colorsTable, headerStyle,headerTitleStyle, viewStyle } from '../colors';

import { changeId, execPasswdRecovery } from '../actions/loginActions';

class PasswdRecovery extends React.Component {
	
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
	   header: null,
	}

	execPasswdRecovery() {
		const { id } = this.props.login;
		this.props.dispatch(execPasswdRecovery(id));
	}

	//
	// After update
	//

	componentDidUpdate(){
		const { responseFlag } = this.props.passwdRecovery;

		if(responseFlag){
			this.props.dispatch({type: "SET_PASSWD_RECOVERY_RESPONSE_FLAG", responseFlag: false});
			
			switch(responseFlag){
				case 200: {
					this._triggerAlert(
						"Sucesso",
						"Sua nova senha foi enviado para seu email :)"
					)
					this.props.navigation.goBack();
					break;
				}
				case 404: {
					this._triggerAlert(
						"Tem certeza?",
						"Este e-mail não consta em nossos registros. Por favor registre-se ou entre em contato conosco."
					)
					break;
				}
				case 500: {
					this._triggerAlert(
						"Falha Nossa!",
						"Desculpe, nosso servidor está passando por alguns reparos no monento. Por favor, tente novamente mais tarde ou entre em contato conosco."
					)
					break;
				}
			}
		}
	}	 

	//
	// Alert
	//

	_triggerAlert(title, message) {
		Alert.alert(
			title,
			message
		)
	}

	render() {
		
		const { goBack } 	= this.props.navigation;
		const { id } 		= this.props.login;
		const { isLoading } = this.props.passwdRecovery;

		return (
			
			<View style={viewStyle}>
      		
		    	<Header
		          outerContainerStyles={headerStyle}
		          leftComponent={{icon: 'keyboard-backspace', color: '#fff', onPress: () => goBack()}}
		          centerComponent={<Text style={{color: '#fff', fontSize: 16}}>Esqueci Minha Senha</Text>}
		          rightComponents={{}}
		        />
		      		

		  	    <KeyboardAwareScrollView>	
		          <View style={{marginBottom: 10}}> 
		            <Card title="Recuperar Senha">
		              <FormLabel>Email</FormLabel>
	    	    		<FormInput 
	    					value={id}
	    					onChangeText={(id) => this.props.dispatch(changeId(id))} 
	    	    		/> 

		    				
	    	    		<Button
	    	     			backgroundColor={colorsTable.primary}
	    	     			raised
	    	     			title='RECUPERAR SENHA'
	    	     			loading={isLoading}
	    	     			onPress={this.execPasswdRecovery.bind(this)}
	    	     		/>
		    		</Card>
		          </View>
		        </KeyboardAwareScrollView>
		 
		    	</View>
		);
	}
}


const mapStateProps = state => {
	return {
		login: state.login,
		passwdRecovery: state.passwdRecovery
	}
}

export default connect(
	mapStateProps,
	null
)(PasswdRecovery)
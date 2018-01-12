import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { View, Alert, KeyboardAvoidingView } from 'react-native';
import { Header, FormLabel, FormInput, Button, Avatar, Card } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colorsTable, headerStyle,headerTitleStyle, viewStyle } from '../colors';

import { 
	changeId, changePasswd, changePasswdConf, changeName, 
	execRegister, 
	resetPasswd 
} from '../actions/registerActions';

class Register extends React.Component {
  
  constructor(props) {
    super(props); 
  }

  static navigationOptions = {
    // header: null
    title: 'Registrar-se',
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerTintColor: headerTitleStyle.color
  }

  confirmPasswd() {
  	const register = this.props.register;
  	return (
		register.passwd === register.passwdConf
  	)
  }


  execRegister() {
  	if(this.confirmPasswd()){
  		const client = {
  			id: this.props.register.id,
  			passwd: this.props.register.passwd,
  			name: this.props.register.name
  		}
  		this.props.dispatch(execRegister(client));

  	}
  	else{
  		this.showAlertConfirmPasswdError();
  		this.props.dispatch(resetPasswd());
  	}

  }

  //
  // After update
  //

  componentDidUpdate(nextProps){
    if(this.props.register.errorFlag) {
    	this.showAlertDuplicateId()
    	this.props.dispatch({type: 'REGISTER_RESET_FLAGS'})
    }
    else if(this.props.register.okFlag) {
    	AsyncStorage.removeItem('token');
    	// Clear SENHA field
    	this.props.dispatch({type: 'LOGIN_CLEAR_PASSWD_FIELD'});
    	// Reset flags 
    	this.props.dispatch({type: 'REGISTER_RESET_FLAGS'});
    	// Change ID to appear in Login Page
    	this.props.dispatch({type: 'CHANGE_ID', payload: {id: this.props.register.id}});
    	// Go back to login page
    	this.props.navigation.goBack();
    }
  } 
  
  //
  // Alerts
  //

  showAlertConfirmPasswdError() {
  	Alert.alert(
		'Erro',
		'Confirmação de senha.'
  	)
  }
  showAlertDuplicateId() {
  	Alert.alert(
		'Erro',
		'O Email informado já existe em nossos registros. Por favor, entre em contato conosco.'
  	)
  }

  render() {
    return (
    	
    	<KeyboardAwareScrollView>
    		
    	<View style={viewStyle}>
      		{/*
      		<Header 
				leftComponent={{icon: 'arrow-back', color: 'white', onPress: () => this.props.navigation.goBack()}}
				centerComponent={{text: 'Registre-se', style: {color: 'white'} }}
				rightComponents={{}} 
			/> 
      		*/}

			<Card title="Cadastro">
	    		<FormLabel>Nome</FormLabel>
	    		<FormInput 
					value={this.props.register.name}
					onChangeText={(name) => this.props.dispatch(changeName(name))} 
	    		/> 

				<FormLabel>Email</FormLabel>
	    		<FormInput 
					value={this.props.register.id}
					onChangeText={(id) => this.props.dispatch(changeId(id))}
	    			keyboardType='email-address'
	    			autoCapitalize='none'
	    		/>
				
				<FormLabel>Senha</FormLabel>
	    		<FormInput 
					value={this.props.register.passwd}
					onChangeText={(passwd) => this.props.dispatch(changePasswd(passwd))} 
	    			secureTextEntry={true}
	    			autoCapitalize='none'
	    		/>

	    		<FormLabel>Confirme a Senha</FormLabel>
	    		<FormInput 
					value={this.props.register.passwdConf}
					onChangeText={(passwdConf) => this.props.dispatch(changePasswdConf(passwdConf))} 
	    			secureTextEntry={true}
	    			autoCapitalize='none'
	    		/>

	    		<Button
	     			backgroundColor={colorsTable.primary}
	     			raised
	     			title='REGISTRAR'
	     			loading={this.props.register.isLoading}
	     			onPress={this.execRegister.bind(this)}
	     		/>
			</Card>

			{/*
			<View style={{position: 'absolute', left:0, right:0, bottom:0}}>
				<Button
					title="Registrar-se"
				 />
			</View>
			*/}
 
    	</View>
    	</KeyboardAwareScrollView>
    );
  }
}

const mapStateProps = state => {
	return {
		register: state.register,
		login: state.login
	}
}

export default connect(
	mapStateProps,
	null
)(Register)
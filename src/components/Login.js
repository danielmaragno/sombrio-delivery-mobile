import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { View, Alert } from 'react-native'
import { Header, FormLabel, FormInput, Button, Avatar, Card } from 'react-native-elements'
import { colorsTable, headerStyle, headerTitleStyle, viewStyle } from '../colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { changeId, changePasswd, execLogin, clearPasswdField } from '../actions/loginActions';

class Login extends React.Component {
  
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Sombrio Delivery',
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle
  }

  async _checkAyncStorageToken() {
    const token = await AsyncStorage.getItem('token');
  }

  execLogin() {
  	const info = {
  		scope: 'client',
  		id: this.props.login.id,
  		passwd: this.props.login.passwd
  	}
  	this.props.dispatch(execLogin(info));
  }

  changeId(id) {
  	this.props.dispatch(changeId(id))
  }

  changePasswd(passwd) {
  	this.props.dispatch(changePasswd(passwd))	
  }

  showAlert() {
  	const errorAlert = Alert.alert(
		'Erro',
		'Email ou Senha incorretos. Por favor, repita a operação.'
  	)
  	this.props.dispatch(clearPasswdField())
  }

  async _checkToken() {
    const token = await AsyncStorage.getItem('token');
    // console.log(token);
  }

  goToRegister() {
    this.props.navigation.navigate('Register');
  }

  componentDidUpdate(nextProps){
    if(this.props.login.errorFlag){
      this.showAlert()
    }
    // navigate to Home Page
  } 


  render() {	
  	
    return (

      <KeyboardAwareScrollView>
    	<View style={viewStyle}>
    		{/*
        <Header
          leftComponent={{icon: 'home', color: 'white'}}
          centerComponent={{text: 'Sombrio Delivery', style: {color: 'white'} }}
          rightComponents={{}}
        />
        */}
    		
    		<Card title="Entrar"> 
	    		<FormLabel>Email</FormLabel>
	    		<FormInput 
					value={this.props.login.id}
					onChangeText={(id) => this.changeId(id)}
	    			keyboardType='email-address'
	    			autoCapitalize='none'
	    		/> 
	    		<FormLabel>Senha</FormLabel>
	    		<FormInput 
					value={this.props.login.passwd}
					onChangeText={(passwd) => this.changePasswd(passwd)} 
	    			secureTextEntry={true}
	    			autoCapitalize='none'
	    		/> 

	     		<Button
	     			onPress={this.execLogin.bind(this)}
	     			backgroundColor={colorsTable.primary}
	     			raised
	     			title='ENTRAR'
	     			loading={this.props.login.isLoading}
	     		/>
    		</Card>

			
  			<Card title="Não possui cadastro?"> 
  				<Button 
  					title="REGISTRAR-SE"
            onPress={this.goToRegister.bind(this)}
  				/>
  			</Card> 

     	</View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateProps = state => {
	return {
		login: state.login
	}
}

export default connect(
	mapStateProps,
	null
)(Login)
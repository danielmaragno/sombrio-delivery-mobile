import { request } from '../http_config';
import { AsyncStorage } from 'react-native';
import RNRestart from 'react-native-restart';

export function changeId(id) {
	return {
		type: 'CHANGE_ID',
		payload: { id: id }
	}
}

export function changePasswd(passwd) {
	return {
		type: 'CHANGE_PASSWD',
		payload: { passwd: passwd }
	}
}

export function execLogin(info) {
	AsyncStorage.setItem("id", info.id);
	AsyncStorage.setItem("passwd", info.passwd);

	return (dispatch) => {
		dispatch({type: "EXEC_LOGIN", payload: {}})
		
		request('/auth/login', 'POST', {info: info})
		.then((response) => {
			const responseBody = JSON.parse(response._bodyText)
			
			// Set token and Item in permanent Storage.
			AsyncStorage.setItem("token", responseBody.token);

			dispatch({
				type: 'EXEC_LOGIN_FULFILLED',
				payload: {
					token: responseBody.token
				}
			})
			RNRestart.Restart();
		})
		.catch((error) => {
			console.log(error);
			dispatch({type: 'EXEC_LOGIN_REJECTED'})
		})
	} 
}

export function setFlagErrorFalse() {
	return {
		type: 'LOGIN_FLAG_ERROR_FALSE'
	}
}

export function clearPasswdField() {
	return {
		type: 'LOGIN_CLEAR_PASSWD_FIELD'
	}
}
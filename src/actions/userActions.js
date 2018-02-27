import { request, request_get } from '../http_config';
import { AsyncStorage } from 'react-native';
import RNRestart from 'react-native-restart';

export function fetchUser(token) {
	return (dispatch) => {
		request_get('/client', token)
		
		.then((response) => {
			if(response.status === 200){
				const responseBody = JSON.parse(response._bodyText);
				// console.log(responseBody)
				dispatch({
					type: 'FETCH_USER',
					id: responseBody.id,
					name: responseBody.name,
					address: responseBody.address
				})
			}
			else{
				console.log(response);
			}
		})
		
		.catch((error) => {
			console.log(error);
		})
	}
}

export function logout(token, player_id) {
	return (dispatch) => {
		request_get('/auth/logout?player_id='+player_id, token)
		
		.then((response) => {
			if(response.status === 200){
				AsyncStorage.removeItem('token');
				RNRestart.Restart();
			}
			else{
				console.log(response);
			}
		})
		
		.catch((error) => {
			console.log(error);
		})
	}
}

export function updateAddress(token, address){
	return (dispatch) => {
		dispatch({type: 'LOADING_ADDRESS_UPDATE_TRUE'})

		request('/client', 'PUT', {required_data: {address: address}}, token)

		.then((response) => {
			dispatch({type: 'LOADING_ADDRESS_UPDATE_FALSE'})
			
			if(response.status === 200){
				dispatch({type: 'ADDRESS_UPDATE_TRUE'})
				dispatch({type: 'UPDATE_USER_ADDRESS', address: address})
			}
			else {
				console.log(response)
			}
		})

		.catch((error) => {
			dispatch({type: 'LOADING_ADDRESS_UPDATE_FALSE'})
			console.log(error);
		})
	}
}

export function registerPlayerId(token, player_id) {
	return (dispatch) => {
		request('/client/player_id', 'POST', {player_id: player_id}, token)

		.then((response) => {
			if(response.status === 200) {
				dispatch({type: 'FETCH_PLAYER_ID', player_id: player_id})
				// console.log('TUDO AZUL');
			}
			else {
				console.log(response)
			}
		})

		.catch((error) => {
			console.log(error);
		})
	}
}
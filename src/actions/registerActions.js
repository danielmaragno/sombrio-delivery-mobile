import { request } from '../http_config';

export function changeId(id) {
	return {
		type: 'REGISTER_CHANGE_ID',
		payload: id
	}
}
export function changePasswd(passwd) {
	return {
		type: 'REGISTER_CHANGE_PASSWD',
		payload: passwd
	}
}
export function changePasswdConf(passwdConf) {
	return {
		type: 'REGISTER_CHANGE_PASSWD_CONF',
		payload: passwdConf
	}
}
export function changeName(name) {
	return {
		type: 'REGISTER_CHANGE_NAME',
		payload: name
	}
}

export function execRegister(client) {
	AsyncStorage.setItem("id", info.id);
	AsyncStorage.setItem("passwd", null); //reset passwd when register
	
	return (dispatch) => {
		
		dispatch({type: 'EXEC_REGISTER'})
		
		request('/client', 'POST', {client: client})
		.then((response) => {
			switch(response.status){
				// error
				case 400: {
					dispatch({type: 'EXEC_REGISTER_ERROR_ID_CUPLICATE'});
					break;
				}
				case 500: {
					dispatch({type: 'REGISTER_RESET_FLAGS'});
					break;
				}
				// ok
				default: {
					dispatch({type: 'EXEC_REGISTER_OK'});
					break;
				}
			}
		})
		.catch((error) => {
			console.log(error);
		})
	}
}

export function resetPasswd() {
	return {
		type: 'REGISTER_RESET_PASSWD'
	}
}
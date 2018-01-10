
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
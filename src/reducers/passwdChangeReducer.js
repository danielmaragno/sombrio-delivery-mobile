const initialState = {
	newPasswd: null,
	newPasswdConfirm: null,

	isLoading: false,
	responseFlag: false
}

export default function reducer(state=initialState, action) {

	switch(action.type){
		case 'RESET_PASSWD_CHANGE': {
			return Object.assign({}, initialState)
		}
		
		case 'SET_PASSWD_CHANGE_NEW_PASSWD': {
			return {...state, newPasswd: action.newPasswd}
		}
		case 'SET_PASSWD_CHANGE_NEW_PASSWD_CONFIRM': {
			return {...state, newPasswdConfirm: action.newPasswdConfirm}
		}

		case 'SET_PASSWD_CHANGE_IS_LOADING': {
			return {...state, isLoading: action.isLoading}
		}
		case 'SET_PASSWD_CHANGE_RESPONSE_FLAG': {
			return {...state, responseFlag: action.responseFlag}
		}
	}

	return state;
}
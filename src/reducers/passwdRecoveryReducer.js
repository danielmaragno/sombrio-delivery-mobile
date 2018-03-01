const initialState = {
	isLoading: false,

	responseFlag: false // 200 - Ok / 404 - email não existe / 500 - internal server error
}

export default function reducer(state=initialState, action) {

	switch (action.type) {
		case 'SET_PASSWD_RECOVERY_IS_LOADING': {
			return {...state, isLoading: action.isLoading}
		}
		case 'SET_PASSWD_RECOVERY_RESPONSE_FLAG': {
			return {...state, responseFlag: action.responseFlag}	
		}
	}

	return state;
}
const initialState = {
	cidade: "",
	bairro: "",
	rua: "",
	complemento: "",
	referencia: "",
}

export default function reducer(state=initialState, action) {

	switch(action.type){
		case 'RESET_ADDRESS': {
			return {
				...state,
				rua: "",
				bairro: "",
				complemento: "",
				referencia: "",
				cidade: ""
			}
		}

		case 'SET_RUA': {
			return {...state, rua: action.rua}
		}
		case 'SET_BAIRRO': {
			return {...state, bairro: action.bairro}
		}
		case 'SET_COMPLEMENTO': {
			return {...state, complemento: action.complemento}
		}
		case 'SET_REFERENCIA': {
			return {...state, referencia: action.referencia}
		}
		case 'SET_CIDADE': {
			return {...state, cidade: action.cidade}
		}
	}

	return state;
}
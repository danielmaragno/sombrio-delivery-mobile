const initialState = {
	orders: []
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'FETCH_ORDERS': {
			return {...state, orders: action.orders}
		}
	}

	return state;
}
const initialState = {
	items: [],
	total_price: 0
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'ADD_ITEM_TO_CART': {
			return {...state, items: action.items, total_price: action.total_price}
		}
		case 'RESET_CART': {
			return initialState
		}
	}

	return state;
}
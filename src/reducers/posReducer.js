const initialState = {
	id: 'pao_mel',
	name: null,
	image: null,
	deliveryPrice: null,
	formasPagamento: [],
	items: [],
	open: false
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'FETCH_POS': {
			return {
				...state,
				name: action.pos.name,
				image: action.pos.image,
				deliveryPrice: action.pos.deliveryPrice,
				formasPagamento: action.pos.formasPagamento,
				open: action.pos.open
			}
		}
		case 'FETCH_ITEMS': {
			return {...state, items: action.items}
		}
	}

	return state;
}
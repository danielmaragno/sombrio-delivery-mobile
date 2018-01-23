const initialState = {
	item: {},
	qtd: 1,
	visible: false
}

export default function reducer(state=initialState, action) {

	switch(action.type) {
		case 'FETCH_MODAL_ITEM': {
			return {...state, item: action.item, qtd: initialState.qtd}
		}
		case 'SET_MODAL_ITEM_VISIBLE': {
			return {...state, visible: action.visible}
		}
		case 'SET_ITEM_MODAL_QTD': {
			return {...state, qtd: action.qtd}
		}
	}

	return state;
}
const initialState = {
	items: [
        // {
        //     "name" : "Pão de Mel com Chocolate", 
        //     "price_un" : 450, 
        //     "qtd" : 2, 
        //     "_id" : "5a398818c53e5967d74438ac"
        // }, 
        // {
        //     "name" : "Pão de mel com Doce de Leite", 
        //     "price_un" : 500, 
        //     "qtd" : 4, 
        //     "_id" : "5a398818c53e5967d74438ab"
        // }
    ],
	observacao: "",
	formaPagamento: "",
	change: "0", //troco

	execOrderLoading: false,
	execOrderAlertSuccess: false
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'ADD_ITEM_TO_CART': {
			return {...state, items: action.items}
		}
		case 'SET_OBSERVACAO': {
			return {...state, observacao: action.observacao}
		}
		case 'TURN_CART_EMPTY': {
			return {
				...state, 
				items: [], 
				observacao: initialState.observacao,
				formaPagamento: "",
				change: "0",
				execOrderLoading: false,
				execOrderAlertSuccess: false
			}
		}
		case 'NEW_CART_ITEMS_ARRAY': {
			return {
				...state,
				items: action.items
			}
		}
		case 'SET_CART_FORMA_PAGAMENTO': {
			return {...state, formaPagamento: action.formaPagamento}
		}
		case 'SET_CART_CHANGE': {
			return {...state, change: action.change}
		}
		case 'EXEC_ORDER_SET_LOADING': {
			return {...state, execOrderLoading: action.loading}
		}
		case 'EXEC_ORDER_SET_ALERT_SUCCESS': {
			return {...state, execOrderAlertSuccess: action.alert}
		}
	}

	return state;
}
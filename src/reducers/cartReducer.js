const initialState = {
	items: [
        {
            "name" : "Pão de Mel com Chocolate", 
            "price_un" : 450, 
            "qtd" : 2, 
            "_id" : "5a398818c53e5967d74438ac"
        }, 
        {
            "name" : "Pão de mel com Doce de Leite", 
            "price_un" : 500, 
            "qtd" : 4, 
            "_id" : "5a398818c53e5967d74438ab"
        },
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
        // },
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
        // },
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
        // },
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
        // },
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
	observacao: ""
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'ADD_ITEM_TO_CART': {
			return {...state, items: action.items}
		}
		case 'RESET_CART': {
			return initialState
		}
		case 'SET_OBSERVACAO': {
			return {...state, observacao: action.observacao}
		}
		case 'TURN_CART_EMPTY': {
			return {
				...state, 
				items: [], 
				observacao: initialState.observacao
			}
		}
		case 'NEW_CART_ITEMS_ARRAY': {
			return {
				...state,
				items: action.items
			}
		}
	}

	return state;
}
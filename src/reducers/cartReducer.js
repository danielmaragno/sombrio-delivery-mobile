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
        {
            "name" : "Pão de Mel com Chocolate", 
            "price_un" : 450, 
            "qtd" : 2, 
            "_id" : "5a398818c53e5967d74438ac"
        }, 
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
	total_price: 0,
	observacao: ""
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'ADD_ITEM_TO_CART': {
			return {...state, items: action.items, total_price: action.total_price}
		}
		case 'RESET_CART': {
			return initialState
		}
		case 'SET_OBSERVACAO': {
			return {...state, observacao: action.observacao}
		}
	}

	return state;
}
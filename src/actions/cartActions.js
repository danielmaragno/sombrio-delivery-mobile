
export function addItemToCart(item, cart) {
	cart.items.push(item);
	const total_price = calcTotalPrice(cart.items);

	return {
		type: 'ADD_ITEM_TO_CART',
		items: cart.items
	}
}

export function removeCartItem(index, cart) {
	let newItems = [].concat(cart.items);
	newItems.splice(index,1);

	return { type: 'NEW_CART_ITEMS_ARRAY', items: newItems}
}

function calcTotalPrice(items) {
	let total_price = 0;

	for(let i in items){
		total_price += (items[i].price_un * items[i].qtd)
	}

	return total_price;
}

export function calcTotalPrice(cart) {
	let total_price = 0;
	
	for(let i in cart.items){
		total_price += (cart.items[i].price_un * cart.items[i].qtd)
	}

	return total_price;
}
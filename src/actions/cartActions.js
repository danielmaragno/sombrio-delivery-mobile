
export function addItemToCart(item, cart) {
	cart.items.push(item);
	const total_price = calcTotalPrice(cart.items);

	return {
		type: 'ADD_ITEM_TO_CART',
		items: cart.items,
		total_price: total_price
	}
}

function calcTotalPrice(items) {
	let total_price = 0;

	for(let i in items){
		total_price += (items[i].price_un * items[i].qtd)
	}

	return total_price;
}
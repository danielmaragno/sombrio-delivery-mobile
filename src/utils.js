import Moment from 'moment';

export function formatMonetary(price){
	return (price/100).toFixed(2).replace(".",",")
}

export function formatDateTime(date){
	return Moment(date).format('DD/MM/YYYY HH:mm');
}

export function randomString() {
	return String(Math.random())
}

export function formatAddress(address) {
	let formatedString = "";
	
	if(address){
		const addressSplited = address.split(';');
		for(let i in addressSplited){
			if(addressSplited[i]){
				formatedString += addressSplited[i]+'\n';
			}
		}
	}
	return formatedString.trim();
}
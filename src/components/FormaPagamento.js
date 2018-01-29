import React from 'react';
import { connect } from 'react-redux';
import { Picker } from 'react-native';

class FormaPagamento extends React.Component {

	constructor(props) {
		super(props);
	}

	changeFormaPagamento(formaPagamento) {
		this.props.dispatch({type: 'SET_CART_FORMA_PAGAMENTO', formaPagamento: formaPagamento})
	}

	sortFormasPagamentoItem(formasPagamento) {
		let list = [];

		if(formasPagamento.indexOf('dinheiro') >= 0){
			list.push({label: "Dinheiro", value: 'dinheiro'})
		}
		if(formasPagamento.indexOf('debito-master') >= 0){
			list.push({label: "Débito Master Card", value: 'debito-master'})	
		}
		if(formasPagamento.indexOf('debito-visa') >= 0){
			list.push({label: "Débito Visa", value: 'debito-visa'})
		}
		if(formasPagamento.indexOf('debito-elo') >= 0){
			list.push({label: "Débito Elo", value: 'debito-elo'})
		}
		if(formasPagamento.indexOf('credito-master') >= 0){
			list.push({label: "Crédito Master Card", value: 'credito-master'})
		}
		if(formasPagamento.indexOf('credito-visa') >= 0){
			list.push({label: "Crédito Visa", value: 'credito-visa'})
		}
		if(formasPagamento.indexOf('credito-elo') >= 0){
			list.push({label: "Crédito Elo", value: 'credito-elo'})
		}

		return list;
	}

	render() {
		
		const { pos, cart } = this.props;
		const sortedFormasPagamentoList = this.sortFormasPagamentoItem(pos.formasPagamento);

		return (
			<Picker
				selectedValue={cart.formaPagamento}
				onValueChange={(itemValue, itemIndex) => this.changeFormaPagamento(itemValue)}
			>
				<Picker.Item label="Selecione a forma de pagamento" value=""/>
				{
					sortedFormasPagamentoList.map((item, index) => (
						<Picker.Item key={index} label={item.label} value={item.value} />
					))
				}
				
			</Picker>
		);
	}
}

const mapStateProps = state => {
	return {
		pos: state.pos,
		cart: state.cart
	}
}

export default connect(
	mapStateProps,
	null
)(FormaPagamento)
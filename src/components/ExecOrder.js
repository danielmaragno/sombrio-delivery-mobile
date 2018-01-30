import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card, Button, Divider, FormLabel } from 'react-native-elements';
import Header from './Header';
import FormaPagamento from './FormaPagamento';
import { viewStyle, headerStyle, listItemStyle, colorsTable } from '../colors';
import { formatMonetary, formatAddress } from '../utils';

import { calcTotalPrice, execOrder } from '../actions/cartActions';

class ExecOrder extends React.Component {
	
	constructor(props) {
		super(props);
	}

	changeObservacao(observacao) {
		this.props.dispatch({type: 'SET_OBSERVACAO', observacao: observacao})
	}

	execOrder() {
		const { pos, cart, user } = this.props;
		if(!user.address){
			this._missingAddressAlert()
			return;
		}
		if(!cart.formaPagamento){
			this._missingFormaPagamentoAlert()
			return;
		}
		
		const info = {
			formaPagamento: cart.formaPagamento,
			observacao: cart.observacao,
			items: cart.items
		}
		
		this.props.dispatch(execOrder(info, cart.items, pos.id, user.token));
	}

	_missingAddressAlert() {
		Alert.alert(
			'Atenção',
			'Por favor, informe um endereço para entrega',
			[
				{text: 'Cancelar'},
				{text: 'Ok', onPress: () => this.props.navigation.navigate('Address')}
			]
		)
	}

	_missingFormaPagamentoAlert() {
		Alert.alert(
			'Atenção',
			'Por favor, informe a forma de pagamento'
		)
	}

	_execOrderSuccessAlert() {
		Alert.alert(
			'Sucesso',
			'Seu pedido foi enviado com sucesso'
		)
		this.props.dispatch({type: 'TURN_CART_EMPTY'})
		this.props.navigation.navigate('Orders');
	}

	componentDidUpdate() {
		if(this.props.cart.execOrderAlertSuccess){
			this._execOrderSuccessAlert();
		}
	}

	render() {

		const { pos, cart, user } = this.props;
		const viewModifiedStyle = {...viewStyle, paddingBottom: 0}
		
		return (
			<View style={viewModifiedStyle}>
				<Header title="Pedido"  navigate={this.props.navigation.navigate} />
				
				<ScrollView>
					<View style={{marginBottom: 10}}>
						
						<View style={style.viewBlock}>
							<Text style={style.viewBlockTitle}>Endereço de Entrega</Text>
							<Text style={user.address ? style.viewBlockContent : {display: 'none'}}>
								{formatAddress(user.address)}
							</Text>
							<TouchableOpacity 
								style={user.address ? {display: 'none'} : {} } 
								onPress={() => this.props.navigation.navigate('AddressNew')}
							>
								<Text style={{...style.viewBlockContent, color: 'red', fontWeight: 'bold'}}>
									Clique aqui para informar o endereço de entrega!
								</Text>
							</TouchableOpacity>
						</View>

						<View style={style.viewBlock}>
							<Text style={style.viewBlockTitle}>Forma de Pagamento</Text>
							<FormaPagamento />
						</View>
						
						{/*
						<Card>
							<KeyboardAwareScrollView style={style.viewBlock}>
								<Text style={style.viewBlockTitle}>Observação</Text>
								<TextInput 
									multiline={true}
									numberOfLines={4}
									value={cart.observacao}
									onChangeText={(observacao) => this.changeObservacao(observacao)}
								/>
							</KeyboardAwareScrollView>
						</Card>
						*/}
					</View>
				</ScrollView>

				<View>
					<View style={{flexDirection: "row", marginBottom: 5, marginTop: 5}}>
						<View style={{width: "40%", paddingLeft: 15}}>
							<Text style={{color: colorsTable.info, fontWeight: 'bold'}}>
								{`Taxa de Entrega`}
							</Text>
							<Text style={{color: colorsTable.info, fontWeight: 'bold'}}>
								{`R$ ${ formatMonetary(pos.deliveryPrice)}`}
							</Text>
						</View>
						<View style={{width: "60%", paddingRight: 15}}>
							<Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'right'}}>
								{`Total R$ ${formatMonetary(pos.deliveryPrice + calcTotalPrice(cart) )}`}
							</Text>
						</View>
					</View>
					<Button 
						large
						title="FAZER PEDIDO"
						containerViewStyle={{width: '100%', marginLeft:0}}
						backgroundColor={colorsTable.primary}
						onPress={() => this.execOrder()}
						loading={cart.execOrderLoading}
					/>
				</View>
			
			</View>
		);
	}
}

const style = {
	viewBlock: {
		marginTop: 10,
		padding: 10, 
		backgroundColor: listItemStyle.backgroundColor
	},
	viewBlockTitle: {
		// paddingLeft: 10, paddingRight: 10
	},
	viewBlockContent: {
		color: '#000',
		fontSize: 16,
		padding: 10
	}
}

const mapStateProps = state => {
	return {
		cart: state.cart,
		pos: state.pos,
		user: state.user
	}
}

export default connect(
	mapStateProps,
	null
)(ExecOrder)
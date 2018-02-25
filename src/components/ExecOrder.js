import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card, Button, Divider, FormLabel } from 'react-native-elements';
import Header from './Header';
import FormaPagamento from './FormaPagamento';
import { viewStyle, headerStyle, listItemStyle, colorsTable, bottomInfo, bottomInfoText, dataStyle } from '../colors';
import { formatMonetary, formatAddress } from '../utils';
import { TextInputMask } from 'react-native-masked-text';

import { calcTotalPrice, execOrder } from '../actions/cartActions';

class ExecOrder extends React.Component {
	
	constructor(props) {
		super(props);
	}

	changeObservacao(observacao) {
		this.props.dispatch({type: 'SET_OBSERVACAO', observacao: observacao})
	}

	setMoneyChange(change) {
		this.props.dispatch({
			type: 'SET_CART_CHANGE',
			change: change
		})
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
			change: cart.formaPagamento === 'dinheiro' ? parseInt(cart.change.replace(/\D/g, '')) : 0,
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
		const total_price = pos.deliveryPrice + calcTotalPrice(cart);
		
		return (
			<View style={viewModifiedStyle}>
				<Header title="Finalizar Pedido"  navigate={this.props.navigation.navigate} />
				
				<ScrollView>
					<View style={{marginBottom: 10}}>
						
						{/* Endereço */}
						<View style={dataStyle.viewBlock}>
							<Text style={dataStyle.viewBlockTitle}>Endereço de Entrega</Text>
							<Text style={user.address ? dataStyle.viewBlockContent : {display: 'none'}}>
								{formatAddress(user.address)}
							</Text>
							<TouchableOpacity 
								style={user.address ? {display: 'none'} : {} } 
								onPress={() => this.props.navigation.navigate('AddressNew')}
							>
								<Text style={{...dataStyle.viewBlockContent, color: 'red', fontWeight: 'bold'}}>
									Clique aqui para informar o endereço de entrega!
								</Text>
							</TouchableOpacity>
						</View>
						
						{/* Forma de Pagamento */}
						<View style={dataStyle.viewBlock}>
							<Text style={dataStyle.viewBlockTitle}>Forma de Pagamento</Text>
							<FormaPagamento />
							<View style={cart.formaPagamento === 'dinheiro' ? {flexDirection: 'row'} : {display: 'none'}}>
								<View>
									<Text style={dataStyle.viewBlockContent}>
										Troco para
									</Text>
								</View>
								<View>
									<TextInputMask 
										style={{
											color: dataStyle.viewBlockContent.color,
											fontSize: dataStyle.viewBlockContent.fontSize
										}}
										options={{
											unit: 'R$ '
										}}
										// underlineColorAndroid={'transparent'}
										type={'money'}
										value={cart.change}
										onChangeText={this.setMoneyChange.bind(this)}
									/>
								</View>
							</View>
						</View>
						
						{/* Pedido (itens) */}
						<View style={dataStyle.viewBlock}>
							<Text style={dataStyle.viewBlockTitle}>Revise seu Pedido</Text>
							{
								cart.items.map((item, i) => (
									<View key={i}>
										<View style={{flexDirection: 'row'}}>
											<View>
												<Text style={dataStyle.viewBlockContent}>
													{item.name}
												</Text>
											</View>
											<View style={{flex:1, alignItems: 'flex-end'}}>
												<Text style={dataStyle.viewBlockContent}>
													{`${item.qtd}x`}
												</Text>
											</View>
										</View>
										<View>
											<Text 
												style={{
													color: dataStyle.viewBlockContent.color,
													paddingLeft: dataStyle.viewBlockContent.paddingLeft,
													paddingRight: dataStyle.viewBlockContent.paddingRight
												}}
											>
												{item.info}
											</Text>
										</View>
										<View style={!item.observacao ? {display: 'none'} : {}}>
											<Text
												style={{
													paddingLeft: dataStyle.viewBlockContent.paddingLeft,
													paddingRight: dataStyle.viewBlockContent.paddingRight
												}}
											>
												{item.observacao}
											</Text>
										</View>
									</View>
								))
							}
						</View>

						<View style={cart.observacao ? dataStyle.viewBlock : {display: 'none'} }>
							<Text style={dataStyle.viewBlockTitle}>Observações Gerais</Text>
							<Text style={dataStyle.viewBlockContent}>{cart.observacao}</Text>

						</View>

					</View>
				</ScrollView>

				<View>
					<View style={{...bottomInfo, flexDirection: "row"}}>
						<View>
							<Text style={{color: colorsTable.info, fontWeight: 'bold'}}>
								{`Taxa de Entrega`}
							</Text>
							<Text style={{color: colorsTable.info, fontWeight: 'bold'}}>
								{`R$ ${ formatMonetary(pos.deliveryPrice)}`}
							</Text>
						</View>
						<View style={{alignItems: 'flex-end', flex: 1}}>
							<Text style={bottomInfoText}>
								{`Total R$ ${formatMonetary(total_price)}`}
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

// const style = {
// 	viewBlock: {
// 		marginTop: 10,
// 		padding: 10, 
// 		// backgroundColor: listItemStyle.backgroundColor
// 	},
// 	viewBlockTitle: {
// 		// paddingLeft: 10, paddingRight: 10
// 		color: '#444',
// 		fontWeight: 'bold'
// 	},
// 	viewBlockContent: {
// 		color: '#444',
// 		fontSize: 16,
// 		paddingLeft: 10,
// 		paddingRight: 10,
// 		marginTop: 10
// 	}
// }

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
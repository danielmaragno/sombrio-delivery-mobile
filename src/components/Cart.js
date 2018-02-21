import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, KeyboardAvoidingView, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Card, Button, Divider, Icon } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from './Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { formatMonetary, RandomString } from '../utils';
import { viewStyle, headerStyle, listItemStyle, colorsTable, bottomInfo, bottomInfoText } from '../colors';
import { http_url } from '../http_config';

import { removeCartItem, calcTotalPrice } from '../actions/cartActions';

class Cart extends React.Component {
	
	constructor(props) {
		super(props);
	}

	changeObservacao(observacao) {
		this.props.dispatch({type: 'SET_OBSERVACAO', observacao: observacao})
	}

	turnCartEmpty(){
		this.props.dispatch({type: 'TURN_CART_EMPTY'})
	}

	removeCartItem(index) {
		const { cart } = this.props;
		this.props.dispatch(removeCartItem(index, cart))
	}

	_showEmptyChartConfirm() {
		Alert.alert(
			"Atenção",
			"Tem certeza que deseja esvaziar seu carrinho de compras?",
			[
				{text: 'Cancelar'},
				{text: 'Sim', onPress: () => this.turnCartEmpty()}
			]
		)
	}

	_showRemoveItemConfirm(item, index) {
		Alert.alert(
			"Atenção",
			"Tem certeza que deseja remover "+item.qtd+" Un. de "+item.name+" do seu carrinho de compras?",
			[
				{text: "Cancelar"},
				{text: "Sim", onPress: () => this.removeCartItem(index)}
			]
		)
	}

	render() {

		const { cart } = this.props;
		const viewModifiedStyle = {...viewStyle, paddingBottom: 0}
		console.log(cart);
		
		return (
			<View style={viewModifiedStyle} >
				<Header title="Carrinho"  navigate={this.props.navigation.navigate} />
				
				<Card containerStyle={cart.items.length ? {display: "none"} : {}}>
					<Text style={{textAlign: 'center', fontWeight: 'bold', color: '#444'}}>
						Seu carrinho está vazio!
					</Text>
				</Card>
				
				<View style={!cart.items.length ? {display: "none"} : {flex: 1}}>
					
					<ScrollView>
						
						{/*
							<View style={bottomInfo}>
								<Text style={{fontWeight: 'bold', fontSize: 16}}>
									Itens do Carrinho
								</Text>
							</View>
						*/}

						<View style={{...bottomInfo, paddingBottom: 0}}>
							{
								cart.items.map((item, index) => (
									<View key={index} style={{marginBottom: 20}}>
										<Grid>
											{/*
											<Col size={2}>
												<Image 
													source={{uri: http_url+item.image}}
													style={{width: 60, height: 40}}
												/>
											</Col>
											*/}
											<Col size={12} style={{paddingRight:15}}>
												<Row>
													<Text 
														style={{fontWeight: 'bold', color: listItemStyle.color, fontSize: 16}}
														numberOfLines={1}
														adjustsFontSizeToFit
													>
														{item.name}
													</Text>
												</Row>

												<Row style={!item.observacao ? {display: 'none'} : {}}>
													<Text>{item.observacao}</Text>
												</Row>
												
												<Row>
													<Text style={{color: listItemStyle.color, fontSize: 16}}>
														{`${item.qtd}x`}
													</Text>
													<Text style={{color: listItemStyle.color, fontSize: 16, position: 'absolute', right: 0}}>
														{`R$ ${formatMonetary(item.price_un * item.qtd)}`}
													</Text>
												</Row>
											</Col>
											<Col size={1}>
												<Icon 
													name='clear'
													color='#A2A2A2'
													onPress={() => this._showRemoveItemConfirm(item, index)}
												/>
											</Col>
										</Grid>
										
									</View>
								))
							}
							
						</View>
					</ScrollView>
					
					<View>
						{/*
						<View style={{padding: 10, marginTop: 3}}>
							<KeyboardAwareScrollView>
								<Text>Observações Gerais</Text>
								<TextInput 
									multiline={true}
									numberOfLines={2}
									value={cart.observacao}
									onChangeText={(observacao) => this.changeObservacao(observacao)}
								/>
							</KeyboardAwareScrollView>
						</View>
						*/}
						<View style={{...bottomInfo, flexDirection: 'row'}}>
							<View>
								<Text style={bottomInfoText}>
									{`Total R$ ${formatMonetary(calcTotalPrice(cart))}`}
								</Text>
							</View>
							<View style={{alignItems: 'flex-end', flex: 1}}>
								
								<TouchableOpacity onPress={() => this._showEmptyChartConfirm()}>
									<Text style={{...bottomInfoText, color: colorsTable.info}}>
										Esvaziar
									</Text>
								</TouchableOpacity>
								
							</View>
						</View>
						<Button 
							large
							title="FECHAR PEDIDO"
							containerViewStyle={{width: '100%', marginLeft:0}}
							backgroundColor={colorsTable.primary}
							onPress={() => {this.props.navigation.navigate('ExecOrder')}}
						/>
					</View>
				</View>

			</View>
		);
	}
}


const mapStateProps = state => {
	return {
		cart: state.cart,
		pos: state.pos
	}
}

export default connect(
	mapStateProps,
	null
)(Cart)
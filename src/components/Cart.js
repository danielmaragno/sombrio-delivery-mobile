import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, KeyboardAvoidingView, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, Button, Divider, Icon } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from './Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { formatMonetary, RandomString } from '../utils';
import { viewStyle, headerStyle, listItemStyle, colorsTable } from '../colors';

import { removeCartItem, calcTotalPrice } from '../actions/cartActions';

class Cart extends React.Component {
	
	constructor(props) {
		super(props);
	}

	setObservacao(observacao) {
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
						{
							cart.items.map((item, index) => (
								<View key={index} style={{backgroundColor: listItemStyle.backgroundColor}}>
									<Grid>
										<Col size={2}>
											<Image 
												source={{uri: 'http://www.makmassas.com.br/image/cache/data/loja/produtos/trufas/trufa-amarula/trufa-amarula-1024x1024.jpg'}}
												style={{width: 60, height: 40}}
											/>
										</Col>
										<Col size={6}>
											<Row>
												<Text 
													style={{fontWeight: 'bold', color: listItemStyle.color}}
													numberOfLines={1}
													adjustsFontSizeToFit
												>
													{item.name}
												</Text>
											</Row>
											<Row>
												<Text style={{color: listItemStyle.color}}>
													{`${item.qtd}x`}
												</Text>
												<Text style={{color: listItemStyle.color, position: 'absolute', right: 0}}>
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
									<Divider />
								</View>
							))
						}
					</ScrollView>
					
					<View>
						<View style={{flexDirection: 'row'}}>
							<View style={{width: "50%"}}>
								<Text style={{
									margin: 10,
									color: '#444', fontWeight: 'bold', fontSize: 18
								}}>
									{`Total R$ ${formatMonetary(calcTotalPrice(cart))}`}
								</Text>
							</View>
							<View style={{width: '50%'}}>
								{/*
									<Button
										containerViewStyle={{paddingTop: 1, paddingBottom: 1}} 
										title="Esvaziar"
									/>
								*/}
								<TouchableOpacity onPress={() => this._showEmptyChartConfirm()}>
									<Text style={{
										margin: 10, 
										fontSize: 18, fontWeight: 'bold', color: colorsTable.info, textAlign: 'right' 
									}}>
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
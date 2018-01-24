import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, KeyboardAvoidingView, Text, ScrollView, Image } from 'react-native';
import { Card, Button, Divider, Icon } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import Header from './Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { formatMonetary } from '../utils';
import { viewStyle, headerStyle } from '../colors'

class Cart extends React.Component {
	
	constructor(props) {
		super(props);
	}

	setObservacao(observacao) {
		this.props.dispatch({type: 'SET_OBSERVACAO', observacao: observacao})
	}

	render() {

		const { cart } = this.props;
		const viewModifiedStyle = {...viewStyle, paddingBottom: 0}
		console.log(cart)

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
								<View key={index}>
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
													style={{fontWeight: 'bold', color: '#444'}}
													numberOfLines={1}
													adjustsFontSizeToFit
												>
													{item.name}
												</Text>
											</Row>
											<Row>
												<Text style={{color: '#444'}}>
													{`${item.qtd}x`}
												</Text>
												<Text style={{color: '#444', position: 'absolute', right: 0}}>
													{`R$ ${formatMonetary(item.price_un * item.qtd)}`}
												</Text>
											</Row>
										</Col>
										<Col size={1}>
											<Icon 
												name='clear'
												color='#A2A2A2'
											/>
										</Col>
									</Grid>
									<Divider />
								</View>
							))
						}
					</ScrollView>
					
					<View style={{position: 'absolute', bottom: 0, right: 0, left:0}}>
						<Text style={{
							margin: 10,
							color: '#444', fontWeight: 'bold', fontSize: 18, textAlign: 'center'
						}}>
							{`Total R$ ${formatMonetary(cart.total_price)}`}
						</Text>
						<Button 
							large
							title="FECHAR PEDIDO"
							containerViewStyle={{width: '100%', marginLeft:0}}
							backgroundColor={headerStyle.backgroundColor}
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
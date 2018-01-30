import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Modal, View, Text, Image } from 'react-native';
import { Icon, Badge, Button } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { formatMonetary, formatDateTime } from '../utils';
import { headerStyle, viewStyle } from '../colors';

import { addItemToCart } from '../actions/cartActions';

class ItemModal extends React.Component {
	

	constructor(props) {
		super(props);
	}

	setQtd(qtd) {
		if(qtd >0){
			this.props.dispatch({type: 'SET_ITEM_MODAL_QTD', qtd: qtd})
		}
	}

	addItemToCart() {
		const { onRequestClose, cart, itemModal } = this.props;
		
		onRequestClose();
		
		const item = {
			_id: itemModal.item._id,
			name: itemModal.item.name,
			price_un: itemModal.item.price,
			qtd: itemModal.qtd
		}

		this.props.dispatch(addItemToCart(item, cart));
	}

	render() {

		const props = this.props;
		const { item, qtd } = this.props.itemModal;

		return (
			<Modal
				visible={props.visible}
				onRequestClose={props.onRequestClose}
				animationType={'slide'}
			>
				<View style={viewStyle}>
					<View>
						<Image 
							source={{uri: 'http://www.makmassas.com.br/image/cache/data/loja/produtos/trufas/trufa-amarula/trufa-amarula-1024x1024.jpg'}}
							style={{width: "100%", height: 230}}
						/>
					</View>
					<ScrollView>
						<Grid style={{padding: 18}}>
							<Row style={{marginTop: 18}}>
								<Text style={{color: '#444', fontSize: 20, fontWeight: 'bold'}}>
									{item.name}
								</Text>
							</Row>
							<Row style={{marginTop: 20}}>
								<Col size={3}>
									<Text style={{fontSize: 18, color: '#444'}}>
										{`R$ ${formatMonetary(item.price)}`}
									</Text>
								</Col>
								<Col size={2}>
									<Grid>
										<Col>
											<Icon 
												name="exposure-neg-1" 
												color="#C62828"
												onPress={this.setQtd.bind(this, qtd-1)}
											/>
										</Col>
										<Col>
											<Badge value={qtd} />
										</Col>
										<Col>
											<Icon 
												name="exposure-plus-1" 
												color="#2E7D32" 
												onPress={this.setQtd.bind(this, qtd+1)}
											/>
										</Col>
									</Grid>
								</Col>
							</Row>
						</Grid>
					</ScrollView>
					<View>
						<Button 
							title="ADICIONAR AO CARRINHO"
							containerViewStyle={{width: '100%', marginLeft:0}}
							backgroundColor={headerStyle.backgroundColor}
							large
							onPress={this.addItemToCart.bind(this)}
						/>
					</View>
				</View>
			</Modal>
		);
	}
}

const mapStateProps = state => {
	return {
		itemModal: state.itemModal,
		cart: state.cart
	}
}

export default connect(
	mapStateProps,
	null
)(ItemModal)
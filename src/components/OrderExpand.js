import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text, Image, BackHandler } from 'react-native';
import { Card, Divider, Icon, Badge } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { formatMonetary, formatDateTime } from '../utils';
import { viewStyle, orderStatusMap, listItemStyle, colorsTable, bottomInfo, bottomInfoText } from '../colors';
import Header from './Header';
import { http_url } from '../http_config';

class OrderExpand extends React.Component {

	constructor(props) {
		super(props);
	}

	// handleBackPress() {
	// 	this.props.navigation.navigate('Orders');
	// 	Alert.alert('pqp')
	// }

	// componentDidMount() {
 //      BackHandler.addEventListener('backPress', this.handleBackPress.bind(this));
 //    }

 //    componentWillUnmount() {
 //      BackHandler.removeEventListener('backPress');
 //    }

	render() {

		const { order_id } = this.props.navigation.state.params;
		const order = this.props.orders.ordersMap[order_id];
		
		return (
			<View style={viewStyle}>
				<Header title={`Pedido ${order._id.slice(-4)}`}  navigate={this.props.navigation.navigate} />
				
				<View style={{alignItems: 'center', margin: 15}}>
					<Text style={{fontSize: 18, fontWeight: 'bold', color: "#444"}}>
						{order.pos_name}
					</Text>
				</View>

				<View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10, marginBottom: 25}}>
					<View>
						<Text style={{color: '#444', fontSize: 16}}>{formatDateTime(order.timeStamp)}</Text>
					</View>
					<View style={{flex:1, alignItems: 'flex-end'}}>
						<Badge 
							containerStyle={{backgroundColor: orderStatusMap[order.status].color}}
						>
							<Text style={{color:'white'}}>
								{orderStatusMap[order.status].title}
							</Text>
						</Badge>
					</View>
				</View>

				<ScrollView>
					{
						order.items.map((item, index) => (
							<View key={index} style={{backgroundColor: listItemStyle.backgroundColor}}>
								<Grid>
									<Col size={2} style={{height: 60, marginRight: 5, backgroundColor: '#FFF', borderRadius: 10}}>
										<Image 
											source={{uri: http_url+item.image}}
											style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
										/>
									</Col>
									<Col size={6} style={{paddingRight: 10}}>
										<Row>
											<Text 
												style={{fontWeight: 'bold', color: listItemStyle.color, fontSize: 16}}
												numberOfLines={1}
												adjustsFontSizeToFit
											>
												{item.name}
											</Text>
										</Row>
										<Row style={!item.info ? {display: 'none'} : {}}>
											<Text style={{fontWeight: 'bold', color: listItemStyle.color}}>
												{item.info}
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
								</Grid>
								<Divider />
							</View>
						))
					}
				</ScrollView>
				<View style={bottomInfo}>
					<View style={order.pos_comentario ? {paddingBottom: 20} : {display: 'none'}}>
						<Text style={{fontWeight: 'bold', color: listItemStyle.color, fontSize:16}}>Comentário do Lojista</Text>
						<Text style={{padding:10,  color: listItemStyle.color}}>{order.pos_comentario}</Text>
					</View>
					<View style={{flexDirection: 'row'}}>
						<View>
							<Text style={{color: colorsTable.info, fontWeight: 'bold'}}>
								{`Taxa de Entrega`}
							</Text>
							<Text style={{color: colorsTable.info, fontWeight: 'bold'}}>
								{`R$ ${ formatMonetary(order.deliveryPrice)}`}
							</Text>
						</View>
						<View style={{flex: 1, alignItems: 'flex-end'}}>
							<Text style={bottomInfoText}>
								{`Total R$ ${formatMonetary(order.total_price)}`}
							</Text>
						</View>
						
					</View>
				</View>

			</View>
		);
	}
}


const mapStateProps = state => {
	return {
		orders: state.orders,
	}
}

export default connect(
	mapStateProps,
	null
)(OrderExpand)
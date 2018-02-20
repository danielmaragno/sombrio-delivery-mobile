import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text, Image, BackHandler } from 'react-native';
import { Card, Divider, Icon, Badge } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { formatMonetary, formatDateTime } from '../utils';
import { viewStyle, orderStatusMap, listItemStyle, colorsTable } from '../colors';
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

		const { index } = this.props.navigation.state.params;
		const order = this.props.orders.orders[index];
		
		return (
			<View style={viewStyle}>
				<Header title={`Pedido ${order._id.slice(-4)}`}  navigate={this.props.navigation.navigate} />
				
				<View style={{alignItems: 'center', margin: 15}}>
					<Text style={{fontSize: 18, fontWeight: 'bold', color: colorsTable.info}}>
						{formatDateTime(order.timeStamp)}
					</Text>
				</View>

				<ScrollView>
					{
						order.items.map((item, index) => (
							<View key={index} style={{backgroundColor: listItemStyle.backgroundColor}}>
								<Grid>
									<Col size={2}>
										<Image 
											source={{uri: http_url+item.image}}
											style={{width: 60, height: 40}}
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
				<View style={{margin: 15}}>
					<View style={order.pos_comentario ? {marginBottom: 15, marginTop: 15} : {display: 'none'}}>
						<Text style={{fontWeight: 'bold', color: listItemStyle.color}}>Comentário do Lojista</Text>
						<Text style={{color: listItemStyle.color}}>{order.pos_comentario}</Text>
					</View>
					<View style={{flexDirection: 'row'}}>
						<View>
							<Badge 
								containerStyle={{backgroundColor: orderStatusMap[order.status].color}}
							>
								<Text style={{color:'white', fontSize: 18}}>
									{orderStatusMap[order.status].title}
								</Text>
							</Badge>
						</View>
						<View style={{flex: 1, alignItems: 'flex-end'}}>
							<Text style={{fontSize: 18, fontWeight: 'bold', color: listItemStyle.color}}>
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
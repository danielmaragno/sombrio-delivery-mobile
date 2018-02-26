import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { viewStyle, orderStatusMap } from '../colors';
import Header from './Header';
import { formatMonetary, formatDateTime } from '../utils';

import { fetchOrders } from '../actions/ordersActions';

class Orders extends React.Component {
	
	constructor(props) {
		super(props);

		const token  = this.props.user.token;
		this.props.dispatch(fetchOrders(token));
	}

	render() {
		
		const { orders, ordersMap } = this.props.orders;
		
		return (
				
			<View style={viewStyle} >
				<Header title="Meus Pedidos"  navigate={this.props.navigation.navigate} />
				<ScrollView>
					<Card containerStyle={orders.length ? {display: "none"} : {}}>
						<Text style={{textAlign: 'center', fontWeight: 'bold', color: '#444'}}>
							Você ainda não fez pedidos!
						</Text>
					</Card>
					<View style={{marginBottom: 10}}>
						{
							orders.map((order_id, i) => {
								
								const o = ordersMap[order_id];

								return (
									<Card  key={i}>
										<TouchableOpacity onPress={() => this.props.navigation.navigate('OrderExpand', {order_id: order_id})}>
											<Grid>
												<Row style={{paddingBottom: 10}}>
													<Text 
														style={{
															fontWeight: 'bold',
															fontSize: 16,
															color: '#444'
														}}
													>
														{o.pos_name}
													</Text>
												</Row>
												<Row style={{height: 30}}>
													<Text style={{fontWeight: 'bold'}}>
														{`#${o._id.slice(-4)}`}
													</Text>
													<Badge 
														containerStyle={{backgroundColor: orderStatusMap[o.status].color}}
														wrapperStyle={{	position: 'absolute', right: 0}}
													>
														<Text style={{color:'white', fontSize: 12}}>
															{orderStatusMap[o.status].title}
														</Text>
													</Badge>
												</Row>
												<Row>
													<Text style={{fontSize: 16}}>
														{`R$ ${formatMonetary(o.total_price)}`}
													</Text>
													<Text style={{	position: 'absolute', right: 0, bottom:0}}>
														{formatDateTime(o.timeStamp)}
													</Text>
												</Row>
											</Grid>
										</TouchableOpacity>
									</Card>
								)
							})
						}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateProps = state => {
	return {
		user: state.user,
		pos: state.pos,
		orders: state.orders,
	}
}

export default connect(
	mapStateProps,
	null
)(Orders)
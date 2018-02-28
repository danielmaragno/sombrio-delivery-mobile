import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Divider, List, ListItem } from 'react-native-elements';
import { drawerMenuHeaderView, drawerMenuHeaderTitle, drawerMenuHeaderSubTitle, drawerListItems, colorsTable } from '../colors';

import { fetchUser, logout } from '../actions/userActions';

import routesList from '../routes';

class DrawerMenu extends React.Component {

	constructor(props) {
		super(props)

		const token = this.props.user.token;
		this.props.dispatch(fetchUser(token));
	}
	
	logout(){
		const { token, player_id } = this.props.user;
		this.props.dispatch(logout(token, player_id))
	}

	render(){

		const { navigate } = this.props.navigation;
		const { id, name, isLoadingLogout } = this.props.user;
		
		return (
			<ScrollView>
			    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
			      {/*<DrawerItems {...props} />*/}
					<View style={drawerMenuHeaderView}>
						<Text style={drawerMenuHeaderTitle}>{name}</Text>
						<Text style={drawerMenuHeaderSubTitle}>{id}</Text>
					</View>
					<View>
						{
							routesList.map((l,i) => (
							<ListItem
								containerStyle={drawerListItems}
								key={l.key}
								title={l.params.title}
								titleStyle={{fontSize: 15, paddingLeft: 20}}
								leftIcon={{...l.params.leftIcon, color: "#444"}}
								hideChevron={true}
								onPress={() => navigate(l.routeName)}
							/>
							))
						}
						
						<List>
							<ListItem 
								containerStyle={drawerListItems}
								key="logout"
								title="Sair"
								titleStyle={{fontSize: 15, paddingLeft: 20}}
								leftIcon={{name:"power-settings-new", color: "#444"}}
								hideChevron={true}
								onPress={this.logout.bind(this)}
							/>
						</List>
					</View>
			    </SafeAreaView>
		  	</ScrollView>
	  	)
	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


const mapStateProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateProps,
  null
)(DrawerMenu)
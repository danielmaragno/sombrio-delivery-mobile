import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Divider, List, ListItem } from 'react-native-elements';
import { drawerMenuHeaderView, drawerMenuHeaderTitle, drawerListItems } from '../colors';

import { fetchUser } from '../actions/userActions';

import routesList from '../routes';

class DrawerMenu extends React.Component {

	constructor(props) {
		super(props)

		const token = this.props.user.token;
		this.props.dispatch(fetchUser(token));
	}
	
	render(){

		const { navigate } = this.props.navigation;
		const { id, name } = this.props.user;
		
		return (
			<ScrollView>
			    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
			      {/*<DrawerItems {...props} />*/}
					<View style={drawerMenuHeaderView}>
						<Text style={drawerMenuHeaderTitle}>{name}</Text>
						<Text>{id}</Text>
					</View>
					{
						routesList.map((l,i) => (
						<ListItem
							containerStyle={drawerListItems}
							key={l.key}
							title={l.params.title}
							leftIcon={l.params.leftIcon}
							onPress={() => navigate(l.routeName)}
						/>
						))
					}
					
					<List>
						<ListItem 
							containerStyle={drawerListItems}
							key="logout"
							title="Sair"
							leftIcon={{name:"power-settings-new"}}
						/>
					</List>
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
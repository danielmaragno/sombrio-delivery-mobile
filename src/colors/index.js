export const colorsTable = {
	// primary: '#3366CC'
    primary: "#27ae60", // green
    info: "#e67e22" //orange
}

export const headerStyle = {
    // backgroundColor: '#2F363D', // mais escuro
    // backgroundColor: '#1A64AE' // Azul
    backgroundColor: colorsTable.primary
}

export const headerTitleStyle = { 
    color: '#ffffff',
    fontWeight: 'normal',
    // fontFamily: 'Times New Roman'

}

export const viewStyle = {
    flex: 1,
    paddingBottom: 15,
    // backgroundColor: "#A4A9AE", // mais escuro
    // backgroundColor: '#B0C7DE' // azul claro
    backgroundColor: '#f0ead6' // marrom bem claro
}


export const drawerMenuHeaderView = {
	padding: 13,
	// backgroundColor: 'grey'
}

export const drawerMenuHeaderTitle = {
	fontSize: 20,
    fontWeight: 'bold',
}

export const drawerMenuHeaderSubTitle = {
	
}

export const drawerListItems = {
	borderBottomWidth: 0
}

export const orderStatusMap = {
    requested: {
    	title: 'Pendente',
    	color: '#f1c40f'
    },
    confirmed: {
    	title: 'Confirmado',
    	color: '#27ae60'
    },
    canceled: {
    	title: 'Cancelado',
    	color: '#e74c3c'
    },
    on_road: {
    	title: 'Saiu para Entrega',
    	color: '#2980b9'
    },
    done: {
    	title: 'Finalizado',
    	color: '#2c3e50'
    }
}

export const listItemStyle = {
    backgroundColor: "#fff",
    color: "#444"
}
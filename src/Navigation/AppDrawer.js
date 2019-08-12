import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createStackNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Container, Content, Header, Text, Body, View } from 'native-base';
import { Icon } from 'react-native-elements';
import DashboardScreen from '../Components/Dashboard';
import MyCart from '../Components/Cart';
import MyWishlist from '../Components/MyWishlist';
import ScreenContainer from './ScreenContainer';
import MyOrders from '../Components/MyOrders';
import Login from '../Components/Login';
import SignUp from '../Components/SignUp';
import ProductHomeScreen from '../Components/ProductHome';

import ContactUsS from '../Components/ContactUs';
import { Actions } from 'react-native-router-flux';

var emails = '';
var mobile = '';

export default class AppDrawer extends React.Component {

    constructor(props) {
        super(props);
        this._retrieveDataE();

        navigate = props.navigation,
            this.state = {
            };

    }

    _retrieveDataE = async () => {
        try {
            const value = await AsyncStorage.getItem('names');
            if (value !== null) {
                emails = value;
                this._retrieveDataC();
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    _retrieveDataC = async () => {
        try {
            const value = await AsyncStorage.getItem('mobb');
            if (value !== null) {

                mobile = value;
            }
        } catch (error) {
            // Error retrieving data
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Header style={styles.drawerHeader} >

                        <Body>
                            <Icon style={styles.drawerImage}
                                raised
                                name='user'
                                type='font-awesome'
                                color='#3742fa'
                                size={30} />
                            <Text style={styles.txt}>{emails}</Text>
                            <Text style={styles.txt}>{mobile}</Text>
                        </Body>

                        <Text style={styles.txt1}>3</Text>
                    </Header>
                    <Text style={styles.txt}>1</Text>
                    <Text style={styles.txt}>2</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const DashboardS = createStackNavigator({
    Dashboard: DashboardScreen, MyCart: MyCart,
    ProductHomeScreen: ProductHomeScreen, MyWishlist: MyWishlist, MyOrders: MyOrders, ContactUsS: ContactUsS,
    SignUp: SignUp, Login: Login
});

const MyCartS = createStackNavigator({
    MyCart: MyCart
});


const MyWishlistS = createStackNavigator({
    MyWishlist: MyWishlist

});

const MyOrdersS = createStackNavigator({
    MyOrders: MyOrders,

});
const ContactUsSS = createStackNavigator({
    ContactUsS: ContactUsS,

});

// const CustomDrawerContentComponent = (props) => (

//     <Container style={styles.container1} >
//         <TouchableOpacity >
//             <Header style={styles.drawerHeader} >

//                 <Body>
//                     <Icon style={styles.drawerImage}
//                         raised
//                         name='user'
//                         type='font-awesome'
//                         color='#3742fa'
//                         size={30} />
//                     <Text style={styles.txt}>{emails}</Text>
//                     <Text style={styles.txt}>{mobile}</Text>
//                 </Body>

//             </Header>
//         </TouchableOpacity>
//         <Content>
//             <DrawerItems {...props} />
//         </Content>

//     </Container>

// );

// const MyApp = createDrawerNavigator({
//     Dashboard: {
//         screen: DashboardS,
//     },

//     MyWishlist: {
//         screen: MyWishlistS
//     },
//     MyCart: {
//         screen: MyCartS
//     },
//     MyOrders: {
//         screen: MyOrdersS
//     },
//     Contact: {
//         screen: ContactUsS
//     },


// },
//     {
//         initialRouteName: 'Dashboard',
//         drawerPosition: 'left',
//         contentComponent: CustomDrawerContentComponent,
//         drawerOpenRoute: 'DrawerOpen',
//         drawerCloseRoute: 'DrawerClose',
//         drawerToggleRoute: 'DrawerToggle'
//     });


const styles = StyleSheet.create({
    indexContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    container1: {
        width: '100%',
    },
    drawerHeader: {
        height: 150,
        backgroundColor: '#0984e3'
    },
    drawerImage: {
        marginTop: 30,
        height: 80,
        width: 80,
        borderRadius: 0
    },
    txt: {
        paddingTop: 0,
        color: '#FFF'

    },
    txt1: {
        marginTop: 250,
        color: '#000'

    }

});

import React, { Component } from 'react';
import { Container, Content, Header, Body } from 'native-base';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions } from 'react-native';
import Dashboard from './Dashboard';
const BannerWidth = Dimensions.get('window').width / 1.02;
const BannerHeight = Dimensions.get('window').height / 4;


export default class SideMenu extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <View style={styles.containers}>

                <Header style={styles.drawerHeader} >

                    <Body>
                        <Icon style={styles.drawerImage}
                            raised
                            name='user'
                            type='font-awesome'
                            color='#3742fa'
                            size={30} />
                        <Text style={styles.txt}>AAAA</Text>
                        <Text style={styles.txt}>SSSS</Text>
                    </Body>
                </Header>

                <View style={styles.container}>
                    {/* <Text onPress={(e) => Actions.gray()} style={styles.menuess}>Home</Text> */}
                    <Text onPress={(e) => Actions.wish()} style={styles.menuess}>WishList</Text>
                    <Text onPress={(e) => Actions.cart()} style={styles.menuess}>Cart</Text>
                    <Text onPress={(e) => Actions.orders()} style={styles.menuess}>Orders</Text>
                    <Text onPress={(e) => Actions.contact()} style={styles.menuess}>Contact us</Text>
                    {/* <Text onPress={(e) => Actions.login()} style={styles.menuess}>Acccount</Text> */}
                    <Text onPress={(e) => Actions.carsListScreen()} style={styles.menuess}>Logout</Text>
                    {/* <Text onPress={(e) => Actions.carsListScreen()} style={styles.menuess}>Menu 1</Text>
                    <Text onPress={(e) => Actions.carsListScreen()} style={styles.menuess}>Menu 1</Text>
                    <Text onPress={(e) => Actions.carsListScreen()} style={styles.menuess}>Menu 1</Text> */}

                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10,
    },
    containers: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
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
    menuess: {
        padding: 15,
        color: '#000',
        backgroundColor: '#FFF',
        fontFamily: 'italic',

    },

});
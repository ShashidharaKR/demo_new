import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

import { Provider } from 'react-redux';

import store from '../../app/store'; //Import the store
import Home from '../../app/components/home' //Import the component file
import Login from '../../app/components/LoginScreen'; //Import the component file


export default class Splash extends React.Component {

    constructor(props) {
        super(props);
        navigate = props.navigation,
            this.state = { email: '', password: '', device_token: '', device_type: '' };

    }
    componentDidMount() {
        StatusBar.setHidden(true);
        setTimeout(() => {
            this.setTimePassed();
        }, 4000);
    }

    setTimePassed() {
        this.setState({ timePassed: true });
    }

    render() {
        if (this.state.timePassed) {
            <Provider store={store}>
                <Login />
            </Provider>
        }
        return (
            <Provider store={store}>
                <Login />
            </Provider>
        );
    }
}
const styles = StyleSheet.create({
    indexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcometxt: {
        textAlign: 'center',
        fontSize: 20,
        color: '#10598F'
    },
    welcomeImage: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 3,
        resizeMode: 'contain',
        borderRadius: 10,

    },

    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    container1: {
        marginTop: 24
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
    }
});

AppRegistry.registerComponent('obabashop', () => Splash);
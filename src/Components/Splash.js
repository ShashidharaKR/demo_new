import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppDrawer from '../Navigation/AppDrawer';
import { Actions } from 'react-native-router-flux';
export default class Splash extends React.Component {

    static navigationOptions = ({ navigation }) => {
        title: 'Splash'
    }

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
             Actions.drawerMenu({type:'replace'});
            
        }
        return (
            <LinearGradient style={styles.indexContainer} colors={['#D980FA', '#12CBC4']}>
                <TouchableOpacity >

                    <Image style={styles.welcomeImage}
                        source={require('../images/obaba.jpg')} />
                </TouchableOpacity>
            </LinearGradient>
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
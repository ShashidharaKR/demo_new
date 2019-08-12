import React, { Component } from 'react';
import { ScrollView, AppState, StatusBar, StyleSheet, ToastAndroid, View, BackHandler, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import HomeScreen from './HomeComponent';
import Banner from './Banner';
import ListLayoutComponent from './ListLayout';
import { SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';

var i = 0;
export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
      //  BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
        this._getCategories();
        this.state = {
            gists: [], search: '', isLoading: true, appState: AppState.currentState, pos: 0
        }
    }
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: 'Obaba Shop',
    //         headerTintColor: 'royalblue',
    //         headerTitleStyle: { alignSelf: 'center', width: '90%', textAlign: 'center', position: 'absolute', },
    //         headerRight:
    //             <TouchableOpacity style={{ marginRight: 8 }} >
    //                 <Icon
    //                     name='user-circle'
    //                     type='font-awesome'
    //                     color='royalblue'
    //                     size={35}
    //                     onPress={() => navigation.navigate('Login')} />

    //             </TouchableOpacity>,
    //         headerLeft:
    //             <TouchableOpacity onPress={() =>Actions.drawerMenu({ text: 'Hello World!' })}>
    //                 <Icon
    //                     name='menu'
    //                     type='SimpleLineIcons'
    //                     color='royalblue'
    //                     size={35} />
    //             </TouchableOpacity>,

    //     };

    // };

    componentDidMount() {
        StatusBar.setHidden(false);
        // this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
        //    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)

        // );
      //  AppState.addEventListener('change', this._handleAppStateChange);

    }

    // _handleAppStateChange = (nextAppState) => {
    //     if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    //         console.log('App has come to the foreground!')
    //         //   ToastAndroid.show("App has come to the foreground! ===>" + this.state.appState, ToastAndroid.SHORT);
    //     }
    //     this.setState({ appState: nextAppState });
    // }

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
       // AppState.removeEventListener('change', this._handleAppStateChange);
        //  ToastAndroid.show("Remove", ToastAndroid.SHORT);
    }

    // onBackButtonPressAndroid = () => {
    //     // if (!(this.state.appState == 'active')) {
    //       BackHandler.exitApp();
    //     // }
    //     this.setState({ pos: 0 });
    //     if (this.state.pos == 0) {
    //         i = i + this.state.pos + 1;
    //         if (i >= 1) {
    //            // BackHandler.exitApp();
    //            // ToastAndroid.show("Press again to exit !", ToastAndroid.SHORT);
    //         }
    //         if (i >= 2) {
    //             // ToastAndroid.show("back pressed  YES SHASH" + this.state.appState, ToastAndroid.SHORT);
    //          //   BackHandler.exitApp();
    //         }
    //     }
    // };

    _getCategories() {
        this.setState({ gists: [] });
        return fetch("https://obaba.shop/obaba_shop_api/index.php/Category_c/getCategories", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({ isLoading: false })
                console.log("before  ===> " + this.state.gists);
                this.setState({ gists: response });

                console.log("response ===>   " + response);
                console.log("after   ====> " + this.state.gists);


            })
            .then(() => {

            })
            .catch(err => {

            });

    }

    _Check() {
        if (this.state.search == '') {
            return;
        } else {
            Actions.search({ text: this.state.search });
        }
    }

    render() {
        if (this.state.isLoading) {
            return (

                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SkypeIndicator style={styles.sky} color='#17c0eb' />
                </View>
            );
        }
        return (

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                    <TextInput
                        underlineColorAndroid='transparent' placeholder="Search "
                        placeholderTextColor='#b2bec3' backgroundColor='#fff'
                        onChangeText={(search) => this.setState({ search: search })}
                        style={styles.input}></TextInput>

                    <Icon
                        raised
                        name='search'
                        type='shopping-cart'
                        color='#8395a7'
                        size={20}
                        style={styles.ico}
                        onPress={() => this._Check()}
                    />

                </View>
                <ScrollableTabView initialPage={0} page={this.state.pos}
                    tabBarUnderlineStyle={{ backgroundColor: '#f368e0' }}
                    renderTabBar={() => <ScrollableTabBar style={styles.containe} />}
                    ref={(tabView) => { this.tabView = tabView; }}>
                    <View tabLabel='Home'>

                        <ScrollView behavior="padding" style={styles.formcontainer}>
                            <Banner />
                            <HomeScreen />
                        </ScrollView>
                    </View>

                    {this.state.gists.map((paymentss, id) => (

                        <View key={paymentss.id} tabLabel={paymentss.categoryName} >
                            <ScrollView>
                                <ListLayoutComponent greeting={paymentss.id} />
                            </ScrollView>
                        </View>)
                    )}

                </ScrollableTabView>
            </View>

        );
    }


}
const styles = StyleSheet.create({
    containe: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },

    banner: {
        height: Dimensions.get('window').height / 3.5,
        margin: 4
    },
    container1: {

    },
    button: {
        backgroundColor: '#2980b9',
        height: 40,
        color: "#fff",
        fontWeight: 'bold',
        textAlign: 'center', // <-- the magic
        fontSize: 18,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',


    },
    input: {
        height: 40,
        margin: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: "#2c3e50",
        borderRadius: 2
    },
    container: {
        marginTop: 0,
        justifyContent: 'center',
        backgroundColor: '#d2dae2',
        height: Dimensions.get('window').height,
        padding: 0
    },
    ico: {
        marginRight: 10
    },
    container1: {
        width: "100%",
        height: "100%",
    },
    button: {
        backgroundColor: '#2980b9',
        height: 40,
        color: "#fff",
        fontWeight: 'bold',
        textAlign: 'center', // <-- the magic
        fontSize: 18,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        width: Dimensions.get('window').width / 1.3,
        backgroundColor: '#ecf0f1',
        color: "#2c3e50",
        borderRadius: 4
    },
});
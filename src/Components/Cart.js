import React, { Component } from 'react';
import { AsyncStorage, Dimensions, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput, StyleSheet, AppState, WebView, 
    ListView, Text, View, Alert, Image, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

let z = 0;

let products = '-';
var product_ids = '';
let product_qtys = '';
var result = '';
export default class Cart extends React.Component {

    static navigationOptions = {
        title: 'MyCart'
    }

    constructor(props) {
        super(props);
        this._retrieveData();
        this.state = { isLoading: true, idss: '', gists: [], krs: '00', product_state: '-', buy: false }

    }
    state = {
        userName: '',
        isLoadingTrue: true,
        isLoadingFalse: false,
        password: '',
        isLoggingIn: false,
        message: ''
    }

    _checkLogin = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                this.setState({ idss: value });
                this.setState({ buy: true });
            } else {
                Actions.login();
            }
        } catch (error) {

        }
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                this.setState({ idss: value });
                this._getCart();
                this._getAddress(value);
            } else {
                alert('Your Cart is Empty');
            }
        } catch (error) {
            // Error retrieving data

        }
    }



    _getCart() {

        return fetch('https://obaba.shop/obaba_shop_api/index.php/Cart_c/getCart', {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.idss,

            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({ gists: responseJson });

                var sample = this.state.gists;


                for (i = 0; i < sample.length; i++) {


                    let x = parseInt(this.state.krs);
                    let y = parseInt((sample[i].productPrice) * (sample[i].qty));
                    let s = parseInt(sample[i].shippingCharge);

                    product_qtys = sample[i].qty + ", " + product_qtys;

                    products = sample[i].productName + "--" + products;

                    product_ids = sample[i].id + ", " + product_ids;

                    result = products.replace(/[()'']/g, ' ');

                    console.log(this.state.propro);
                    z = x + y + s;

                    this.setState({ krs: z });

                }

                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),

                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    _removeCart(pid, pn) {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Cart_c/removeCart', {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.idss,
                product_id: pid

            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success) {
                    alert(pn + ' ' + responseJson.msg);
                    this.setState({ krs: 0 });
                    this._getCart();
                } else {
                    alert(pn + ' ' + responseJson.msg);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    componentDidMount() {

        if (AppState.currentState == 'active') {
            products = '-';
            product_ids = '';
            product_qtys = '';
            result = '';
            this.setState({ product_state: '-' })
        }

    }

    _getAddress = (id) => {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Users_c/getUsers', {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: id
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.success) {

                    this.setState({
                        user_shipping_address: responseJson.user_shipping_address,
                        user_shipping_state: responseJson.user_shipping_state,
                        user_shipping_city: responseJson.user_shipping_city,
                        user_shipping_pincode: responseJson.user_shipping_pincode,
                        user_billing_address: responseJson.user_billing_address,
                        user_billing_city: responseJson.user_billing_city,
                        user_billing_state: responseJson.user_billing_state,
                        user_billing_pincode: responseJson.user_billing_pincode,

                    });

                }

            })
            .catch((error) => {
                console.error(error);
            });
    }


    _updateAddress = () => {

        if (this.state.user_shipping_address == '' || this.state.user_shipping_state == ''
            || this.state.user_shipping_city == '' || this.state.user_billing_address == '' || this.state.user_billing_pincode == '') {
            ToastAndroid.show('Please fill all the fields...', ToastAndroid.SHORT);
            return;
        }

        this.isLoadingTrue;
        this.setState({ isLoggingIn: true, message: '' });

        var params = {
            id: this.state.idss,
            user_shipping_address: this.state.user_shipping_address,
            user_shipping_state: this.state.user_shipping_state,
            user_shipping_city: this.state.user_shipping_city,
            user_shipping_pincode: this.state.user_shipping_pincode,
            user_billing_address: this.state.user_billing_address,
            user_billing_city: this.state.user_billing_city,
            user_billing_state: this.state.user_billing_state,
            user_billing_pincode: this.state.user_billing_pincode,
            grant_type: 'password'
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var proceed = false;
        fetch("https://obaba.shop/obaba_shop_api/index.php/UserRegister_c/updateAddress", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.idss,
                user_shipping_address: this.state.user_shipping_address,
                user_shipping_state: this.state.user_shipping_state,
                user_shipping_city: this.state.user_shipping_city,
                user_shipping_pincode: this.state.user_shipping_pincode,
                user_billing_address: this.state.user_billing_address,
                user_billing_city: this.state.user_billing_city,
                user_billing_state: this.state.user_billing_state,
                user_billing_pincode: this.state.user_billing_pincode,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.state.isLoadingFalse
                if (response.status) {
                    Actions.pos({ gt: z, prod: result, pid: product_ids, qtyss: product_qtys })
                    proceed = true;
                }
                else this.setState({ message: response.message });
            })
            .then(() => {
                this.setState({ isLoggingIn: false })
                if (proceed) { }
            })
            .catch(err => {
                this.setState({ message: err.message });
                this.setState({ isLoggingIn: false })
            });
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 5,
                    width: "100%",
                    marginBottom: 5,
                    marginTop: 5,
                    backgroundColor: "#dfe6e9",
                }}
            />
        );
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    {/* <SkypeIndicator color='#25CCF7' /> */}
                </View>
            );
        }
        if (this.state.buy) {
            return (<ScrollView style={styles.container} keyboardShouldPersistTaps="handled" behavior="padding" >
                <KeyboardAvoidingView>

                    <LinearGradient colors={['#1B9CFC', '#55E6C1']}>

                        <View style={styles.inputcontainer}>

                            <Text style={{ textAlign: 'left' }}>Shipping Address</Text>
                            <TextInput underlineColorAndroid='transparent' placeholder="Shipping Address"
                                placeholderTextColor='#84817a' onChangeText={(user_shipping_address) => this.setState({ user_shipping_address })}
                                style={styles.input} value={this.state.user_shipping_address}

                            ></TextInput>

                            <TextInput underlineColorAndroid='transparent' placeholder="Shipping State"
                                placeholderTextColor='#84817a' onChangeText={(user_shipping_state) => this.setState({ user_shipping_state })}
                                style={styles.input} value={this.state.user_shipping_state}
                            ></TextInput>

                            <TextInput underlineColorAndroid='transparent' placeholder="Shipping City"
                                placeholderTextColor='#84817a' onChangeText={(user_shipping_city) => this.setState({ user_shipping_city })}
                                style={styles.input} value={this.state.user_shipping_city}
                            ></TextInput>

                            <TextInput underlineColorAndroid='transparent' placeholder="Shipping Pincode"
                                placeholderTextColor='#84817a' onChangeText={(user_shipping_pincode) => this.setState({ user_shipping_pincode })}
                                style={styles.input} value={this.state.user_shipping_pincode}
                            ></TextInput>
                            <Text style={{ textAlign: 'left' }}>Billing Address</Text>
                            <TextInput underlineColorAndroid='transparent' placeholder="Billing Address"
                                placeholderTextColor='#84817a' onChangeText={(user_billing_address) => this.setState({ user_billing_address })}
                                style={styles.input} value={this.state.user_billing_address}
                            ></TextInput>

                            <TextInput underlineColorAndroid='transparent' placeholder="Billing State"
                                placeholderTextColor='#84817a' onChangeText={(user_billing_state) => this.setState({ user_billing_state })}
                                style={styles.input} value={this.state.user_billing_state}
                            ></TextInput>

                            <TextInput underlineColorAndroid='transparent' placeholder="Billing City"
                                placeholderTextColor='#84817a' onChangeText={(user_billing_city) => this.setState({ user_billing_city })}
                                style={styles.input} value={this.state.user_billing_city}
                            ></TextInput>

                            <TextInput underlineColorAndroid='transparent' placeholder="Billing Pincode"
                                placeholderTextColor='#84817a' onChangeText={(user_billing_pincode) => this.setState({ user_billing_pincode })}
                                style={styles.input} value={this.state.user_billing_pincode}
                            ></TextInput>

                            {!!this.state.message && (
                                <Text
                                    style={{ fontSize: 14, color: 'red', padding: 5 }}>
                                    {this.state.message}
                                </Text>



                            )}

                            <LinearGradient style={styles.button} colors={['#ff9ff3', '#be2edd']}>
                                <TouchableOpacity >
                                    <Text style={{ color: '#FFFFFF' }} onPress={this._updateAddress}  >NEXT</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                        </View>
                    </LinearGradient >
                </KeyboardAvoidingView>
            </ScrollView>);
        }
        return (

            <View style={styles.MainContainer}>

                <ListView style={{ margin: 4, backgroundColor: '#FFF' }}

                    dataSource={this.state.dataSource}

                    renderSeparator={this.ListViewItemSeparator}

                    renderRow={(rowData) =>

                        <TouchableOpacity onPress={() => Actions.product({ pc: rowData.productCompany, sc: rowData.shippingCharge, producrPrice: rowData.productPrice, pn: rowData.productName, piid: rowData.id, img1: rowData.productImage1, img2: rowData.productImage2, img3: rowData.productImage3, description: rowData.productDescription })} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <Image
                                    source={{ uri: "https://obaba.shop/admin/productimages/" + rowData.id + "/" + rowData.productImage1 }}
                                    style={styles.imageViewContainer} />
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text
                                        style={styles.textViewContainer} >{rowData.productName}</Text>
                                    <Text></Text>
                                    <Text style={{ color: '#3742fa', }} >Price : ₹{rowData.productPrice}/-</Text>
                                    <Text style={{ color: '#079992', }} >Quantity : {rowData.qty}</Text>
                                    <Text></Text>
                                    <Text></Text>
                                    <Text></Text>

                                    <Icon
                                        raised
                                        name='close'
                                        type='FontAwesome'
                                        color="#dfe4ea"
                                        reverse={true}
                                        style={styles.btn}
                                        reverseColor='#c23616'
                                        onPress={() => { this._removeCart(rowData.id, rowData.productName) }} />
                                </View>

                            </View>
                            <WebView
                                style={{ height: Dimensions.get('window').height / 4, backgroundColor: '#FFF' }}
                                source={{ html: rowData.productDescription }} />
                        </TouchableOpacity>} />

                <Text style={styles.btn1}>Grand Total : ₹{this.state.krs}/-</Text>

                <Button onPress={() => this._checkLogin()}
                    style={styles.txt} >PROCCED TO CHECKOUT</Button>
            </View >
        );
    }
}

const styles = StyleSheet.create({


    container: {
        backgroundColor: '#fff',
    },



    input: {
        width: '90%',
        height: 45,
        margin: 10,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: '#FFFFFF',
        color: "#000000",
    },


    inputcontainer: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },

    button: {
        width: '90%',
        height: 45,
        color: '#FFFFFF',
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 0,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,

    },
    containerr: {
        flex: 1,
        justifyContent: 'center'
    },
    imageViewContainer: {
        width: '50%',
        height: Dimensions.get('window').height / 4,
        margin: 10,
        borderRadius: 10

    },

    textViewContainer: {
        color: '#000',


    },
    txt: {
        alignItems: 'flex-end',
        color: '#FFF',
        backgroundColor: '#70a1ff',
        right: 0
    },
    btn: {
        paddingLeft: 20,
        backgroundColor: '#70a1ff',

    },
    remove: {
        height: 30,
        backgroundColor: '#7ed6df',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        margin: 5,
        bottom: 0,

    },
    btn1: {
        right: 0,
        bottom: 0,
        color: '#FFF',
        backgroundColor: '#70a1ff',
        paddingLeft: 5,
        fontSize: 22
    }

});
import React, { Component } from 'react';
import { Dimensions, ToastAndroid, StyleSheet, KeyboardAvoidingView, TextInput, ScrollView, AsyncStorage, Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import { Rating } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ImageSlider from 'react-native-image-slider';
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import Dialog from "react-native-dialog";
export default class ListLayout extends React.Component {
    static navigationOptions = {
        title: 'Product Description'
    }
    constructor(props) {
        super(props);
        this._retrieveData();
        this.state = {
            isLoading: true, idss: '0', dialogVisibleBuy: false, dialogVisible: false,
            prod_id: '0', prod_qty: '0', prod_name: '', buy: false
        };
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
            // Error retrieving data

        }
    }


    showDialog = () => {
        this.setState({ prod_qty: '0' })
        this.setState({ dialogVisible: true });
    };

    showDialogBuy = () => {
        this.setState({ prod_qty: '0' })
        this.setState({ dialogVisibleBuy: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
        this.setState({ dialogVisibleBuy: false });
    };

    handleSubmit = () => {
        if (this.state.prod_qty == '0' || this.state.prod_qty == '00' || this.state.prod_qty == '000' || this.state.prod_qty == '0000') {
            ToastAndroid.show('Please enter a valied quantity', ToastAndroid.SHORT);
            return;
        }
        this.setState({ dialogVisible: false });
        this._addCart(this.state.prod_id, this.state.prod_name);
    };

    handleBuy = () => {

        if (this.state.prod_qty == '0' || this.state.prod_qty == '00' || this.state.prod_qty == '000' || this.state.prod_qty == '0000') {
            ToastAndroid.show('Please enter a valied quantity', ToastAndroid.SHORT);
            return;
        }
        this.setState({ dialogVisibleBuy: false });

        ToastAndroid.show(+"P : "+this.props.producrPrice+" : Q"+this.state.prod_qty, ToastAndroid.SHORT);
        

        Actions.pos({ gt: parseInt((this.props.producrPrice) * (this.state.prod_qty)) + parseInt(this.props.sc), prod: this.props.pn, pid: this.props.piid, qtyss: this.state.prod_qty })
    };

    _checkUserId(pid, pn) {
        if (this.state.idss == '0') {
            Actions.login();
        } else {
            this.setState({ prod_id: pid, prod_name: pn });
            this.showDialog(pid, pn);
        }
    }

    _checkUserIdWishlist(pid, pn) {
        if (this.state.idss == '0') {
            Actions.login();
        } else {
            this._addWishlist(pid, pn);
        }
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                this.setState({ idss: value });
                this._getAddress(value);
            } else {
            }
        } catch (error) {
            // Error retrieving data

        }
    }
    _addCart(pid, pn) {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Cart_c/addToCart', {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.idss,
                product_id: pid,
                qty: this.state.prod_qty
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success) {
                    ToastAndroid.show(pn + ' ' + responseJson.msg, ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(pn + ' ' + responseJson.msg, ToastAndroid.SHORT);

                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _addWishlist(pid, pn) {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Wishlist_c/addToWishlist', {
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
                } else {
                    alert(pn + ' ' + responseJson.msg);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    state = {
        userName: '',
        isLoadingTrue: true,
        isLoadingFalse: false,
        password: '',
        isLoggingIn: false,
        message: ''
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
            || this.state.user_shipping_city == '' || this.state.user_billing_address == '' || this.state.user_billing_pincode == '' ||
            this.state.prod_qty == '0') {
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
                    Actions.pos({ gt: parseInt((this.props.producrPrice) * (this.state.prod_qty)) + parseInt(this.props.sc), prod: this.props.pn, pid: this.props.piid, qtyss: this.state.prod_qty })
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


    render() {
        if (this.state.dialogVisible) {
            return (<Dialog.Container visible={true} style={{ justifyContent: 'center', alignContent: 'center' }}>
                <Dialog.Title>  Please enter quantity...</Dialog.Title>
                <Dialog.Input onChangeText={(qty) => this.setState({ prod_qty: qty })} style={{ backgroundColor: '#dfe6e9', textAlign: 'center' }} placeholder='1' keyboardType='numeric' onPress={this.handleCancel} ></Dialog.Input>
                <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                <Dialog.Button label="Add to cart" onPress={this.handleSubmit} />
            </Dialog.Container>);
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


                            <TextInput onChangeText={(qty) => this.setState({ prod_qty: qty })} keyboardType='numeric' underlineColorAndroid='transparent' placeholder="Enter Product Quantity"
                                placeholderTextColor='#84817a'
                                style={styles.input} >
                            </TextInput>

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

            <ScrollView behavior="padding">
                <View style={styles.MainContainer}>
                    <ImageSlider position='center' style={styles.imgs}
                        images={[
                            "https://obaba.shop/admin/productimages/" + this.props.piid + "/" + this.props.img1,
                            "https://obaba.shop/admin/productimages/" + this.props.piid + "/" + this.props.img2,
                            "https://obaba.shop/admin/productimages/" + this.props.piid + "/" + this.props.img3,
                        ]} />
                </View>

                <Text style={styles.productName}>{this.props.pn}</Text>

                <Rating
                    readonly
                    showRating
                    type="star"
                    fractions={1}
                    startingValue={4.5}
                    imageSize={20}
                    style={{ paddingVertical: 10, paddingLeft: 10 }}
                />
                <Text style={styles.price}> ₹{this.props.producrPrice}/-</Text>

                <Text style={styles.productDesc} >Avaliavility : Instock </Text>

                <Text style={styles.productDesc}  >Brand : {this.props.pc}</Text>

                <Text style={styles.productDesc} >Shipping Charge : ₹{this.props.sc}/- </Text>
                <View style={styles.btn}>
                    <Icon
                        raised
                        name='heart-o'
                        type='font-awesome'
                        color='#ED4C67'
                        reverse={true}
                        reverseColor='#FFFFFF'
                        size={30}
                        onPress={() => this._checkUserIdWishlist(this.props.piid, this.props.pn)} />

                    <Icon
                        raised
                        name='shopping-cart'
                        type='shopping-cart'
                        color="#f7b731"
                        reverse={true}
                        reverseColor='#FFFFFF'
                        size={30}
                        onPress={() => this._checkUserId(this.props.piid, this.props.pn)}
                    />
                    <Text
                        style={styles.buttn} onPress={() => this._checkLogin()}>BUY</Text>
                </View >
                <View>
                    <Text style={{ margin: 10 }}>{this.props.description}</Text>
                </View>
            </ScrollView>

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
        alignItems: 'center'
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
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: Dimensions.get('window').height / 2,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    imgs: {
        resizeMode: 'contain',
        resizeMode: 'contain',
    },

    textViewContainer: {
        marginLeft: 10,
    },
    buttn: {
        margin: 7,
        height: 65,
        width: 65,
        paddingTop: 20,
        color: '#fff',
        backgroundColor: '#00cec9',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 65,
    },
    productName: {
        flexDirection: 'row',
        fontSize: 25,
        paddingLeft: 5,
        color: '#00cec9',
        fontFamily: 'Roboto'
    },

    productDesc: {
        flexDirection: 'row',
        fontSize: 15,
        paddingLeft: 5,
        color: '#000',
        fontFamily: 'sans-serif-light'
    },

    price: {
        flexDirection: 'row',
        fontSize: 25,
        paddingLeft: 5,
        color: '#009432',
        textAlign: 'center',
        fontFamily: 'sans-serif-light'
    },
    Horizontal: {
        flexDirection: 'row',
        marginLeft: 0,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
    },

    btn: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',

    },

    imageViewContainer: {
        width: Dimensions.get('window').width,
        height: 170,
        marginTop: 0,
        borderRadius: 0

    },

    imageViewContainerHorizontal: {
        height: 170,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0
    },

    img: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        marginBottom: 10
    }

});
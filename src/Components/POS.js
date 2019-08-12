import React from 'react';
import { AsyncStorage, ToastAndroid, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SkypeIndicator } from 'react-native-indicators';
import { Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
var product_name;
export default class POS extends React.Component {

    static navigationOptions = {
        title: 'POS'
    }

    constructor(props) {
        super(props);
        this._retrieveData();
        this._retrieveDataE();
        product_name = this.props.prod.replace(/[''()]/g, '');
        navigate = props.navigation,
            this.state = {
                emails: '', mobile: '', name: '', idss: '', hash_code: '', txnid_merchent: '', isLoading: false, pidss: this.props.pid
            };
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                this.setState({ idss: value });
            } else {

            }
        } catch (error) {
            // Error retrieving data

        }
    }

    _addOrder(data) {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/UpdateOrder_c/addOrder', {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.idss,
                product_id: this.state.pidss,
                prod_qty: this.props.qtyss,
                product_names: product_name,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Actions.payment({ pg_url: data });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _generateTxnid() {
        this.setState({ isLoading: true });
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Transaction_c/generateId', {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_user_id: this.state.idss
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.txnid == '') {
                    ToastAndroid.show('Something went wrong try again later', ToastAndroid.SHORT);
                    return;
                }
             
                this.setState({
                    txnid_merchent: responseJson.txnid
                });

                this._enc();
                this._payInitiate();
                if (this.state.hash_code == '') {
                    ToastAndroid.show('Cant generate hash, try again later', ToastAndroid.SHORT);
                    return;
                }


            })
            .catch((error) => {
                console.error(error);
            });
    }

    _enc() {
        var sha512 = require('js-sha512');

        var a = sha512("LW4801YLNX|" + this.state.txnid_merchent + "|" + this.props.gt + "|"
            + product_name + "|" + this.state.name + "|" + this.state.emails + "|||||||||||8HQ3YT7VJE");
        this.setState({ hash_code: a });
    }

    _payInitiate() {
        ToastAndroid.show('Please wait!!! we will redirect to payment gateway...', ToastAndroid.SHORT);
        var params = {
            key: "LW4801YLNX",
            txnid: this.state.txnid_merchent,
            amount: this.props.gt,
            productinfo: product_name,
            firstname: this.state.name,
            phone: this.state.mobile,
            email: this.state.emails,
            surl: "https://obaba.shop/response.php",
            furl: "https://obaba.shop/response.php",
            hash: this.state.hash_code
        };
        console.log("Var pproducts====>>>" + product_name + "======");

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");


        fetch("https://pay.easebuzz.in/payment/initiateLink", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({ isLoading: false });
                if (response.status == 1) {

                    this._addOrder(response.data);

                } else if (response.status == '0') {
                    ToastAndroid.show(response.error_desc, ToastAndroid.SHORT);
                }
            })
            .then(() => {

            })
            .catch(err => {

            });
    }


    _retrieveDataN = async () => {
        try {
            const value = await AsyncStorage.getItem('names');
            if (value !== null) {
                this.setState({ name: value })

            }
        } catch (error) {
        }
    }


    _retrieveDataE = async () => {
        this._retrieveData();
        try {
            const value = await AsyncStorage.getItem('email');
            if (value !== null) {
                this.setState({ emails: value })
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
                this.setState({ mobile: value })
                this._retrieveDataN();
            }
        } catch (error) {
            // Error retrieving data
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
        return (<LinearGradient style={styles.indexContainer} colors={['#12CBC4', '#D980FA']}>


            <View style={styles.container}>
                <LinearGradient style={styles.container1} colors={['#4cd137', '#FFFFFF']}>
                    <Text style={styles.txt}>Name          :   {this.state.name}</Text>
                    <Text style={styles.txt}>Mobile         :   {this.state.mobile}</Text>
                    <Text style={styles.txt}>Email           :   {this.state.emails}</Text>
                    <Text style={styles.txt}>Products     :   {product_name}</Text>
                    <Text style={styles.txt}>Grand Total :   ₹{this.props.gt}/-</Text>
                </LinearGradient>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Button onPress={() => this._generateTxnid()} style={styles.btn}>Payment</Button>
                </TouchableOpacity>
            </View>

        </LinearGradient>
        );

    }
}


const styles = StyleSheet.create({
    indexContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcometxt: {
        textAlign: 'center',
        fontSize: 20,
        color: '#10598F'
    },
    btn: {
        marginTop: 20,
        height: 120,
        width: 120,
        justifyContent: 'center',
        borderRadius: 120,
        backgroundColor: '#FFFFFF'
    },
    welcomeImage: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 3,
        resizeMode: 'contain',
        borderRadius: 50,
    },
    container: {
        flex: 1,
        marginTop: Dimensions.get('window').height / 8,
        margin: 20,
        justifyContent: 'center'
    },
    container1: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8
    },
    txt: {
        paddingTop: 0,
        color: '#000',

    }

});
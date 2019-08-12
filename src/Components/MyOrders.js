import React, { Component } from 'react';
import { AsyncStorage, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator, ListView, Text, View, Alert, Image, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';

export default class MyOrders extends React.Component {

    static navigationOptions = {
        title: 'MyOders'
    }

    constructor(props) {
        super(props);
        this._retrieveData();
        navigate = props.navigation,
        this.state = { isLoading: true, idss: '' }

    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                this.setState({ idss: value });
                this._getCart();

            } else {
                alert('No orders found...');
            }
        } catch (error) {
            // Error retrieving data

        }
    }


    _getCart() {

        return fetch('https://obaba.shop/obaba_shop_api/index.php/UpdateOrder_c/getOrders', {
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
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    _removeCart(pid, pn) {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Wishlist_c/removeWishlist', {
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
                    this._getCart();
                } else {
                    alert(pn + ' ' + responseJson.msg);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .9,
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
                    <SkypeIndicator color='#25CCF7' />
                </View>
            );
        }
        return (

            <View style={styles.MainContainer}>

                <ListView

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
                                    <Text></Text>
                                    <Button onPress={() => Actions.contact()} style={styles.btn}>ENQUIRY</Button>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 0,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,

    },
    container: {
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
        color: '#000'

    },
    btn: {
        height: 30,
        backgroundColor: '#70a1ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        margin: 5,
        bottom: 0,
        right: 0
    },
    remove: {
        height: 30,
        backgroundColor: '#7ed6df',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        margin: 5,
        bottom: 0
    },
    btn1: {
        right: 0,
        bottom: 0,

    }

});
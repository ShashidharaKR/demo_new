import React, { Component } from 'react';
import { Dimensions, StyleSheet, ListView, Text, AsyncStorage, TouchableOpacity, View, Image, ToastAndroid, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { SkypeIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import Dialog from "react-native-dialog";
export default class SearchComponent extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Search Results',
    });
    constructor(props) {
        super(props);
        this._retrieveData();
        this.state = { isLoading: true, idss: '0', dialogVisible: false, prod_id: '0', prod_qty: '0', prod_name: '' }
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleSubmit = () => {
        if (this.state.prod_qty == '0' || this.state.prod_qty == '00' || this.state.prod_qty == '000' || this.state.prod_qty == '0000') {
            ToastAndroid.show('Please enter a valied quantity', ToastAndroid.SHORT);
            return;
        }
        this.setState({ dialogVisible: false });
        this._addCart(this.state.prod_id, this.state.prod_name);
    };

    _checkUserId(pid, pn) {
        if (this.state.idss == '0') {
            Actions.login();
        } else {
            this.setState({ prod_id: pid, prod_name: pn });
            this.showDialog(pid, pn);
        }
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


    componentDidMount() {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Product_c/getProductByName', {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: this.props.text,

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
                    alert(pn + ' ' + responseJson.msg);
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
                    height: 2,
                    width: "100%",
                    marginBottom: 5,
                    backgroundColor: "#dfe6e9",
                }}
            />
        );
    }

    ListViewItemSeparatorHorizontal = () => {
        return (
            <View
                style={{
                    height: 270,
                    width: 2,
                    margin: 0,
                    backgroundColor: "#dfe6e9",
                }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
            return (

                <View style={{ flex: 1, paddingTop: 20 }}>
                    {/* <SkypeIndicator style={styles.sky} color='#17c0eb' /> */}
                </View>
            );
        }
        if (this.state.dialogVisible) {
            return (<Dialog.Container visible={true}>
                <Dialog.Title>  Please enter quantity...</Dialog.Title>
                <Dialog.Input onChangeText={(qty) => this.setState({ prod_qty: qty })} style={{ backgroundColor: '#dfe6e9', textAlign: 'center' }} placeholder='1' keyboardType='numeric' onPress={this.handleCancel} ></Dialog.Input>
                <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                <Dialog.Button label="Add to cart" onPress={this.handleSubmit} />
            </Dialog.Container>);
        }
        return (

            <View style={styles.MainContainer}>

                <ListView style={{ backgroundColor: '#FFFFFF' }}

                    dataSource={this.state.dataSource}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) =>

                        <View >
                            <TouchableOpacity onPress={() => Actions.product({ pc: rowData.productCompany, sc: rowData.shippingCharge, producrPrice: rowData.productPrice, pn: rowData.productName, piid: rowData.id, img1: rowData.productImage1, img2: rowData.productImage2, img3: rowData.productImage3, description: rowData.productDescription })}>
                                <Image source={{ uri: "https://obaba.shop/admin/productimages/" + rowData.id + "/" + rowData.productImage1 }} style={styles.imageViewContainer} />
                            </TouchableOpacity>
                            <Text style={styles.textViewContainer} >{rowData.productName}</Text>
                            <View style={styles.obaba} >
                                <Button >{"₹" + rowData.productPrice + "/-"}</Button>
                                <Text style={{ marginTop: 10, right: 0, textDecorationLine: 'line-through', color: '#e74c3c' }} >{"₹" + rowData.productPriceBeforeDiscount + "/-"}</Text>
                                <Icon
                                    raised
                                    name='add-shopping-cart'
                                    type='MaterialIcons'
                                    color='#f39c12'
                                    size={20}
                                    style={{ marginTop: 10, right: 0 }}
                                    onPress={() => this._checkUserId(rowData.id, rowData.productName)}
                                />
                            </View>
                        </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        marginTop: 5,
        padding: 2,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,


    },
    textViewContainer: {
        marginLeft: 10,
    },
    sky: {

        alignItems: 'center',

    },
    obaba: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: Dimensions.get('window').width,
    },
    Horizontal: {
        flexDirection: 'row',
        margin: 5,
    },

    btn: {
        margin: 0,
        backgroundColor: '#FFFFFF',

    },
    imageViewContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 3,
        resizeMode: 'contain',
        resizeMode: 'contain',
        marginTop: 0,
        borderRadius: 0
    },

    imageViewContainerHorizontal: {
        height: 170,
        resizeMode: 'contain',
        margin: 10,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0
    },

    img: {
        height: Dimensions.get('window').height / 3,
        borderRadius: 0,
        marginTop: 8,
        backgroundColor: '#000',
        marginBottom: 10
    }

});
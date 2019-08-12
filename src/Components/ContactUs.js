import React from 'react';
import { Linking, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { View } from 'native-base';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';



export default class ContactUs extends React.Component {
  static navigationOptions = {
    title: 'Contact us'
  }
  _pressCall = () => {
    const url = 'tel:+918880555778'
    Linking.openURL(url)
  }


  render() {
    return <LinearGradient style={styles.indexContainer} colors={['#D980FA', '#12CBC4']}>
      <ScrollView>
        <View style={styles.container}>
          <Icon
            raised
            name='location-on'
            type='Ionicons'
            color='#f53b57'
            size={Dimensions.get('window').width / 14}
            onPress={() => Linking.openURL('https://goo.gl/maps/1fUF7sYaiNs')}
          />
          <Text style={styles.txt}>{`   78/1-5, 3rd Floor,Royal Barter
   Residency Road Ashok Nagar,
   Bengaluru,Karnataka - 560025 `}</Text>
        </View>
        <View style={styles.container}>
          <Icon
            raised
            name='call'
            type='Ionicons'
            color='#5352ed'
            size={Dimensions.get('window').width / 14}
            onPress={this._pressCall}
          />
          <Text style={styles.txt}>{`   +91-8880555778`}</Text>
        </View>
        <View style={styles.container}>
          <Icon
            raised
            name='call'
            type='Ionicons'
            color='#17c0eb'
            size={Dimensions.get('window').width / 14}
            onPress={() => Linking.openURL('tel:+919590446666')}
          />
          <Text style={styles.txt}>{`   +91-9590446666`}</Text>
        </View>

        <View style={styles.container}>

          <Icon
            raised
            name='email'
            type='Ionicons'
            color='#e1b12c'
            size={Dimensions.get('window').width / 14}
            onPress={() => Linking.openURL('mailto:info@obaba.shop')}


          />
          <Text style={styles.txt}>{`    info@obaba.shop`}</Text>
        </View>
        <View style={styles.container}>

          <Icon
            raised
            name='web'
            type='MaterialCommunityIcons'
            color='#c56cf0'
            size={Dimensions.get('window').width / 14}
            onPress={() => Linking.openURL('https://obaba.shop')}
          />
          <Text style={styles.txt}>{`    https://obaba.shop   `}</Text>
        </View>

        <View style={styles.container}>

          <Icon
            raised
            name='web'
            type='MaterialCommunityIcons'
            color='#44bd32'
            size={Dimensions.get('window').width / 14}
            onPress={() => Linking.openURL('https://obaba.in/')}
          />
          <Text style={styles.txt}>{`    https://obaba.in   `}</Text>
        </View>
        <View style={styles.container}>

          <Icon
            raised
            name='web'
            type='MaterialCommunityIcons'
            color='#3B3B98'
            size={Dimensions.get('window').width / 14}
            onPress={() => Linking.openURL('https://www.obabaerp.com/')}
          />
          <Text style={styles.txt}>{`    https://www.obabaerp.com   `}</Text>
        </View>

        <View style={styles.container}>

          <Icon
            raised
            name='web'
            type='MaterialCommunityIcons'
            color='#FC427B'
            size={Dimensions.get('window').width / 14}
            onPress={() => Linking.openURL('https://www.obabajobs.com/')}
          />
          <Text style={styles.txt}>{`    https://www.obabajobs.com   `}</Text>
        </View>
      </ScrollView>
    </LinearGradient>;
  }
}
const styles = StyleSheet.create({
  indexContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  txt: {
    paddingTop: 0,
    color: '#FFFFFF'
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0
  },
  button: {
    backgroundColor: '#2980b9',
    height: 40,
    color: "#fff",
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    margin: 10,
    paddingLeft: 10,
    backgroundColor: '#ecf0f1',
    color: "#2c3e50",
    borderRadius: 2
  },
});


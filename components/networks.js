import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants'

const Networks = ({ selected, handleSelected }) => {
    const network = [
        {
            id: 0,
            name: 'mtn',
            urls: require("../assets/networks/mtn-mobile-logo-icon.png")
        },
        {
            id: '1',
            name: 'airtel',
            urls: require("../assets/networks/airtel-logo-icon.png")
        },
        {
            id: 2,
            name: 'glo',
            urls: require("../assets/networks/Glo_Limited.png")
        },
        {
            id: 3,
            name: '9mobile',
            urls: require("../assets/networks/9mobile-Logo.png")
        },
    ]


  return (
    <View style={styles.itemContainer}>
        {network.map(item => {
            let imageStyle = styles.image
            if(selected === item.id){
             imageStyle = styles.focusImage
            }
            return (
            <TouchableOpacity onPress={()=> handleSelected(item)} style={styles.netCard} key={item.id}>
                <Image style={imageStyle} source={item.urls} />
                <Text style={styles.netText}>{item.name}</Text>
            </TouchableOpacity>
        )}
        )}
        
    </View>
  )
}

const styles = StyleSheet.create({
    itemContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 30,
        borderBottomColor: '#A8A8A8',
        borderBottomWidth: 1
    },
    netCard:{
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 5,
        tintColor: COLORS.darkgray
    },
    focusImage:{
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    netText: {
        fontWeight: '500',
        fontSize:16,
    }
})

export default Networks

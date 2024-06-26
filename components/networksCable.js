import React from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants'

const NetworksCable = ({ selected, handleSelected }) => {
    const network = [
        {
            id: 0,
            name: 'DsTV',
            urls: require("../assets/cables/dstv-logo-vector.png")
        },
        {
            id: 1,
            name: 'GoTV',
            urls: require("../assets/cables/gotv-nigeria-logo-vector.png")
        },
        {
            id: 2,
            name: 'StarTimes',
            urls: require("../assets/cables/1663649.jpg")
        },
    ]


  return (
    <View style={styles.itemContainer}>
        {network.map(item => {
            let imageStyle = styles.image

            if(selected === item.id){
                imageStyle = styles.focusImage
            }
            return(
            <TouchableOpacity onPress={()=> handleSelected(network[item.id])} style={styles.netCard} key={item.id}>
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
        width: 70,
        height: 40,
        marginBottom: 5,
        tintColor: COLORS.darkgray
    },
    focusImage: {
        width: 70,
        height: 40,
        marginBottom: 5
    },
    netText: {
        fontWeight: '500',
        fontSize:16,
    }
})

export default NetworksCable

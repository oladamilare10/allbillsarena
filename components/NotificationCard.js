import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants'


let Naira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  })


const NotificationCard = ({ items }) => {
    let date = (new Date(items.item.t_time)).getTime();
    let today = (new Date()).getTime();
    let msDay = 24 * 60 * 60 * 1000; // milliseconds per day
    let hrDay = 60 * 1000; // milliseconds per day

    let day = Math.floor((today - date) / msDay);
        let jsDay = Math.floor((today - date) / hrDay);
    let days = day + " days ago"
    if(day > 365) {
        days = "about " + Number(Math.round(day / 365)) + " year ago"
    }
    if (day > 600) {
        days = "about " + Number(Math.round(day / 365)) + " years ago"
    }
    if(day < 1) {
        if(jsDay > 59){
            days = "about " + Number(Math.round(jsDay / 60)) + " hrs ago"
        }
        if(jsDay < 60){
            days = "about " + jsDay + " mins ago"
        }
    }
  return (
    <TouchableOpacity
        style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            width: "100%",
            marginBottom:8,
            borderWidth: 1,
            borderColor: COLORS.gray,
            borderRadius: 5,
        }}
    >
        <View style={{flexDirection: 'column'}}>
            <View style={{
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: COLORS.gray
            }}>
                <Text style={{...FONTS.h4, color: '#807E7E'}}>{Naira.format(items.item.t_amount)}</Text>
                <Text style={{...FONTS.body5, color: '#7D7D7D'}}>{days}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 25,
                justifyContent: 'space-between',
            }}>
                <Text style={{...FONTS.body2, color:COLORS.secondary}}>{items.item.t_name}</Text>
                {items.item.t_status === "success" ? 
                    <Text style={{...FONTS.body5, color:COLORS.primary}}>{items.item.t_status}</Text>
                    :
                    <Text style={{...FONTS.body5, color:COLORS.red}}>{items.item.t_status}</Text>
                }
            </View>
        </View>

    </TouchableOpacity>
  )
}

export default NotificationCard
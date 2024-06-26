import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';

export default function ImagePick ({ onPress }) {
    return(
        <View>
            <TouchableOpacity style={styles.uploadBtn} onPress={onPress}>
                <Feather name="file-plus" size={20} color="white" />
                <Text style={styles.upText}>Upload ScreenShot</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    uploadBtn: {
        flexDirection: 'row',
        width: 200,
        padding: 10,
        backgroundColor: '#31AA8A',
        justifyContent: 'space-around',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    upText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 17
    }
})

import React from 'react'
import { View } from 'react-native'

const RenderItems = ({ item }) => {
        let imageLink = item.logoUrls[0]
  return (
        <TouchableOpacity
            style={{ marginBottom: SIZES.padding * 2, width: 170, alignItems: 'center' }}
            onPress={() => {
                setSelectedCard(item)
                console.log(item)
            }}
        >
            <View
                style={{
                    height: 110,
                    width: 150,
                    marginBottom: 5,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={{uri: imageLink}}
                    resizeMode="contain"
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
            </View>
            <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.productName}</Text>
        </TouchableOpacity>
  )
}

export default RenderItems

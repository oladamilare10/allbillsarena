import React, {memo} from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SIZES, FONTS } from '../constants';

function Search ({searchData, setSelectedCard, setModalCodeVisible}) {

    const Header = () => (
        <View style={{ marginBottom: SIZES.padding * 2 }}>
            <Text style={{ ...FONTS.h3 }}>Search Result</Text>
        </View>
    )

    const renderItem = ({ item }) => {
            
        let imageLink = item.logoUrls[0]

        return(
        <TouchableOpacity
            style={{ marginBottom: SIZES.padding * 2, width: 170, alignItems: 'center' }}
            onPress={() => {
                setSelectedCard(item)
                setModalCodeVisible(true)
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
                    resizeMode="cover"
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius:10
                    }}
                />
            </View>
            <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.productName}</Text>
        </TouchableOpacity>
    )}


    return(
        <View style={{
            marginTop:10,
        }}>
            {searchData ?
                <FlatList
                    ListHeaderComponent={Header}
                    data={searchData}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                    keyExtractor={item => `${item.productId}`}
                    initialNumToRender={4}
                    renderItem={renderItem}
                    style={{ marginTop: SIZES.padding * 0 }}
                    ListFooterComponent={
                        <View style={{ marginBottom: 220 }}>
                        </View>
                    }
                />
            :
            <View>
                <Text >
                    your Search result Goes here....
                </Text>
            </View>
        }
        </View>
    )
}

export default memo(Search)
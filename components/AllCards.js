import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SIZES, FONTS, COLORS } from "../constants"

function AllCards({ features }) {

    const Header = () => (
        <View style={{ marginBottom: SIZES.padding * 2 }}>
            <Text style={{ ...FONTS.h3 }}> Features</Text>
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
                    resizeMode="contain"
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
            </View>
            <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.productName}</Text>
        </TouchableOpacity>
    )}

    return (
        <View>
             {features && 
             <FlatList
                ListHeaderComponent={Header}
                data={features}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={item => `${item.productId}`}
                initialNumToRender={7}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding * 16 }}
            />}
        </View>
    )
}

export default AllCards
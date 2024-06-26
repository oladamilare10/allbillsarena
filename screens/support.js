import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const Support = ({ navigation }) => {
    const userBal = {wallet_balance: 300, accountNum: 6729472343}

    const featuresData = [
        {
            id: 1,
            icon: icons.support,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "08123456789"
        },
        {
            id: 2,
            icon: icons.email,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "support@allbills.com.ng"
        },
        {
            id: 3,
            icon: icons.facebook,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "allBillsArena"
        },
        {
            id: 4,
            icon: icons.instagram,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "@allBillsArena"
        },
        {
            id: 5,
            icon: icons.twitter,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "@allBillsArena"
        },
    ]

    const specialPromoData = [
        {
            id: 1,
            img: images.promoBanner,
            title: "Bonus Cashback1",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 2,
            img: images.promoBanner,
            title: "Bonus Cashback2",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 3,
            img: images.promoBanner,
            title: "Bonus Cashback3",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 4,
            img: images.promoBanner,
            title: "Bonus Cashback4",
            description: "Don't miss it. Grab it now!"
        },
    ]

    const [features, setFeatures] = React.useState(featuresData)
    const [showPassword, setShowPassword] = React.useState(false)
    const [specialPromos, setSpecialPromos] = React.useState(specialPromoData)

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2
                }}
                onPress={() => navigation.navigate("Home")}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.emerald
                    }}
                />

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Help & Support</Text>
            </TouchableOpacity>
        )
    }

    function renderFeatures() {

        const Header = () => (
            <View style={{ marginTop: SIZES.padding * 4, marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Support</Text>
            </View>
        )

        const renderItem = ({ item }) => (
            <View
                style={{ marginBottom: SIZES.padding * 2,flexDirection:"row",justifyContent:"flex-start",alignItems: 'center' }}
                onPress={() => navigation.navigate(item.description)}
            >
                <View
                    style={{
                        height: 40,
                        width: 40,
                        marginBottom: 5,
                        borderRadius: 5,
                        backgroundColor: item.backgroundColor,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: item.color
                        }}
                    />
                </View>
                <Text style={{ marginLeft: 20, textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.description}</Text>
            </View>
        )

        return (
            <FlatList
                ListHeaderComponent={Header}
                data={features}
                WrapperStyle={{ width: '100%' }}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding * 2 }}
            />
        )
    }

    function renderPromos() {

        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderFeatures()}
            </View>
        )

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={specialPromos}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View style={{ marginBottom: 80 }}>
                    </View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderPromos()}
        </SafeAreaView>
    )
}

export default Support;
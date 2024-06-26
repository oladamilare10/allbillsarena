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

const Profile = ({ navigation }) => {

    const featuresData = [
        {
            id: 1,
            icon: icons.support,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Help & Support"
        },
        {
            id: 2,
            icon: icons.bank,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Account Details"
        },
        {
            id: 3,
            icon: icons.settings,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Settings"
        },
        {
            id: 4,
            icon: icons.logout,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Logout"
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

    function renderBanner() {
        return (
            <View
                style={{
                    height: 120,
                    width: 120,
                    marginTop: 80,
                    marginRight: "auto",
                    marginLeft: "auto",
                    borderRadius: 100,
                    backgroundColor: COLORS.primary,
                    padding: 20,
                    borderWidth:4,
                    borderColor: COLORS.darkgray,
                }}
            >
                <View
                style={{
                    height: 75
                }}
                >
                
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={icons.aLetter}
                            resizeMode="cover"
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 10
                            }}
                        />
                        <Image
                            source={showPassword ? icons.edit : icons.edit}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.gray,
                                marginTop: 4,
                                position:'absolute',
                                bottom: -25,
                                right: -20
                            }}
                        />
                    </TouchableOpacity>

                </View>
                
            </View>
        )
    }

    function renderFeatures() {

        const Header = () => (
            <View style={{ marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Features</Text>
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
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
            </TouchableOpacity>
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
                {renderBanner()}
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

export default Profile;
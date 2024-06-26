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
import { useLogin } from "../constants/CheckLiogin";
import useUser from "../components/useUser";
import useBalance from "../components/useBal";



const Account = ({ navigation }) => {
    const {isLoggedIn} = useLogin();
    const {userData} = useUser(isLoggedIn);
    const {balance: userBal} = useBalance()

    const user = userData


    let featuresData = []
    if(user){
    featuresData = [
        {
            id: 1,
            icon: icons.user,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: user.f_name + ' ' + user.l_name
        },
        {
            id: 3,
            icon: icons.email,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: user.email
        },
        {
            id: 4,
            icon: icons.phone,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: user.phone
        },
        {
            id: 5,
            icon: icons.cake,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: user.dob ? user.dob : "Your DOB is currently empty"
        },
    ]
}

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

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Account Details</Text>
            </TouchableOpacity>
        )
    }

    function renderFeatures() {

        const Header = () => (
            <View style={{ marginTop: SIZES.padding * 4, marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Account</Text>
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
            <>
                {user && <FlatList
                    ListHeaderComponent={Header}
                    data={featuresData}
                    WrapperStyle={{ width: '100%' }}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    style={{ marginTop: SIZES.padding * 2 }}
                />}
            </>
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

export default Account;
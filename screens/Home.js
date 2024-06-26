import React, {memo} from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { useLogin } from "../constants/CheckLiogin";

const Home = ({ navigation }) => {
    const {isLoggedIn} = useLogin();
    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    const featuresData = [
        {
            id: 1,
            icon: icons.sell,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Sell Crypto"
        },
        {
            id: 2,
            icon: icons.buy,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Buy Crypto"
        },
        {
            id: 3,
            icon: icons.send,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Send Money"
        },
        {
            id: 4,
            icon: icons.internet,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Data"
        },
        {
            id: 5,
            icon: icons.phone,
            color: COLORS.green,
            backgroundColor: COLORS.lightGreen,
            description: "Airtime"
        },
        {
            id: 6,
            icon: icons.television,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Cable TV"
        },
        {
            id: 7,
            icon: icons.card,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Gift Card"
        },
        {
            id: 8,
            icon: icons.plugin,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Electric"
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

    const addFund = [
        {
            id: 1,
            description: "Add Naira",
            navigationPage: "Add Fund"
        },
        {
            id: 2,
            description: "Add Crypto",
            navigationPage: "Sell Crypto"
        }
    ]


    const [features, setFeatures] = React.useState(featuresData)
    const [showPassword, setShowPassword] = React.useState(false)
    const [specialPromos, setSpecialPromos] = React.useState(specialPromoData)
    const [showFundOptions, setShowFundOptions] = React.useState(false)
    const [userBal, setBalance] = React.useState(null);
    const [balError, setBalError] = React.useState(null)
    const url2 = 'https://api.allbillsarena.com.ng/wallet.php'



    const urlHeader2 = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const urlBody = JSON.stringify(
        {
          user_id: isLoggedIn
        }
      )

    let Naira = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    })

    React.useEffect(()=> {
        fetch(url2, {
          method: "POST",
          header: urlHeader2,
          body: urlBody
        })
        .then(res => {
            if (!res.ok) {
              throw Error('Could not fetch Data for this particular resource.')
            }
            return res.json();
        })
        .then(data => {
            if (data.status === 'error') {
                throw Error(data.message)
            }
            setBalance(data.result.data);
            setBalError(null)
        })
        .catch(err => {
            setBalError(err.message)
        })
      }, [refreshing])

      

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 5 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h1 }}>Hello!</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.gray }}>Chief</Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.lightGray
                        }}
                        onPress={() => navigation.navigate("Notifications")}
                    >
                        <Image
                            source={icons.bell}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.secondary
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                height: 10,
                                width: 10,
                                backgroundColor: COLORS.red,
                                borderRadius: 5
                            }}
                        >
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    function renderBanner() {
        return (
            <View
                style={{
                    height: 120,
                    borderRadius: 20, 
                    padding: SIZES.padding,
                    backgroundColor: COLORS.primary,
                }}
            >
                <View
                style={{
                    height: 75
                }}
                >
                
                    {userBal && <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Text 
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.h3,
                            marginRight: 7
                        }}>{Naira.format(userBal.w_balance)}</Text> 
                        : 
                        <Text 
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.h3,
                            marginRight: 7
                        }}>******</Text>}
                        
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white,
                                marginTop: 4
                            }}
                        />
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={()=> navigation.navigate("Add Fund")} style={{flexDirection:'row',justifyContent:'flex-start'}}>
                        <Text style={{color:COLORS.darkgray,fontSize:13}}>Add Funds</Text>
                        <Image 
                            source={icons.wallet}
                            style={{
                                width:20,
                                height:20,
                                tintColor:COLORS.darkgray,
                                marginLeft:8,
                            }}
                        />
                    </TouchableOpacity>

                    {showFundOptions && <View style={{
                        backgroundColor: COLORS.white,
                        zIndex:10,
                        borderRadius:5,
                        width:130,
                        position:'absolute',
                        left: -5,
                        top: 55
                    }}>
                        {addFund.map((fundOption)=> {
                            return(
                                <TouchableOpacity style={{
                                    padding:10,
                                    borderBottomWidth:1,
                                    borderBottomColor:COLORS.lightGray,
                                }}
                                onPress={() => navigation.navigate(fundOption.navigationPage)}
                                key={fundOption.id}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize:12,
                                        fontWeight:"600",
                                        color:COLORS.emerald
                                    }}>{fundOption.description}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>}

                </View>
                <View>
                    {userBal && <Text
                    style={{
                        color: COLORS.white,
                        fontSize: SIZES.body3
                    }}
                    >{userBal.w_id}</Text>}
                </View>
                {/* <Image
                    source={images.banner}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20
                    }}
                /> */}
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
                style={{ marginBottom: SIZES.padding * 2, width: 60, alignItems: 'center' }}
                onPress={() => navigation.navigate(item.description)}
            >
                <View
                    style={{
                        height: 50,
                        width: 50,
                        marginBottom: 5,
                        borderRadius: 20,
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
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.description}</Text>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={Header}
                data={features}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
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
                {renderBanner()}
                {renderFeatures()}
                {renderPromoHeader()}
            </View>
        )

        const renderPromoHeader = () => (
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: SIZES.padding
                }}
            >
                {/* <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3 }}>Special Promos</Text>
                </View>
                <TouchableOpacity
                    onPress={() => console.log("View All")}
                >
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
                </TouchableOpacity> */}
            </View>

        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base,
                    width: SIZES.width / 2.5
                }}
                onPress={() => console.log(item.title)}
            >
                {/* <View
                    style={{
                        height: 80,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Image
                        source={images.promoBanner}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20
                        }}
                    />
                </View>

                <View
                    style={{
                        padding: SIZES.padding,
                        backgroundColor: COLORS.lightGray,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20
                    }}
                >
                    <Text style={{ ...FONTS.h4 }}>{item.title}</Text>
                    <Text style={{ ...FONTS.body4 }}>{item.description}</Text>
                </View> */}
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={specialPromos}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh} 
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

export default Home;
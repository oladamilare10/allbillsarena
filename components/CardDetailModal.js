import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, icons } from '../constants';

const CardDetailModal = ({ load, modalCodeVisible, setModalCodeVisible, setSelectedCard, card, submitForm }) => {
  const [pinCode, setPinCode] = useState(null)
  const [amount, setAmount] = useState("");
  const [quantity,setQuantity] = useState(1)
  const [email,setEmail] = useState("")
  const [showDrop, setShowDrop] = useState(false)
    let Naira = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      })
      let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })

      const addQuantity = ()=> {
        setQuantity(quantity + 1)
      }

      const subtractQuantity = ()=> {
        if(quantity === 1){

        }else{
          setQuantity(quantity - 1)
        }
      }
      const generateTransactionRef = (length) => {
        var result = '';
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return `aba_gc_ref_${result}`;
      };

      const sendData = {
        productId: card.productId,
        quantity: quantity,
        unitPrice: amount,
        customIdentifier: generateTransactionRef(7),
        senderName: 'John Doe',
        recipientEmail: email,
        recipientPhoneDetails: {countryCode: 'NG', phoneNumber: '012345678'},
        preOrder: false
      }

      
  return (
    <View style={styles.centeredView}>
      {card ? <Modal
        animationType="slide"
        transparent={true}
        visible={modalCodeVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalCodeVisible(!modalCodeVisible);
        }}>
        <View style={styles.centeredView}>
          <ScrollView style={{...styles.modalView}}> 

            <View
            style={{
              flexDirection:'row',
              justifyContent: 'flex-start'
            }}>
              <Text style={{ ...styles.modalText,fontWeight:"600",fontSize:24}}>{card.productName}</Text>
              <Text style={{color: COLORS.primary,marginLeft: 5}}>{card.country.isoName}</Text>
            </View>
            {/* <AntDesign name="checkcircle" size={40} color="green" /> */}

            <View style={{
                marginTop:0,
                width: '100%',
                flexDirection:'column',
                justifyContent:'space-between',
                paddingTop:10
            }}>
                <Image
                  source={{uri: card.logoUrls[0]}}
                  style={{
                    width:'100%',
                    height:150,
                    borderRadius:10,
                    marginBottom:20
                  }} />
                  <View style={{marginLeft: 10}}>
                      <View style={{marginBottom:15}}>
                        <Text style={{color:COLORS.darkgray,fontSize:20}}>Select Amount</Text>
                        <View
                          style={{
                            flexDirection:'column',
                            width:'100%',
                            justifyContent:'space-around',
                            marginTop:10,
                          }}
                        >
                          {
                            card.fixedRecipientDenominations.length > 0? 
                          <TouchableOpacity style={{
                            borderBottomWidth:1,
                            padding:8,
                            paddingLeft:16,
                            width:'100%',
                            borderBottomColor:COLORS.primary,
                            flexDirection:'row',
                            justifyContent:'space-between'
                          }} onPress={()=> setShowDrop(!showDrop)}>
                            <Text style={{fontSize:19,fontWeight:500,color:COLORS.emerald}}>{card.recipientCurrencyCode + ' ' + amount}</Text>
                            <Image
                              source={icons.down}
                              style={{
                                width:10,
                                height:10,
                                tintColor:COLORS.primary
                              }}
                            />
                          </TouchableOpacity>
                            : 
                            <TextInput 
                              onChangeText={(val) => setAmount(val)} 
                              style={{
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.primary,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.primary,
                                ...FONTS.body3
                              }}
                              keyboardType='numeric'
                              placeholder="Enter Amount(min USD 5)"
                              placeholderTextColor={COLORS.primary}
                              selectionColor={COLORS.primary}
                            
                            />
                          }
                          {showDrop && 
                            <View style={{
                              borderWidth:1,
                              borderColor:COLORS.darkgray,
                              position:'absolute',
                              width:'100%',
                              top:35,
                              zIndex:100,
                              backgroundColor:COLORS.white,
                              borderBottomRightRadius:10,
                              borderBottomLeftRadius:10
                            }}>
                              {card.fixedRecipientDenominations.map((demItem, index) => {
                              return(
                                <TouchableOpacity
                                 style={{
                                  backgroundColor:COLORS.white,
                                  borderBottomColor:COLORS.gray,
                                  borderBottomWidth:1,
                                  padding:8,
                                  paddingLeft:10
                                 }}
                                 onPress={()=> {
                                  setAmount(demItem)
                                  setShowDrop(false)
                                 }}
                                key={index}>
                                  <Text style={{fontSize:13,color:COLORS.black,fontWeight:500}}>{card.recipientCurrencyCode + ' ' + demItem}</Text>
                                </TouchableOpacity>
                              )
                            })}
                            </View>  
                          }
                        </View>
                      </View>
                      <View>
                        <Text style={{color:COLORS.darkgray,fontSize:20}}>Quantity</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: 'flex-start',
                            marginTop:10
                          }}
                        >
                          <TouchableOpacity
                           style={{
                            backgroundColor:COLORS.red,
                            borderRadius:3,
                            paddingVertical:6,
                            paddingHorizontal:10,
                            alignItems:'center'
                           }}
                           onPress={subtractQuantity}>
                            <Text
                              style={{
                                color:COLORS.white,
                                fontWeight:'bold',
                                fontSize:18
                              }} >-</Text>
                          </TouchableOpacity>

                          <Text style={{color:COLORS.darkgray,fontSize:22,marginHorizontal:15}}>{quantity}</Text>

                          <TouchableOpacity
                           style={{
                            backgroundColor:COLORS.primary,
                            borderRadius:3,
                            paddingVertical:6,
                            paddingHorizontal:10,
                            alignItems:'center'
                           }}
                           onPress={addQuantity}>
                            <Text
                              style={{
                                color:COLORS.white,
                                fontWeight:'bold',
                                fontSize:18
                              }} >+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                  </View>
            </View>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center'
            }} >
              <TextInput onChangeText={(val) => setEmail(val)} 
                style={{
                  marginVertical: SIZES.padding,
                  borderBottomColor: COLORS.primary,
                  borderBottomWidth: 1,
                  height: 40,
                  width:'100%',
                  color: COLORS.primary,
                  ...FONTS.body3
                }}
                placeholder="Enter Delivery Email"
                placeholderTextColor={COLORS.primary}
                selectionColor={COLORS.primary}
              />
            </View>
            

            <Pressable
              style={{
                ...styles.button,
                marginTop:40,
                backgroundColor:COLORS.emerald
              }}
              onPress={() => {
                submitForm(sendData)
              }}>
              {load ?
                <ActivityIndicator color={COLORS.white} size="small" />
              :
                <Text style={styles.textStyle}>Proceed</Text>
              }
            </Pressable>

            
            <Pressable
              style={{
                position: "absolute",
                top: -20,
                right:0
              }}
              onPress={() => {
                setModalCodeVisible(!modalCodeVisible)
                setSelectedCard(null)
              }}>
              <Text style={{color: COLORS.black,fontSize:25,padding:10}}> {"< back"} </Text>
            </Pressable>


          </ScrollView>
        </View>
      </Modal>: <Text style={{ ...styles.modalText,fontWeight:"600",fontSize:19}}>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: "#00000049",
  },
  modalView: {
    margin: 20,
    width: '90%',
    marginTop: 40,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.primary,
    marginTop: 50,
    position: "absolute",
    bottom: 40
  },
  textStyle: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
    paddingLeft: 40,
    paddingRight: 40
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '500',
    color: 'grey'
  },
});

export default CardDetailModal;
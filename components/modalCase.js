import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ModalCase = ({usd, ngn, modalVisible, setModalVisible, tId }) => {
    let Naira = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      })
      let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}> 


            <AntDesign name="checkcircle" size={40} color="green" />

            <View style={{
                marginTop:20,width: '90%',
                alignItems: 'center'
            }}>
                <Text style={{fontSize:17,color: 'grey',fontWeight: '500'}}>Your Transaction Was Submitted</Text>
                <Text style={{fontSize:15,color: '#febb39',fontWeight: '400'}}>We are Verifying Your Transaction</Text>
            </View>

            <View style={{
                marginTop:50,width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
            <Text style={styles.modalText}>Transaction Amount: </Text>
            <Text style={styles.modalText}>{USDollar.format(usd)}</Text>
            </View>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }} >
            <Text style={styles.modalText}>Naira Eq: </Text>
            <Text style={styles.modalText}>{Naira.format(ngn)}</Text>
            </View>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }} >
            <Text style={styles.modalText}>Transaction ID: </Text>
            <Text style={styles.modalText}>{tId}</Text>
            </View>
            

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>


          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 222,
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
    alignItems: 'center',
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
    backgroundColor: '#2196F3',
    marginTop: 50
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
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

export default ModalCase;
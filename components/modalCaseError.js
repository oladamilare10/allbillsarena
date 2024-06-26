import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ModalCaseError = ({ modalVisibleErr, setModalVisibleErr, resMessage }) => {
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
        visible={modalVisibleErr}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibleErr(!modalVisibleErr);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}> 


            <MaterialIcons name="cancel" size={90} color="red" />

            <View style={{
                marginTop:20,width: '90%',
                alignItems: 'center'
            }}>
                <Text style={{fontSize:17,color: 'grey',fontWeight: '500'}}>Transaction was not successful</Text>
                <Text style={{fontSize:15,color: '#febb39',fontWeight: '400'}}>{resMessage}</Text>
            </View>

            {/* <View style={{
                marginTop:50,width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
            <Text style={styles.modalText}>Transaction Amount: </Text>
            </View>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }} >
            <Text style={styles.modalText}>Naira Eq: </Text>
            </View>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }} >
            <Text style={styles.modalText}>Transaction ID: </Text>
            </View> */}
            

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisibleErr(!modalVisibleErr)}>
              <Text style={styles.textStyle}>Close</Text>
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
    paddingTop: 222,
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

export default ModalCaseError;
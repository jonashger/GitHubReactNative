import React, { Component } from "react";
import {View, Text,Modal,StyleSheet, TouchableOpacity} from 'react-native';
import translate from "../locales";

/**
 * Modal para exibir as informações do repositório.
 */
export default class DadosRepo extends Component {
 
  constructor(props) {
    super(props);
  }  
  componentWillUnmount(){
   this.props.onCancel();
  }
  render(){
    return(
      <Modal 
        onRequestClose={this.props.onCancel} 
        animationType="fade" 
        transparent={true} 
        visible={this.props.visible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxTitle}>{translate('About')} </Text>
            <Text>{translate('Version')}: 1.0.0</Text>
            <Text>{translate('Language')}: React Native</Text>
            <Text></Text>
            <Text>{translate('AboutText')}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button,styles.cancelButton]}
              onPress={this.props.onCancel}
            >
              <Text style={styles.buttonText}>{translate('Close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        width: 280,
    },
    boxTitle:{
        fontWeight: 'bold',
        fontSize: 16, 
        marginBottom: 40,
    },
    buttonContainer:{
        marginTop: 10,
        height: 40,
        width: 280,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    cancelButton:{
        height: 40,
        backgroundColor: '#E25F5F',
        marginRight: 5,
    },
    buttonText:{
        fontWeight: 'bold',
        color: '#fff',
        flexDirection: 'row',
    }
})
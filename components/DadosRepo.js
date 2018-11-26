import React, { Component } from "react";
import {View, Text,Modal,StyleSheet, TouchableOpacity} from 'react-native';
import translate from "../locales";

/**
 * Modal para exibir as informações do repositório.
 */
export default class DadosRepo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newRepoText: '',
    };
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
            <Text style={styles.boxTitle}>{translate('RepositoryInformation')}: {this.props.data.repoText}</Text>
            <Text>{translate('Description')}: {this.props.data.description || translate('WithoutDescription')}</Text>
            <Text>{translate('Language')}: {this.props.data.language}</Text>
            <Text>{translate('Stars')}: {this.props.data.stars}</Text>
            <Text>{translate('Forks')}: {this.props.data.forks}</Text>
            <Text>{translate('Watching')}: {this.props.data.watchers}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button,styles.cancelButton]}
              onPress={this.props.onCancel}
            >
              <Text style={styles.buttonText}>{translate('Cancel')}</Text>
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
        width: 380,
    },
    boxTitle:{
        fontWeight: 'bold',
        fontSize: 16, 
        marginBottom: 30,
    },
    buttonContainer:{
        marginTop: 10,
        height: 40,
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
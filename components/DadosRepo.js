import React, { Component } from "react";
import {View, Text,Modal,TextInput,StyleSheet, TouchableOpacity} from 'react-native';


export default class DadosRepo extends Component {

    state = {
        newRepoText: '',
    };

    render(){
        return(
            <Modal onRequestClose={this.props.onCancel} animationType="fade" transparent={true} visible={this.props.visible}>
                <View style={styles.modalContainer}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.boxTitle}>Informação do Repositório "{this.props.data.repoText}"</Text>
                    
                        <Text>Descrição: {this.props.data.description || `Sem descrição`}</Text>
                        <Text>Linguagem: {this.props.data.language}</Text>
                        <Text>Estrelas: {this.props.data.stars}</Text>
                        <Text>Forks: {this.props.data.forks}</Text>
                        <Text>Observando: {this.props.data.watchers}</Text>
                    </View>
                         <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button,styles.cancelButton]}
                                        onPress={this.props.onCancel}>
                                            <Text style={styles.buttonText}>Cancelar</Text>
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
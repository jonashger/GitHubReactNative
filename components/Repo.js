import React, { Component } from "react";
import {View, StyleSheet,Text,Image,TouchableOpacity} from 'react-native';

export default class Repo extends Component{
    render() {
      
      return(<View style={styles.repo}>
            <Image 
            style={styles.repoImage}
            source={{ uri:this.props.data.thumbnail}}/>
            <View style={styles.repoInfo}>
                <Text style={styles.repoTitle}>{this.props.data.title}</Text>
                <Text style={styles.repoAuthor}>{this.props.data.author}</Text>
                    
            </View>
                         <TouchableOpacity style={[styles.rigthAlign]}
                            onPress={() => this.props.onRemove(this.props.data)}>
                                 <View style={styles.delete}>
                                   <Text style={[styles.deleteText]}>X</Text>
                                </View>
                         </TouchableOpacity>
        </View>
      );
    };
}


const styles = StyleSheet.create({
    repo:{
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 20,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
      },
    repoImage:{
          width: 50,
          height: 50,
          borderRadius: 25,
      },
    repoInfo: {
        flex:1,
        marginLeft: 10,
      },
    repoTitle: {
          fontWeight: 'bold',
          color: '#333',
      },
    repoAuthor: {
          fontSize: 12,
          color: '#999',
      },
    rigthAlign:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end' ,
        width: 20,
    },
    delete:{
        height: 20,
        maxWidth: 20,
        flex:1,
        alignItems: 'center',
        backgroundColor:'#FF4D58',
    },
    deleteText:{
        color:'#fff',
    },
})
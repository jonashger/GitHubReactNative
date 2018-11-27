import React from 'react';
import { StyleSheet, Text, View,ScrollView,AsyncStorage, TouchableOpacity,ToastAndroid } from 'react-native';

import Repo from './components/Repo';
import Loader from './components/Loader';
import NewRepoModal from './components/NewRepoModal';
import Sobre from './components/Sobre';
import translate from './locales';
import I18n from 'react-native-i18n'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      dadosRepoVisible: false,
      aboutVisible: false,
      repos: [],
      loading: false,
      locale: 'pt-BR'
    };
   }

  async componentDidMount(){
    const repos = JSON.parse(await AsyncStorage.getItem('@AppGitGub:repos')) || [];

    this.setState({repos});
  }

  /**
   * Remove o repositório do localstorage.
   */
  removeRepo = async( repo )=>{
    let index = this.state.repos.indexOf(repo)
    let repos = this.state.repos

    repos.splice(index,1)

    this.setState({
      modalVisible: false,
      aboutVisible: false,
      dadosRepoVisible: false,
      repos,
    });
    
    await AsyncStorage.setItem('@AppGitGub:repos', JSON.stringify(this.state.repos));
  }
  componentWillUnmount(){
    this.setState({...this.setState, modalVisible: false,
      aboutVisible: false,
      dadosRepoVisible: false,
    })
   }
  /**
   * Chamada a API do github para buscar as informações do repositório e depois armazena-los no local storage.
   */
  addRepository = async (newRepoText) => {
    this.setState({
      loading: true,
    })
    const repoCall = await fetch(`https://api.github.com/users/${newRepoText}/repos`);
    const response = await repoCall.json();

    if (response !== null && response !== undefined && response.message === undefined){
        response.forEach(data => {
          const repository ={
            id: data.id,
            thumbnail: data.owner.avatar_url,
            title: data.name,
            author: data.owner.login,
            repoText: data.full_name,
            watchers: data.watchers,
            forks: data.forks,
            language: data.language,
            stars: data.stargazers_count,
            description: data.description,
          };   
          this.setState({
            modalVisible: false,
            aboutVisible: false,
            dadosRepoVisible: false,
            repos:[
              ...this.state.repos, 
              repository
            ],
          });
        });
        
        await AsyncStorage.setItem('@AppGitGub:repos', JSON.stringify(this.state.repos));
    }else{
      ToastAndroid.show(translate('RepoNotFound') , ToastAndroid.SHORT);
    }
    this.setState({
      loading: false,
    })
  };

  handleLocale(locale) {
    I18n.locale = locale;

    this.setState({
      locale
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Github App</Text>
          <TouchableOpacity onPress={() => this.setState({ aboutVisible: true})}>
            <Text  >?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleLocale('en')}>
            <Text style={(I18n.locale === 'en') ? styles.i18nSelected : styles.i18nUnselected }>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleLocale('pt-BR')}>
            <Text style={(I18n.locale === 'pt-BR') ? styles.i18nSelected : styles.i18nUnselected}>BR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.setState({ modalVisible: true})}>
            <Text style={styles.headerButton}>+</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.repoList}>
          {this.state.repos.map( repo => 
            <Repo 
              key={repo.id} 
              data={repo} 
              onRemove={this.removeRepo}
            />
          )}
        </ScrollView>
        <NewRepoModal 
          onCancel={() => this.setState({ modalVisible: false})}
          onAdd={this.addRepository}
          visible={this.state.modalVisible}
        />
        <Loader loading={this.state.loading} />
        <Sobre 
        onCancel={() => this.setState({ aboutVisible: false})}
        visible={this.state.aboutVisible} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    height: 70,
    paddingTop:20,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  headerText:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerButton:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  repoList:{
    padding: 20,
  },
  i18nSelected: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  i18nUnselected: {
    fontSize: 16
  }

});

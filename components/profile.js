import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = { 
      uid: '',
      isLoading: false,
    }

    //this.addNewTodo = this.addNewTodo.bind(this);
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        console.log('yes');
        //console.log(user)
      }
      else{
        console.log('no')
      }
    })
  }

  addNewTodo = () => {

    this.state({isLoading: true})
    console.log('lokmkd');
    //this.setState({ isLoading:false})
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {

    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    
    return (
      <View style={styles.container}>

          <Text style = {styles.textStyle}>
            Hello, {this.state.displayName}
          </Text>

        <View style= {styles.buttonContainer,{paddingRight:10}}>
          <TouchableOpacity 
              style= {styles.buttonContainer}
              onPress ={()=>{this.signOut()}}
              >
              <Text 
                style ={styles.editText}
                
              >
                Edit Profile
              </Text>

          </TouchableOpacity>
        </View>

        <View style= {styles.buttonContainer,{paddingRight:10}}>
          <TouchableOpacity 
              style= {styles.buttonContainer}
              onPress ={()=>{this.signOut()}}
              >
              <Text 
                style ={styles.logoutText}
                
              >
                Logout
              </Text>

          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  },
  buttonContainer: {
    //margin: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    width: 150
  },
  multiButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, 
  buttonText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
    fontSize: 15
  },
  logoutText: {
    color: 'red',
    marginTop: 25,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold"
  },
  editText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold"
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

///////////////////////////////////////////////////


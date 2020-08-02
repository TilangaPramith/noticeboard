import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import AsyncStorage from '@react-native-community/async-storage'

import Constants from "expo-constants";
//import * as Notifications from 'expo-notifications';
import {Notifications} from "expo";
import {Permissions} from "expo";
//import * as Permissions from 'expo-permissions';

export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      expoPushToken: "",
      isLoading: false
    }
  }

  

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      console.log("Login")
      console.log(user)
      if(user){
        console.log('wwwwwwwwwwwwwwwwwwwwww')
        console.log(user);
        this.props.navigation.navigate("Dashboard");
      }
      else{
        console.log("already logged");
      }
    })
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerForPushNotificationAsync = async(user) => {
    console.log('come');
    console.log('USER  ',user.uid)
    console.log('USER  ',user.email);

    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      console.log('xaxvc')
      
      // let token;
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      var updates = {}
      console.log('tttttttt');
      console.log("TOKEN ",token);
      updates['/expoToken'] = token;
      firebase.database().ref("/users").child(user.uid).update(updates)
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

  }

  userLogin = () => {
    console.log("oooooooooooooooooooooooooooooooooooooooo")
    console.log('usrr ',this.state.email);
    console.log(this.state.email);

    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res.user.uid)
        console.log('User logged-in successfully!');
        this.registerForPushNotificationAsync(res.user);
        
        // localStorage.setItem('key', this.state.email);
        // console.log(localStorage.getItem('key'));
        
        console.log('xxxxxxxxxxxxxxx');

        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        });

        if(res.user){
          Alert.alert(
            "Login Successful"

          )
          this.props.navigation.navigate('Dashboard')
        }
        else{
          Alert.alert(
            "Login Failed"
          )
          this.props.navigation.navigate('Login')
        }

        
      }).
      then((user) => {})
      .catch(error => {this.setState({ errorMessage: error.message })
        console.log("failed");
        Alert.alert(
          "Login Failed"
        )
        this.props.navigation.navigate('Signup')
    
      })
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Signin"
          onPress={() => this.userLogin()}
        />   

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
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
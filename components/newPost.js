import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';


export default class NewPost extends Component {
  
  constructor() {
    super();
    this.state = { 
      title: "",
      content: "",
      email : "",
      isLoading: false
    }

    //this.setMail = this.setMail.bind(this)
  }

  componentDidMount(){
    
    firebase.auth().onAuthStateChanged( (user) => {
      console.log('eeee')
      console.log(user);
      this.setState({
        email: user.email
      })
       if(user){

        console.log('yes',);
        console.log(user);
      }
      else{
        console.log('no')
        this.props.navigation.navigate('Login')
      }
    })

    // console.log('user mail refer');
    // console.log(this.state.email);
    // console.log('yes');
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
    console.log(this.state.title)
    console.log(this.state.content)
  }

  cancelPost = () => {
    Alert.alert(
      'Are you sure',
      'Make your choice',
      [
        
        {text: 'Cancel', onPress: () => {},  style: 'cancel'},
        {text: 'Ok', onPress: () => {this.props.navigation.navigate('Dashboard')}},
      ]
  )  
    this.setState({title: ''})
    this.setState({content: ''})
    this.setState({email: ''})
  }

  makePost = () => {
    var mail = "";
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        mail = user.email;
      }
    })
    console.log('usrr ');
    console.log(this.state.email);
    console.log(this.state.title);
    if(this.state.title == "" || this.state.content == ""){
      Alert.alert("cannot post empty content and title");
    }
    else{
      let title = this.state.title;
      let content = this.state.content
      let email = this.state.email
      firebase.database().ref('/blogs').push({title, content, email})
      .then(() => {
        console.log("inserted")
        this.setState({title: ''})
        this.setState({content: ''})
        this.setState({email: ''})
        Alert.alert(
          'Posted',
          'created',
          [
            {text: 'Ok', onPress: () => {this.props.navigation.navigate('NewPost')}}
          ]
        )
        
      })
      .catch((error)=>{
        Alert.alert(
          "Posting failed"
        )
        console.log('error ',error);
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
        <Text style={{fontSize:20, fontWeight:"bold"}}>Post</Text> 
        <TextInput
          //style={styles.inputStyle}
          style ={{marginTop:20, height: 40, borderColor:"gray", borderWidth:1, elevation:2, borderRadius:2}}
          placeholder="       title"
          value={this.state.title}
          multiline={true}
          maxim
          onChangeText={(val) => this.updateInputVal(val, 'title')}
        />
        <TextInput
          //style={styles.inputStyle}
          style ={{marginTop:20, height: 90, borderColor:"gray", borderWidth:1, elevation:2, borderRadius:4}}
          placeholder="       content"
          value={this.state.content}
          multiline={true}
          maxim
          onChangeText={(val) => this.updateInputVal(val, 'content')}
        />

        <View style={styles.buttonContainer} >
          <Button
            color="#3740FE"
            title="Submit"
            onPress={() => this.makePost()}
          /> 
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#3740FE"
            title="cancel"
            onPress={() => this.cancelPost()}
          />   
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   padding: 35,
  //   backgroundColor: '#fff'
  // },
  container: {
    flex: 1, 
    justifyContent: "center",
    padding: 30,
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
  },
  buttonContainer: {
    margin: 10,
    backgroundColor: 'white',
    padding: 20,
    //marginHorizontal: 20,
    width: "100%"
  },
});
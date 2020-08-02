import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

export default class Edit extends Component {
  
  constructor() {
    super();
    this.state = { 
      isLoading: false,
      title:"",
      content: "",
     
    }

    //this.setMail = this.setMail.bind(this)
  }
  
  componentDidMount(){
    const { key1, title1, content1, email1 } = this.props.route.params;
    console.log("key generate")
    console.log(this.props.route.params.key1)
    console.log(key1)
    this.setState({
        title: title1,
        content: content1,
        email:email1
    })
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
  }

  editPost = () => {
    
    console.log(this.state.title);
    console.log(this.state.content);
    if(this.state.title == "" || this.state.content == "" ){
      Alert.alert("cannot post empty content and title");
    }
    else{
      let title = this.state.title;
      let content = this.state.content;
      let email = this.state.email;
      const { key1, title1, content1, email1 } = this.props.route.params;
      firebase.database().ref('/blogs').child(key1).update({title,content,email})
      .then(() => {
        console.log("inserted")
        this.setState({title: ''})
        this.setState({content: ''})
        Alert.alert(
          'Successful',
          'Updated',
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
          style ={{marginTop:20, height: 40, borderColor:"gray", borderWidth:1, elevation:2, borderRadius: 2}}
          placeholder="title"
          value={this.state.title}
          multiline={true}
          maxim
          onChangeText={(val) => this.updateInputVal(val, 'title')}
        />
        <TextInput
          //style={styles.inputStyle}
          style ={{marginTop:20, height: 90, borderColor:"gray", borderWidth:1, elevation:2, borderRadius:4}}
          placeholder="content"
          value={this.state.content}
          multiline={true}
          maxim
          onChangeText={(val) => this.updateInputVal(val, 'content')}
        />

        <View style={styles.buttonContainer} >
          <Button
            color="#3740FE"
            title="Submit"
            onPress={() => this.editPost()}
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

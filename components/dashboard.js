import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity,TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';
import Icon from "react-native-vector-icons/FontAwesome";
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage'

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { 
      uid: '',
      displayName: "",
      posts: [],
      email:"",
      isLoading: false,
      log: "",
    }

    //this.getEdit = this.getEdit.bind(this);
  }

  

  componentDidMount(){
    //console.log(localStorage.getItem('key'));
        
        console.log('xxxxxxxxxxxxxxxyyyyyyyyyyyyyyy');
    
    firebase.auth().onAuthStateChanged((user)=>{
      if(user.email || user.displayName){
        this.setState({
          email: user.email,
          displayName: user.displayName,
        })
      }
      console.log('pppppppppppppppppppppppppppppppppppppppppppp')
      
     
    })
    //get posts from db code
    firebase.database().ref('/blogs').on('value', (data) => {
      
      const listPost = _.map(data.val(), (val, key) => {
        const postData = val;
        return {
          val,
          key: key
        }
      });

      const listKey = _.map(data.val(), (val, key) => {
        const postData = val;
        return {
          key
          // key: key
        }
      });
       console.log('EMAIL EAMIL')
      console.log(listPost);

      var myArr = [];

      for(let i = listPost.length - 1; i>= 0; i--){

        myArr.push([listKey[i].key,listPost[i].val.title,listPost[i].val.content,listPost[i].val.email]);
      }

      this.setState({
        posts : myArr
      })
    })

  }

  getEdit(key,title,content,email){
    var mail = this.state.email;
    if(mail == email){
      this.props.navigation.navigate('Edit',{
        key1:key,
        title1: title,
        content1:content,
        
      }
      );
    }
    else{
      Alert.alert(
        "Failed",
        "This is not a your post",
      )
    }
    
  }

  delete(key,email){
    var mail = this.state.email;

    if(mail == email){
      firebase.database().ref(`/blogs/${key}`).remove();
    }
    else{
      Alert.alert(
        'Failed',
        'This is not a your post',
      )
    }
  }

  deletePost(key,title,content,email){
    
    Alert.alert(
      'Alert',
        'are you sure to delete this post',
        [
          {text: 'OK', onPress: () => {this.delete(key,email)},  style: 'cancel'}, 
          {text: 'cancel', onPress: () => {this.props.navigation.navigate('Dashboard')},  style: 'cancel'},            
        ]
    )
  }

  addNewPost = () => {
    this.props.navigation.navigate('NewPost')
  }

  myProfile = () => {
    this.props.navigation.navigate('Profile');
  }

  myPost = () => {
    this.props.navigation.navigate('MyPost')
  }

  signOut = () => {

    Alert.alert(
      'Alert',
        'Are you sure to Logout',
        [
          {text: 'OK', onPress: () => {
            firebase.auth().signOut().then(() => {
              this.setState({
                email: "",
                displayName: "",
              })
              
              
              this.props.navigation.navigate('Login')
            })
            .catch(error => this.setState({ errorMessage: error.message }))
          },  
          style: 'cancel'}, 
          {text: 'cancel', onPress: () => {this.props.navigation.navigate('Dashboard')},  style: 'cancel'},            

        ]
    )

    // firebase.auth().signOut().then(() => {
    //   this.props.navigation.navigate('Login')
    // })
    // .catch(error => this.setState({ errorMessage: error.message }))
  }  

  render() {
    console.log('posts   ssss', this.state.posts);

    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity>
        <Text style = {styles.textStyle, {fontWeight:"bold"}}>
            Hello, {this.state.displayName}  
        </Text>
        </TouchableOpacity>
        
        <View style= {styles.multiButtonContainer} >
          <TouchableOpacity 
              onPress ={()=>{this.addNewPost()}}
              >
              <Text 
                style ={styles.buttonText}
                
              >
                Create Post
              </Text>

          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 15, paddingBottom: 10,marginTop:10,backgroundColor:'#D358F7', width: '100%', elevation:8, borderRadius:15}}> 
          <Text style={{fontSize:30, fontWeight:"bold", width: '100%', }}>                Notices </Text>
        </View>
        <ScrollView>

        {this.state.posts.map((appoints, i) => (
          <View style={{width: '100%'}}  >
            <View style={{elevation:10, borderRadius:15, backgroundColor:"#575FCF", padding:20, marginBottom:15}}>
              <Text style={{fontSize:25,fontWeight: "bold", color:"#fff"}}>{appoints[1]}</Text>
              <Text style={{fontSize:18, lineHeight:30,color:"#fff"}} >{appoints[2]}</Text>
              <View style={{flexDirection: 'row', justifyContent:'flex-end', marginTop: 25}}>
                <TouchableHighlight onPress = {()  => {this.getEdit(this.state.posts[i][0],this.state.posts[i][1],this.state.posts[i][2], this.state.posts[i][3])}}>
                  <View style={{marginRight:15}} >
                    <Icon size={30} color="white" name="edit"/>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress = {()  => {this.deletePost(this.state.posts[i][0],this.state.posts[i][1],this.state.posts[i][2], this.state.posts[i][3])}}>
                  <View>
                    <Icon size={30} color="white" name="close"/>
                  </View>
                </TouchableHighlight>
                
              </View>
            </View>
            
            </View>
          ))}
          
        </ScrollView>
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
    //display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 5
  },
  buttonContainer: {
    //margin: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    width: 80
    },
  multiButtonContainer: {
    margin: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, 
  buttonText: {
    color: '#3740FE',
    marginTop: 5,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: "bold"
  },
  logoutText: {
    color: 'red',
    marginTop: 5,
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

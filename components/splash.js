// import React from 'react';
// import { StyleSheet, Text, View, Alert } from 'react-native';
// import { Actions } from 'react-native-router-flux';

// //import Fire from "../Fire";
// import firebase from '../Fire';

// import { Container, Content, Header, Form, Input, Item, Button, Label } from "native-base";

// export default class App extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = {
      
//       isLoading: false
//     }
//   }

//   onSignup(){
//     console.log('kkkk')
//     setTimeout({}, 3000);
//     this.props.navigation.navigate('Signup')
//   }
  
//   render() {
//     return (
//       <View style={styles.container} >
//           <Text style={{fontSize: 40, marginLeft: 80, marginBottom:70,}} >
//               The App
//           </Text>
//           {/* {()=>{this.setTimeout({}, 3000);this.props.navigation.navigate('Signup');}} */}
//             {this.onSignup()}
//       </View>
//     );
//   }
  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     padding: 10,
//   },
// });



import React from 'react';
import { View, Text } from 'react-native';

class SplashScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
            // param: this.props.navigation.navigate('Signup')
        }
    }


  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        5000
      )
    )
  }

  onApp = () =>{
    console.log('ll')
    this.setState({
        isLoading: false
    })
    this.props.navigation.navigate('Signup');
    // this.state.param
  }

  async componentDidMount() {

    if(this.state.isLoading != true){
        this.props.navigation.navigate("Signup")
    }
    // Preload data from an external API
    // Preload data using AsyncStorage
    console.log('pp')
    const data = await this.performTimeConsumingTask();

    console.log(data);

    if (data !== null) {
        console.log('olo')
      //this.props.navigation.navigate('Signup');
      this.onApp();
    }
  }

  render() {
    return (
      <View style={styles.viewStyles}>
        <Text style={styles.textStyles}>
          The App
        </Text>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'orange'
    backgroundColor: '#3740FE',
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  }
}

export default SplashScreen;
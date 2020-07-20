import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Splash from './components/splash';
import Profile from './components/profile';
import NewPost from './components/newPost';
import MyPost from "./components/myPost";
import Edit from "./components/edit";



const Stack = createStackNavigator();



function MyStack() {

	// var isLoading = true;

	// if (isLoading) {
	// 	return <Splash />;
	// }

  return (
	
    <Stack.Navigator
	  initialRouteName="Signup"
	  screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      >
	    <Stack.Screen 
        name="Splash" 
        component={Splash} 
		    options={{ title: '' }}
      />	  
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }, {headerLeft: null}}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
		    options={{ title: 'Profile' }, {headerLeft: null}}
      />
      <Stack.Screen 
       name="NewPost" 
       component={NewPost} 
       options={
         { title: 'NewPost' },
         {headerLeft: null} 
       }
      //  initialParams={{ key: 42 , title: "", content: ""}}
      />
      <Stack.Screen 
       name="MyPost" 
       component={MyPost} 
       options={
         { title: 'MyPost' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
       name="Edit" 
       component={Edit} 
       options={
         { title: 'Edit' },
         {headerLeft: null} 
       }
      />
    </Stack.Navigator>
  );
}

export default class app extends React.Component{

	render() {

    // const state = createStore(reducers, {}, applyMiddleware(ReduxThunk))

		return (
     
        <NavigationContainer>
				<MyStack />
			</NavigationContainer>

			
    );
  
	}
}
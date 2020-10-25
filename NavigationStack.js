
import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, Button,  } from 'react-native';

import auth from '@react-native-firebase/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'


import AddNotes from './HomeScreen/AddNotes';
import NotesHome from './NotesScreen/NotesHome'
import NotesFocused from './NotesScreen/NotesFocused'

import HomeScreen from './HomeScreen/HomeScreen'

import TimerScreenFunc from './HomeScreen/TimerScreenFunc'
import SetTimer from './HomeScreen/SetTimer'
import AddSubject from './HomeScreen/AddSubject'

import SignUp from './LoginScreen/SignUp';
import Login from './LoginScreen/Login';

import IQScreen from './SettingsScreen/IQScreen';
import SettingsOptions from './SettingsScreen/SettingsOptions';
import PrivacyPolicy from './SettingsScreen/PrivacyPolicy';
import TermsOfService from './SettingsScreen/TermsOfService';
import ThemeSettings from './SettingsScreen/ThemeSettings';

import { UserDataContextWrapper } from './UserDataContext'
import { AuthContext } from './AuthContext'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const HomeIcon = (props) => (
  <Icon {...props} name='home-outline'/>
);

const BookIcon = (props) => (
  <Icon {...props} name='book-outline'/>
);


const ChartIcon = (props) => (
  <Icon {...props} name='bar-chart-2-outline'/>
);
//export const AuthContext = createContext(null)


const IQScreenWithContext = () => {
  return(
  <UserDataContextWrapper>
  <IQScreen/>
  </UserDataContextWrapper>
  )
}


const TimerScreenWithContext = (props) => {
  return(
  <UserDataContextWrapper>
  <TimerScreenFunc {...props}/>
  </UserDataContextWrapper>
  )
}


const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={HomeIcon}/>
    <BottomNavigationTab icon={BookIcon}/>
    <BottomNavigationTab icon={ChartIcon}/>
  </BottomNavigation>
);




function HomeStack() {
    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddNotes" component={AddNotes} />
        <Stack.Screen name="AddSubject" component={AddSubject} />
        <Stack.Screen name="SetTimer" component={SetTimer} />
        <Stack.Screen name="TimerScreen" component={TimerScreenWithContext} />
        </Stack.Navigator>
    );
  }

  function LoginStack() {
    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />

        </Stack.Navigator>
    );
  }



function NotesStack() {
    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="NotesHome" component={NotesHome} />
        <Stack.Screen name="NotesFocused" component={NotesFocused} />
        <Stack.Screen name="AddNotes" component={AddNotes} />
        </Stack.Navigator>
    );
  }

function SettingsStack() {
    return (

        <Stack.Navigator headerMode='none'>
    
        <Stack.Screen name="IQScreen" component={IQScreenWithContext} />

        <Stack.Screen name="SettingsOptions" component={SettingsOptions} />
        <Stack.Screen name="TermsOfService" component={TermsOfService} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="ThemeSettings" component={ThemeSettings} />
        </Stack.Navigator>
    );
  }

function App() {

const user = useContext(AuthContext)

  return user ? (     
     <NavigationContainer>
  
      <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="NotesHome" component={NotesStack} />
        <Tab.Screen name="SettingsStack" component={SettingsStack} />
      </Tab.Navigator>
  
    </NavigationContainer>
  ) : (

    <NavigationContainer>
    <LoginStack/>
    </NavigationContainer>
  )
 
}

export default App;
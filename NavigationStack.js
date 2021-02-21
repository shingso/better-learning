
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNavigation, BottomNavigationTab, Icon, useTheme, withStyles } from '@ui-kitten/components'

import HomeScreen from './HomeScreen/HomeScreen'
import AddNotes from './HomeScreen/AddNotes';

import Session from './HomeScreen/Session';

import NotesFocused from './NotesScreen/NotesFocused'
import RecalledNotes from './NotesScreen/RecalledNotes'
import DeleteFolder from './NotesScreen/DeleteFolder'
import GlobalNotes from './NotesScreen/GlobalNotes'
import NotesHome from './NotesScreen/NotesHome'

import GuidesHome from './GuidesScreen/GuidesHome'
import HowToLearn from './GuidesScreen/HowToLearn'
import HowOften from './GuidesScreen/HowOften'
import WhatIsLearning from './GuidesScreen/WhatIsLearning'
import Discouraged from './GuidesScreen/Discouraged'
import Inspiration from './GuidesScreen/Inspiration'
import LearningTips from './GuidesScreen/LearningTips'

import AddSubject from './HomeScreen/AddSubject'

import NotesRecall from './HomeScreen/NotesRecall'
import NotesRecallExplain from './HomeScreen/NotesRecallExplain'
import NotesRecallComplete from './HomeScreen/NotesRecallComplete'


import SignUp from './LoginScreen/SignUp';
import Login from './LoginScreen/Login';
import Welcome from './LoginScreen/Welcome';
import ForgotPassword from './LoginScreen/ForgotPassword';

import IQScreen from './SettingsScreen/IQScreen';
import PrivacyPolicy from './SettingsScreen/PrivacyPolicy';
import TermsOfService from './SettingsScreen/TermsOfService';
import ThemeSettings from './SettingsScreen/ThemeSettings';
import OpenSource from './SettingsScreen/OpenSource';
import TimerSettings from './SettingsScreen/TimerSettings';

import UserInfo from './UserInfoScreens/UserInfo';



import { UserDataContextWrapper } from './UserDataContext'
import { StudyStatsContextWrapper } from './StudyStats'
import { AuthContext } from './AuthContext'
import { SubjectsContextWrapper } from './SubjectsContext'
import { TimerSettingsContextWrapper } from './TimerSettingsContext'

import Onboard from './GuidesScreen/Onboard';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const HomeIcon = (props) => (
  <Icon {...props} name='home-outline'/>
);

const BookIcon = (props) => (
  <Icon {...props} name='book-outline'/>
);


const ChartIcon = (props) => (
  <Icon {...props} name='calendar-outline'/>
);

const UserIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);
//export const AuthContext = createContext(null)





const IQScreenWithContext = () => {
  return(
  <UserDataContextWrapper>
  <StudyStatsContextWrapper>
  <IQScreen/>
  </StudyStatsContextWrapper>
  </UserDataContextWrapper>
  )
}


const UserInfoWithContext = () => {
  return(
  <UserDataContextWrapper>
  <StudyStatsContextWrapper>
  <UserInfo/>
  </StudyStatsContextWrapper>
  </UserDataContextWrapper>
  )
}

const HomeScreenWithContex = () => {
  return(


  <UserDataContextWrapper>
  <StudyStatsContextWrapper>
  <HomeScreen/>
  </StudyStatsContextWrapper>
  </UserDataContextWrapper>

  )
}

const HomeScreenWithContext = withStyles(HomeScreenWithContex , (theme) => ({
  awesome: {
    backgroundColor: theme['color-primary-500'],
  },
}));




const SessionScreenWithContext = (props) => {
  return(

  <SubjectsContextWrapper>
  <UserDataContextWrapper>
  <Session {...props}/>
  </UserDataContextWrapper>
  </SubjectsContextWrapper>

  )
}


const AddNotesWithContext = (props) => {
  return(
  <SubjectsContextWrapper>
  <AddNotes {...props}/>
  </SubjectsContextWrapper>
  )
}

const NotesHomeWithContext = (props) => {
  return(
  <UserDataContextWrapper>
  <NotesHome {...props}/>
  </UserDataContextWrapper>
  )
}







function HomeStack() {
    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Home" component={HomeScreenWithContext} />
        <Stack.Screen name="Session" component={SessionScreenWithContext} />
        <Stack.Screen name="NotesRecall" component={NotesRecall} />
        <Stack.Screen name="NotesRecallExplain" component={NotesRecallExplain} />
        <Stack.Screen name="NotesRecallComplete" component={NotesRecallComplete} />
        <Stack.Screen name="AddNotes" component={AddNotesWithContext} />
        <Stack.Screen name="AddSubject" component={AddSubject} />
        <Stack.Screen name="NotesHome" component={NotesHomeWithContext} />
        <Stack.Screen name="NotesFocused" component={NotesFocused} />
        <Stack.Screen name="DeleteFolder" component={DeleteFolder} />
        <Stack.Screen name="RecalledNotes" component={RecalledNotes} />
        <Stack.Screen name="GlobalNotes" component={GlobalNotes} />

    
   
        </Stack.Navigator>
    );
  }

  function LoginStack() {
    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        </Stack.Navigator>
    );
  }


  function GuidesStack() {
    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="GuidesHome" component={GuidesHome} />
        <Stack.Screen name="HowToLearn" component={HowToLearn} />
        <Stack.Screen name="HowOften" component={HowOften} />
        <Stack.Screen name="WhatIsLearning" component={WhatIsLearning} />
        <Stack.Screen name="LearningTips" component={LearningTips} />
        <Stack.Screen name="Inspiration" component={Inspiration} />
        <Stack.Screen name="Discouraged" component={Discouraged} />
        </Stack.Navigator>
    );
  }




function UserStatsStack() {
    return (

        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="IQScreen" component={IQScreenWithContext} />
        </Stack.Navigator>
    );
  }


  function UserSettingsStack() {
    return (

        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="UserInfo" component={UserInfoWithContext} />
        <Stack.Screen name="OpenSource" component={OpenSource} />
        <Stack.Screen name="TermsOfService" component={TermsOfService} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="ThemeSettings" component={ThemeSettings} />
        <Stack.Screen name="TimerSettings" component={TimerSettings} />
        </Stack.Navigator>
    );
  }

function App() {

const theme = useTheme();
const authContext = useContext(AuthContext)

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance={'noIndicator'}
    style={{borderTopWidth:1, borderTopColor:theme['color-basic-300'], paddingBottom:Platform.OS == 'ios' ? 48: 0, paddingTop: Platform.OS == 'ios' ? 20: 0}}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>


    <BottomNavigationTab icon={HomeIcon}/>
    <BottomNavigationTab icon={ChartIcon}/>
    <BottomNavigationTab icon={BookIcon}/>
    <BottomNavigationTab icon={UserIcon}/>
  </BottomNavigation>
);


//authContext.newUser
  if(authContext.newUser){
 
    return (
    <NavigationContainer>
    <Onboard/>
    </NavigationContainer>)
  
  }


  return authContext.user ?    

   
     <NavigationContainer theme={{ colors: { background:theme['background-basic-color-2']}}}>
  
      <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name= "UserStatsStack" component={UserStatsStack} />
      <Tab.Screen name="GuidesStack" component={GuidesStack} />
      <Tab.Screen name="UserSettingsStack" component={UserSettingsStack} />
      </Tab.Navigator>
  
    </NavigationContainer>
    
    : 

    <NavigationContainer>
    <LoginStack/>
    </NavigationContainer>
  
 
}

export default App;
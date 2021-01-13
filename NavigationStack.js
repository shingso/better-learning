
import React, { useState, useEffect, createContext, useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNavigation, BottomNavigationTab, Icon, useTheme } from '@ui-kitten/components'

import HomeScreen from './HomeScreen/HomeScreen'
import AddNotes from './HomeScreen/AddNotes';
import Recall from './HomeScreen/Recall';

import NotesFocused from './NotesScreen/NotesFocused'
import RecalledNotes from './NotesScreen/RecalledNotes'

import GlobalNotes from './NotesScreen/GlobalNotes'
import NotesHome from './NotesScreen/NotesHome'

import GuidesHome from './GuidesScreen/GuidesHome'
import HowToLearn from './GuidesScreen/HowToLearn'
import HowOften from './GuidesScreen/HowOften'
import WhatIsLearning from './GuidesScreen/WhatIsLearning'
import Discouraged from './GuidesScreen/Discouraged'
import Inspiration from './GuidesScreen/Inspiration'
import LearningTips from './GuidesScreen/LearningTips'

import TimerScreenFunc from './HomeScreen/TimerScreenFunc'
import SetTimer from './HomeScreen/SetTimer'
import AddSubject from './HomeScreen/AddSubject'
import TipsPage from './HomeScreen/TipsPage'
import NotesRecall from './HomeScreen/NotesRecall'
import NotesRecallExplain from './HomeScreen/NotesRecallExplain'
import NotesRecallComplete from './HomeScreen/NotesRecallComplete'
import RecallExplain from './HomeScreen/RecallExplain'
import StudyFinished from './HomeScreen/StudyFinished'

import SignUp from './LoginScreen/SignUp';
import Login from './LoginScreen/Login';
import Welcome from './LoginScreen/Welcome';
import ForgotPassword from './LoginScreen/ForgotPassword';

import IQScreen from './SettingsScreen/IQScreen';
import SettingsOptions from './SettingsScreen/SettingsOptions';
import PrivacyPolicy from './SettingsScreen/PrivacyPolicy';
import TermsOfService from './SettingsScreen/TermsOfService';
import ThemeSettings from './SettingsScreen/ThemeSettings';
import OpenSource from './SettingsScreen/OpenSource';

import UserInfo from './UserInfoScreens/UserInfo';



import { UserDataContextWrapper } from './UserDataContext'
import { StudyStatsContextWrapper } from './StudyStats'
import { AuthContext } from './AuthContext'
import { SubjectsContextWrapper } from './SubjectsContext'

import Onboard from './GuidesScreen/Onboard';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const HomeIcon = (props) => (
  <Icon {...props} name='home'/>
);

const BookIcon = (props) => (
  <Icon {...props} name='book'/>
);


const ChartIcon = (props) => (
  <Icon {...props} name='calendar'/>
);

const UserIcon = (props) => (
  <Icon {...props} name='person'/>
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

const HomeScreenWithContext = () => {
  return(


  <UserDataContextWrapper>
  <StudyStatsContextWrapper>
  <HomeScreen/>
  </StudyStatsContextWrapper>
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


const AddNotesWithContext = (props) => {
  return(
  <SubjectsContextWrapper>
  <AddNotes {...props}/>
  </SubjectsContextWrapper>
  )
}


const RecallWithContext = (props) => {
  return(
  <SubjectsContextWrapper>
  <Recall {...props}/>
  </SubjectsContextWrapper>
  )
}



const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
  
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={HomeIcon}/>
    <BottomNavigationTab icon={ChartIcon}/>
    <BottomNavigationTab icon={BookIcon}/>
    <BottomNavigationTab icon={UserIcon}/>
  </BottomNavigation>
);





function HomeStack() {
    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Home" component={HomeScreenWithContext} />
        <Stack.Screen name="NotesRecall" component={NotesRecall} />
        <Stack.Screen name="NotesRecallExplain" component={NotesRecallExplain} />
        <Stack.Screen name="NotesRecallComplete" component={NotesRecallComplete} />
        <Stack.Screen name="RecallExplain" component={RecallExplain} />
        <Stack.Screen name="AddNotes" component={AddNotesWithContext} />
        <Stack.Screen name="Recall" component={RecallWithContext} />
        <Stack.Screen name="AddSubject" component={AddSubject} />
        <Stack.Screen name="SetTimer" component={SetTimer} />
        <Stack.Screen name="TimerScreen" component={TimerScreenWithContext} />
        <Stack.Screen name="TipsPage" component={TipsPage} />
        <Stack.Screen name="NotesFocused" component={NotesFocused} />
        <Stack.Screen name="RecalledNotes" component={RecalledNotes} />

        <Stack.Screen name="GlobalNotes" component={GlobalNotes} />
        <Stack.Screen name="StudyFinished" component={StudyFinished} />
        <Stack.Screen name="NotesHome" component={NotesHome} />
   
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
        <Stack.Screen name="SettingsOptions" component={SettingsOptions} />
        <Stack.Screen name="OpenSource" component={OpenSource} />
        <Stack.Screen name="TermsOfService" component={TermsOfService} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="ThemeSettings" component={ThemeSettings} />
        </Stack.Navigator>
    );
  }

function App() {

const theme = useTheme();
const authContext = useContext(AuthContext)
  //authContext.newUser)
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
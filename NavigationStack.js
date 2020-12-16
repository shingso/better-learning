
import React, { useState, useEffect, createContext, useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'

import HomeScreen from './HomeScreen/HomeScreen'
import AddNotes from './HomeScreen/AddNotes';
import Recall from './HomeScreen/Recall';
import Break from './HomeScreen/BreakScreen';

import NotesFocused from './NotesScreen/NotesFocused'

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


import SignUp from './LoginScreen/SignUp';
import Login from './LoginScreen/Login';
import Welcome from './LoginScreen/Welcome';

import IQScreen from './SettingsScreen/IQScreen';
import SettingsOptions from './SettingsScreen/SettingsOptions';
import PrivacyPolicy from './SettingsScreen/PrivacyPolicy';
import TermsOfService from './SettingsScreen/TermsOfService';
import ThemeSettings from './SettingsScreen/ThemeSettings';

import { UserDataContextWrapper } from './UserDataContext'
import { StudyStatsContextWrapper } from './StudyStats'
import { AuthContext } from './AuthContext'
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
  <Icon {...props} name='bar-chart-2'/>
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
    <BottomNavigationTab icon={ChartIcon}/>
    <BottomNavigationTab icon={BookIcon}/>
  </BottomNavigation>
);





function HomeStack() {
    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddNotes" component={AddNotes} />
        <Stack.Screen name="Recall" component={Recall} />
        <Stack.Screen name="Break" component={Break} />
        <Stack.Screen name="AddSubject" component={AddSubject} />
        <Stack.Screen name="SetTimer" component={SetTimer} />
        <Stack.Screen name="TimerScreen" component={TimerScreenWithContext} />
        <Stack.Screen name="TipsPage" component={TipsPage} />
        <Stack.Screen name="NotesFocused" component={NotesFocused} />
        </Stack.Navigator>
    );
  }

  function LoginStack() {
    return (
        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />

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
        <Stack.Screen name="Discouraged" component={Onboard} />
        


        <Stack.Screen name="SettingsOptions" component={SettingsOptions} />
        <Stack.Screen name="TermsOfService" component={TermsOfService} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="ThemeSettings" component={ThemeSettings} />
        </Stack.Navigator>
    );
  }




function SettingsStack() {
    return (

        <Stack.Navigator headerMode='none'>
        <Stack.Screen name="IQScreen" component={IQScreenWithContext} />
        </Stack.Navigator>
    );
  }

function App() {

const user = useContext(AuthContext)

  return user ? (     
     <NavigationContainer>
  
      <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="SettingsStack" component={SettingsStack} />
        <Tab.Screen name="GuidesStack" component={GuidesStack} />
      </Tab.Navigator>
  
    </NavigationContainer>
  ) : (

    <NavigationContainer>
    <LoginStack/>
    </NavigationContainer>
  )
 
}

export default App;
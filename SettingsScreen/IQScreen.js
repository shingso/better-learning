import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns'

import { UserDataContext } from '../UserDataContext'
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction , Tooltip} from '@ui-kitten/components';

const SettingsIcon = (props) => (
  <Icon {...props} name='settings-outline' />
);

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

function IQScreen(){
 

  const [visible, setVisible] = React.useState(false);
  const userData = useContext(UserDataContext)
  const navigation = useNavigation();

  const navigateSettings = () => {
      navigation.navigate('SettingsOptions');
  };
    
  const SettingsAction = () => (
      <TopNavigationAction icon={SettingsIcon} onPress={navigateSettings}/>
  );

  const renderToggleButton = () => (
    <Button appearance='ghost' accessoryRight={InfoIcon} onPress={() => setVisible(true)}>
    
    </Button>
  );


  return (
       

       

    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
    <TopNavigation style={{alignSelf:'flex-end'}}  alignment='center' accessoryRight={SettingsAction}/>
    <Tooltip
  
      anchor={renderToggleButton}
      visible={visible}
      accessoryLeft={InfoIcon}
      placement={'bottom end'}
      onBackdropPress={() => setVisible(false)}>

      What is IQ?
      IQ is just for fun!
      Everytime you finish a study session your IQ will go up by your current streak.
    </Tooltip>
    <Text>IQ</Text>
    <Text>{userData.IQ}</Text>
    <Text>Current Streak</Text>
    <Text>{userData.currentStreak}</Text>
    <Text>Highest Streak</Text>
    <Text>{userData.highestStreak}</Text>
   
    <View style={{flex:1 , justifyContent:'center', alignItems:'center'}}>

    </View>
  
       </View>
      
      
      );

    
    }

export default IQScreen

const styles = StyleSheet.create({
  contentContainer: {
  
  },
  container: {
 
  },
  
  item: {
    marginVertical:4
  },

});
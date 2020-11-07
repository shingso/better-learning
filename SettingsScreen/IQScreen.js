import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native'

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns'

import { UserDataContext } from '../UserDataContext'
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction , Tooltip} from '@ui-kitten/components';

const SettingsIcon = (props) => (
  <Icon {...props} width='25' height='25' name='settings-outline' />
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
    

  const renderToggleButton = () => (
    <Button appearance='ghost' accessoryRight={InfoIcon} onPress={() => setVisible(true)}>
    </Button>
  );


  return (
       

       

    <SafeAreaView style={{flex: 1, padding:16}}>
      
    <View style={{ flexDirection:'row' , justifyContent:'space-between'}}>
    <Text category='h1'>Progress</Text>
    <Button appearance='ghost' accessoryRight={SettingsIcon} onPress={navigateSettings}></Button>
    </View>
 

    <View style={{alignItems:'flex-end'}}>
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
    </View>
 
    <View>
    <Text category={'s1'}>IQ</Text>
    <Text>{userData.IQ}</Text>
    <Text category={'s1'}>Current Streak</Text>
    <Text>{userData.currentStreak}</Text>
    <Text category={'s1'}>Highest Streak</Text>
    <Text>{userData.highestStreak}</Text>
   
    </View>
    </SafeAreaView>
      
      
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
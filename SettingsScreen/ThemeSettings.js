import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, } from 'react-native';
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../themeContext';



const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);



function ThemeSettings(){

  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
 
 
  const navigateBack = () => {
    navigation.goBack();
  };
  
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <TopNavigation  alignment='center' accessoryLeft={BackAction}/>
    
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
    </Layout>
  </SafeAreaView>
  );
};

export default ThemeSettings

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:12
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 8,
  },
});
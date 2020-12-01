import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Card, List, Text, Button, Icon, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'



function signOut(){     
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}


    
const ListFooter = () => (
  <View  style={styles.item}>
  <TouchableOpacity onPress={()=>signOut()}>
  <Text category='s1'>Sign Out</Text>
  </TouchableOpacity>
      
  </View>
);

function SettingsOptions(){

 
const navigation = useNavigation();
  
  
const ListItem = ( props ) => (

  <TouchableOpacity onPress={()=>navigation.navigate(props.route)}>
    <View style={styles.item}>
    <Text>
    {props.title}
    </Text>
    </View>
    </TouchableOpacity>
);

  return (

    <SafeAreaView style={{margin:20}}>
    <TopHeader/>
    <Text category='h1' style={{marginBottom:12}}>Settings</Text>
    <ListItem title={'Theme'} route={'ThemeSettings'}/>
    <ListItem title={'Terms and Conditions'} route={'TermsOfService'}/>
    <ListItem title={'Privacy Policy'} route={'PrivacyPolicy'}/>
    <ListFooter/>
    </SafeAreaView>
  );
};

export default SettingsOptions

const styles = StyleSheet.create({
 
  item: {
    marginVertical: 20,
  },

});
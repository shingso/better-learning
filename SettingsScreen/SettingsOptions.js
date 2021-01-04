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
  <View style={styles.item}>
  <TouchableOpacity onPress={()=>signOut()}>
  <Text category='s1' style={{fontSize:15}}>Sign Out</Text>
  </TouchableOpacity>
      
  </View>
);

function SettingsOptions(){

 
const navigation = useNavigation();
  
  
const ListItem = ( props ) => (

  <TouchableOpacity onPress={()=>navigation.navigate(props.route)}>
  <View style={styles.item}>
  <Text category='p2' style={{fontSize:15}}>{props.title}</Text>
  </View>
  </TouchableOpacity>
);

  return (
    <Layout style={{flex:1}}>
    <SafeAreaView style={{margin:20}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <TopHeader/>
    <Text category='h6'>Settings</Text>
    </View>
    <ListItem title={'Theme'} route={'ThemeSettings'}/>
    <ListItem title={'Terms and Conditions'} route={'TermsOfService'}/>
    <ListItem title={'Privacy Policy'} route={'PrivacyPolicy'}/>
    <ListItem title={'Open Source'} route={'OpenSource'}/>
    <ListFooter/>
    </SafeAreaView>
    </Layout>
  );
};

export default SettingsOptions

const styles = StyleSheet.create({
 
  item: {
    marginVertical: 18,
  },

});
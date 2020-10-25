import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { Card, List, Text, Button, Icon } from '@ui-kitten/components';

const data = [{title:'Theme', route:'ThemeSettings'}, {title:'Terms and Conditions', route:'TermsOfService'}, {title:'Privacy Policy', route:'PrivacyPolicy'}]

function signOut(){     
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}


    
const renderListFooter = () => (
  <View>
      <Button style={{margin:16}} onPress={()=>signOut()}/>
  </View>
);



function SettingsOptions(){

 
  const navigation = useNavigation();


  

  const renderItem = (info) => (
    <TouchableOpacity onPress={()=>navigation.navigate(info.item.route)}>
    <View
      style={styles.item}
      status='basic'
      >
      <Text>
        {info.item.title}
      </Text>
    </View>
    </TouchableOpacity>
  );

  return (
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
      ListFooterComponent={renderListFooter}
      
    />
   
  );
};

export default SettingsOptions

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
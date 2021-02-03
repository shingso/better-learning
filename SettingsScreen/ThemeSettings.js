import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, } from 'react-native';
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../themeContext';
import TopHeader from '../UtilComponents/TopHeader'




function ThemeSettings(){

  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Layout style={{ flex: 1, paddingHorizontal:20, paddingTop:12 }}>
    <TopHeader title={'Theme Settings'}/>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text style={{textAlign:'center', marginBottom:32 }}>Toggle the theme of the application between dark and light mode</Text>

  <Text style={{textAlign:'center', marginBottom:32 }}>Current Theme: {themeContext.theme}</Text>
    <Button style={{ borderRadius:30, paddingHorizontal:20 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
    </View>
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
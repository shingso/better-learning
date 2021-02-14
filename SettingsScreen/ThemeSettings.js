import React, { useContext } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Image } from 'react-native';
import { Text, Button, Layout } from '@ui-kitten/components';
import { ThemeContext } from '../themeContext';
import TopHeader from '../UtilComponents/TopHeader'




function ThemeSettings(){

  const themeContext = useContext(ThemeContext);
  const width = Dimensions.get('screen').width

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Layout style={{ flex: 1, paddingHorizontal:20, paddingTop:12 }}>
    <TopHeader title={'Theme Settings'}/>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>

    <Image
          style={{
            width:width-64,
            height:200,
            
            resizeMode:'contain',
            marginBottom:96,
            marginTop:32
            
          }}
          source={require('../assets/images/themesettings.png')}
    />

   <Text style={{textAlign:'center'}} category='h1'><Text style={{textTransform:'capitalize', fontSize:36, fontWeight:'bold'}}>{themeContext.theme}</Text></Text>
   
   <View style={{flex:1, justifyContent:'flex-end', paddingBottom:64}}>
   <Text category='s2' style={{textAlign:'center', marginBottom:16 }}>Toggle the theme between dark and light mode</Text>
   <View style={{flexDirection:'row',}}>
   <Button style={{ borderRadius:30, paddingHorizontal:20, flex:1 }} onPress={themeContext.toggleTheme}>Toggle Theme</Button>
   </View>
   </View>


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
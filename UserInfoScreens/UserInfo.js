import React from 'react';
import { View, SafeAreaView, Dimensions, Image, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Button, Icon, Layout, useTheme } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import IOSShadowView from '../UtilComponents/IOSShadowView'



function signOut(){     
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}


function UserInfo(){

  

    const theme = useTheme()
    const navigation = useNavigation();


    const iconStyle={
    
      width:22,
      height:22
    

    }


    const ListComponent = (props)=>(
      <Card onPress={()=>navigation.navigate(props.path)} style={{marginTop:8, borderWidth:0, paddingVertical:2, borderRadius:12, elevation:1}}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <Icon {...iconStyle} fill={props.iconColor} name={props.iconName}/>
      <Text style={{marginLeft:16, color:props.iconColor}} category='s1'>{props.title}</Text>
      </View>
      </Card>
    )



    
    return (

    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView style={{flex: 1}}>
    <Layout level='2' style={{ flex:1, padding:16, paddingTop:20 }}>
    <IOSShadowView>

    {/* timesStudiedStat -- FOR THE ABOVE CARD (FORMATMINTUES) <ListComponent path={'ThemeSettings'} iconName={'droplet-outline'} title={'Theme Settings'}/> */}
    <ListComponent path={'LifetimeStats'} iconColor={theme['color-basic-800']} iconName={'person-outline'} title={'Your Stats'}/>
    <ListComponent path={'TimerSettings'} iconColor={theme['color-basic-800']} iconName={'bell-outline'} title={'Session Time'}/>
    <ListComponent path={'TermsOfService'} iconColor={theme['color-basic-800']} iconName={'file-text-outline'} title={'Terms And Conditions'}/>
    <ListComponent path={'PrivacyPolicy'} iconColor={theme['color-basic-800']} iconName={'lock-outline'} title={'Privacy Policy'}/>
    <ListComponent path={'OpenSource'} iconColor={theme['color-basic-800']} iconName={'book-open-outline'} title={'Open Source Libraries'}/>


    <Card onPress={()=>signOut()} style={{marginTop:8, borderWidth:0, paddingVertical:2, borderRadius:12, elevation:1}}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon fill={theme['color-danger-600']} width={18} height={18} name='log-out-outline'/>
    <Text style={{marginLeft:16, color:theme['color-danger-600']}} category='s1'>Sign Out</Text>
    </View>
    </Card>

    </IOSShadowView>
    </Layout>
    </SafeAreaView>
    </ScrollView>
      
    );

      //we need to update state when we add an item
    
    }




export default UserInfo


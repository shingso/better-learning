import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Image, Platform } from 'react-native';
import { Card, List, Text, Button, Layout, Select , IndexPath, SelectItem, Icon, useTheme} from '@ui-kitten/components';
import { TimerSettingsContext } from '../TimerSettingsContext';
import TopHeader from '../UtilComponents/TopHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyle from '../constants'
import IOSShadowView from '../UtilComponents/IOSShadowView'

const ClockIcon = (props) => (
  <Icon {...props} width={14} height={14} name='clock'/>
);

function TimerSettings(){

  const timerSettings = useContext(TimerSettingsContext);
  const theme = useTheme()

  
  const storeData = (value) => {
    try {
        AsyncStorage.setItem('@timeSettings', value);
        timerSettings.setTimeSettings(value)
        console.log(value)
    } catch (error) {
        console.log(error)
        }
    };

  
  const TimeSettingsComponent = (props) => {
    return(
    <Card style={{marginTop:8, borderWidth:0, borderRadius:12, elevation:1}} onPress={()=>storeData(props.value)}>
  
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon width={18} height={18} fill={timerSettings.timeSettings == props.value ? theme['color-primary-700']: theme['color-basic-500']} name='clock'/>
    <Text style={{
      marginLeft:12,
      marginTop: Platform.OS == 'ios' ? 2 : 4,
      fontFamily:timerSettings.timeSettings == props.value ? 'Poppins-Bold': 'Poppins-SemiBold',
      fontSize: timerSettings.timeSettings == props.value ? 18: 14,
      color:timerSettings.timeSettings == props.value ? theme['color-primary-700']: theme['color-basic-500']}}

    >
    {props.value} minutes</Text>
 
    </View>

    </Card>
    )
  }



  return (
   
    <Layout level='2' style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1 }}>
    <TopHeader title={'Session Time'}/>
    <View style={{flex:1, paddingHorizontal:20, }}>
    <Text style={{marginBottom:4}} category='h6'>Select a time:</Text>
   {/*  <View style={{alignItems:'center', flex:1, justifyContent:'flex-end'}}>
    <Text style={{marginBottom:70}} category='h6'>Current session time</Text>
    <Text style={{fontSize:100, fontFamily:'Poppins-SemiBold',}}>{timerSettings.timeSettings}</Text> 
    <Text category='h6' style={{marginTop:-40}}>{'minutes'}</Text> 
    </View> */}
        <TimeSettingsComponent value={'0.1'}/>
    <TimeSettingsComponent value={'25'}/>
    <TimeSettingsComponent value={'30'}/>
    <TimeSettingsComponent value={'35'}/>
    <TimeSettingsComponent value={'40'}/>
    <TimeSettingsComponent value={'45'}/>
    <TimeSettingsComponent value={'50'}/>
    <TimeSettingsComponent value={'55'}/>
    <TimeSettingsComponent value={'60'}/>


 



    <View style={{flex:1, marginBottom:64, flexDirection:'row', alignItems:'flex-end'}}>
   {/*  <Button size='large' style={{marginTop:20, marginHorizontal:20,borderRadius:30, flex:1, ...GlobalStyle.ButtonShadow}} onPress={()=>storeData(data[selectedIndex.row].time)}>Change Session Time</Button> */}
    </View>

    </View>
    </SafeAreaView>
    </Layout>
  
  );
};

export default TimerSettings

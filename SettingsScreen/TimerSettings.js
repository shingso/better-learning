import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Image, Platform, ScrollView } from 'react-native';
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
      fontWeight:timerSettings.timeSettings == props.value ? '700': '500',
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
    <ScrollView style={{flex:1}}>
    <View style={{flex:1, paddingHorizontal:20, paddingBottom:100}}>
    <Text style={{marginVertical:12, textAlign:'center'}} category='h6'>Select a session time</Text>
    <TimeSettingsComponent value={'25'}/>
    <TimeSettingsComponent value={'30'}/>
    <TimeSettingsComponent value={'35'}/>
    <TimeSettingsComponent value={'40'}/>
    <TimeSettingsComponent value={'45'}/>
    <TimeSettingsComponent value={'50'}/>
    <TimeSettingsComponent value={'55'}/>
    <TimeSettingsComponent value={'60'}/>
    </View>
    </ScrollView>
    </SafeAreaView>
    </Layout>
  
  
  );
};

export default TimerSettings

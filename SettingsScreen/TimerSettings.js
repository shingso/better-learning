import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Card, List, Text, Button, Layout, Select , IndexPath, SelectItem, Icon} from '@ui-kitten/components';
import { TimerSettingsContext } from '../TimerSettingsContext';
import TopHeader from '../UtilComponents/TopHeader'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClockIcon = (props) => (
  <Icon {...props} width={14} height={14} name='clock'/>
);

function TimerSettings(){

  const data = [
    {title: '25 minutes',time:'25'}, {title:'30 minutes',time:'30'}, {title:'35 minutes',time:'35'}, {title:'40 minutes',time:'40'}, 
    {title:'45 minutes',time:'45'}, {title:'50 minutes',time:'50'}, {title:'55 minutes',time:'55'}, {title:'60 minutes',time:'60'}
  ];
  
  const timerSettings = useContext(TimerSettingsContext);
  
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  
  const renderOption = (data) => (
    <SelectItem accessoryLeft={ClockIcon} key={data.title} title={data.title}/>
  );
  const displayValue = data[selectedIndex.row].title;
  
  const storeData = (value) => {
    try {
        AsyncStorage.setItem('@timeSettings', value);
        timerSettings.setTimeSettings(value)
        console.log(value)
    } catch (error) {
        console.log(error)
        }
    };



  return (
   
    <Layout style={{ flex: 1 }}>
    <SafeAreaView style={{ flex: 1 }}>
    <TopHeader title={'Session Timer Settings'}/>
    <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingHorizontal:20, paddingTop:40 }}>

    <View style={{alignItems:'center'}}>
    <Text style={{marginBottom:20}}>Current session timer is set for <Text style={{fontWeight:'bold'}}>{timerSettings.timeSettings} minutes</Text></Text>
    <Text style={{fontSize:70, fontFamily:'OpenSans-SemiBold'}}>{timerSettings.timeSettings}</Text> 
    <Text style={{marginBottom:40}} category='s1'>{'minutes'}</Text> 
    </View>
    
    
    <View style={{marginTop:40}}>
    <Text>Select a new session time</Text>
    <Select
        size={'large'}
        style={{width:300}}
        placeholder={timerSettings.timeSettings}
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {data.map(renderOption)}
    </Select>
    
    </View>


    <View style={{flex:1, marginBottom:64, flexDirection:'row', alignItems:'flex-end'}}>

    <Button size='large' style={{marginTop:20, marginHorizontal:20,borderRadius:30, flex:1}} onPress={()=>storeData(data[selectedIndex.row].time)}>Change Session Time</Button>

    </View>

    </View>
    </SafeAreaView>
    </Layout>
  
  );
};

export default TimerSettings

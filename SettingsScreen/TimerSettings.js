import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, } from 'react-native';
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
  
  const renderOption = (title) => (
    <SelectItem accessoryLeft={ClockIcon} title={title.title}/>
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
    <SafeAreaView style={{ flex: 1 }}>
    <Layout style={{ flex: 1, paddingHorizontal:20, paddingTop:12 }}>
    <TopHeader title={'Session Timer Settings'}/>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Text style={{marginBottom:12}}>Current study session time is set for <Text style={{fontWeight:'bold'}}>{timerSettings.timeSettings}</Text> minutes</Text>
    
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Select
        size={'large'}
        style={{flex:1}}
        placeholder={timerSettings.timeSettings}
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {data.map(renderOption)}
    </Select>
    <Button style={{marginLeft:8 }} onPress={()=>storeData(data[selectedIndex.row].time)}>C</Button>
    </View>

   
    </View>
    </Layout>
  </SafeAreaView>
  );
};

export default TimerSettings

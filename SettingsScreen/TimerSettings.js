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
    <SafeAreaView style={{ flex: 1 }}>
    <Layout style={{ flex: 1, paddingHorizontal:20, paddingTop:12 }}>
    <TopHeader title={'Session Timer Settings'}/>
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <Image
        style={{
          width:420,
          height:180,
          alignSelf:'center',
          resizeMode:'contain',
          marginBottom:48,
          marginTop:48
        }}
        source={require('../assets/images/timev2-01.png')}
      />
    <View style={{alignItems:'center'}}>
    <Text category='h1'>{timerSettings.timeSettings}</Text> 
    <Text style={{marginBottom:40}} category='s1'>{'minutes'}</Text> 
    </View>
    <Text style={{marginBottom:8}}>Current study session time is set for <Text style={{fontWeight:'bold'}}>{timerSettings.timeSettings}</Text> minutes</Text>
    
    <View style={{flex:1, justifyContent:'flex-end', marginBottom:64}}>
    <View style={{}}>
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
    <View style={{flexDirection:'row'}}>
    <Button style={{marginTop:20, borderRadius:30, flex:1}} onPress={()=>storeData(data[selectedIndex.row].time)}>Change Session Time</Button>
    </View>
    </View>

    </View>
    </Layout>
  </SafeAreaView>
  );
};

export default TimerSettings

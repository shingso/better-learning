import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, useTheme } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { ScrollView } from 'react-native-gesture-handler';
import { endOfMonth, format } from 'date-fns'
import { StudyStatsContext } from '../StudyStats'
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { UserDataContext } from '../UserDataContext'

const SettingsIcon = (props) => (
    <Icon {...props} width='25' height='25' name='settings-outline' />
);



function UserInfo(){

    const studyStatsData = useContext(StudyStatsContext)
    const userData = useContext(UserDataContext)
    const theme = useTheme()
    //const studyStatsData = useContext(StudyStatsContext)
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const navigation = useNavigation();

    const userStartDate = userData.timeStamp
    const allDateStats = studyStatsData.allDates  
    const timesStudiedStat = studyStatsData.timesStudied

    return (

    
    <Layout level='2' style={{ flex:1, padding:16 }}>
    <SafeAreaView style={{flex: 1}}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{marginBottom:12, flexDirection:'row', justifyContent:'space-between'}}>
    <Text category='h1'></Text>
    <Button size='small' appearance={'ghost'} accessoryRight={SettingsIcon} onPress={()=>navigation.navigate('SettingsOptions')}></Button>
    </View>

    <Card style={{marginBottom:16, paddingVertical:20}}>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
    <Text category={'s1'}>Started</Text>
    <Text>{format(new Date(userStartDate.toDate()), 'MMM d yyyy')}</Text>
    </View>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
    <Text category={'s1'}>Total Studied</Text>
    <Text>{timesStudiedStat}</Text>
    </View>
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
    <Text category={'s1'}>Times Studied this Month</Text>
    <Text>{timesStudiedStat}</Text>
    </View>
    </Card> 

   
    



    <Card style={{justifyContent:'center', paddingVertical:12, alignItems:'center', height:280}}>
 

  
    <CalendarHeatmap
    endDate={endOfMonth(new Date())}
    //the number of dates should be the number of days inbetween  between the starting date and end of the month or 90
    numDays={65}
    //need to pass in style prop to mon
    //Need to pass in our own color array 
    colorArray={[theme['background-basic-color-2'], theme['color-primary-100'], theme['color-primary-200'], theme['color-primary-300'], theme['color-primary-400'],theme['color-primary-500']]}
    values={allDateStats}
    monthLabelsStyle={{fontSize:12,fill:theme['text-basic-color']}}
    monthLabelsColor={theme['text-basic-color']}
    />
  
    </Card>
 
    
   
    
    </ScrollView>

    </SafeAreaView>
    </Layout>
      
    );

      //we need to update state when we add an item
    
    }


const styles = StyleSheet.create({

});

export default UserInfo

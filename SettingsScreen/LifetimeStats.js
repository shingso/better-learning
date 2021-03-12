import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, } from 'react-native';
import { Text, Layout, useTheme, Card, Icon } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { ScrollView } from 'react-native-gesture-handler';
import { StudyStatsContext } from '../StudyStats'
import { UserDataContext } from '../UserDataContext'
import {  format, formatDistance, differenceInCalendarDays } from 'date-fns'
import { sessionsToHours, formatMinutes2 } from '../helperFunctions';

function LifetimeStats(){

  const studyStatsData = useContext(StudyStatsContext)
  const userData = useContext(UserDataContext)
  const userStartDate = userData.timeStamp  
  const timesStudiedStat = studyStatsData.totalMinutesStudied
  const theme = useTheme()

  const headerStatStyle={
    color:theme['color-basic-700'],
    fontSize:12,
    fontFamily:'OpenSans-SemiBold',
    fontWeight:'800'
 }

 const iconStyleStats={
    fill:theme['color-primary-500'],
    width:25,
    height:25,
    marginBottom:12
  }


 const bodyStatsStyle={
   fontSize:26, 
   fontFamily:'OpenSans-Bold',
   fontWeight:'800',

 }


  const StatsComponent = (props)=>(

    <Card style={{marginBottom:8,borderWidth:0, borderRadius:12, flex:1, paddingBottom:8, paddingTop:4}}>
    
    <View style={{justifyContent:'space-between'}}>
    <View style={{}}>
    <Icon {...iconStyleStats}  name={props.iconName}/>
    <Text style={{...headerStatStyle}}>{props.headerText}</Text>
    </View>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={{...bodyStatsStyle}}>{props.bodyText}</Text>
    </View>
    <Text>{props.subText}</Text> 
    </View>
    </Card> 
 )




const returnPercentageStudied = ()=>{
 
    var result = differenceInCalendarDays(
        new Date(),
        userStartDate.toDate(),
        
      )

      console.log(result)

  return <Text>{Math.trunc(studyStatsData.uniqueDates.size/result * 100) + '%' + ' of days studied'}</Text>

 }



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    
    
    <SafeAreaView style={{flex: 1}}>
    <TopHeader title={'Lifetime Statistics'}/>
    <Layout level='2' style={{flex: 1, paddingTop:12, paddingHorizontal:20, paddingBottom:60 }}>
    
    
    <StatsComponent 
    iconName={'flag-outline'} 
    bodyText={format(new Date(userStartDate.toDate()), 'MMMM d, yyyy')} 
    headerText={'Started'} 
    subText={'You started ' + formatDistance(
        userStartDate.toDate(),
        new Date(),
        { addSuffix: true }
      )}
    />
  
    <StatsComponent 
    iconName={'calendar-outline'} 
    bodyText={ <Text style={{...bodyStatsStyle}}>{studyStatsData.uniqueDates.size}</Text>} 
    headerText={'Days Studied'} 
    subText={returnPercentageStudied()}
    />
    <StatsComponent 
    iconName={'trending-up-outline'} 
    bodyText={<Text style={{...bodyStatsStyle}}>{studyStatsData.timesStudied}</Text>} 
    headerText={'Total Sessions'} 
    subText={'On days you studies, you on average ' + (studyStatsData.timesStudied/studyStatsData.uniqueDates.size).toFixed(1) + " sessions"}
    />
    

    <StatsComponent
    iconName={'clock-outline'} 
    bodyText={formatMinutes2(400)} 
    headerText={'Total Time Studied'} 
    //subText={"You started 25 days ago."}
    />




    </Layout>   
    </SafeAreaView>
    </ScrollView>  
  );
};

export default LifetimeStats

const styles = StyleSheet.create({

  bodyText: {
    marginBottom:12,
    marginHorizontal:4,
    lineHeight:24
  },

});
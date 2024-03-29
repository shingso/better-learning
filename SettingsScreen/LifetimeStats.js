import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, } from 'react-native';
import { Text, Layout, useTheme, Card, Icon } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { ScrollView } from 'react-native-gesture-handler';
import { StudyStatsContext } from '../StudyStats'
import { UserDataContext } from '../UserDataContext'
import {  format, formatDistance, differenceInCalendarDays } from 'date-fns'
import { formatMinutes } from '../helperFunctions';

function LifetimeStats(){

  const studyStatsData = useContext(StudyStatsContext)
  const userData = useContext(UserDataContext)
  const userStartDate = userData.timeStamp  
  const timesStudiedStat = studyStatsData.totalMinutesStudied
  const theme = useTheme()

  const headerStatStyle={
    color:theme['color-basic-700'],
    fontSize:14,
    fontFamily:'Poppins-SemiBold',
    fontWeight:'600',

   
 }

 const iconStyleStats={
    fill:theme['color-basic-700'],
    width:15,
    height:15,
    marginTop:2,
    marginRight:8
 
  }


 const bodyStatsStyle={
   fontSize:22, 
   fontFamily:'Poppins-SemiBold',
   fontWeight:'600',

 }


  const StatsComponent = (props)=>(

    <Card style={{marginBottom:8,borderWidth:0, borderRadius:12, flex:1, elevation:1 }}>
    
    <View style={{}}>
    <View style={{ flexDirection:'row', marginBottom:4}}>
    <Icon {...iconStyleStats}  name={props.iconName}/>
    <Text style={{...headerStatStyle}}>{props.headerText}</Text>
    </View>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={{...bodyStatsStyle}}>{props.bodyText}</Text>
    </View>
    {props.subText && <Text style={{marginTop:0, fontSize:12, color:theme['color-basic-600']}}>{props.subText}</Text>}
    </View>
    </Card> 
 )




const returnPercentageStudied = ()=>{
 
    var result = differenceInCalendarDays(
        new Date(),
        userStartDate.toDate(),
        
      )

  return <Text style={{marginTop:8, fontSize:12, color:theme['color-basic-600']}}>{"You've studied " + Math.trunc(studyStatsData.uniqueDates.size/(result+1) * 100) + '%' + ' of days since you started.'}</Text>

 }



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    
    
    <SafeAreaView style={{flex: 1}}>
    <TopHeader title={'Your Stats'}/>
    <Layout level='2' style={{flex: 1, paddingTop:12, paddingHorizontal:20, paddingBottom:60 }}>
    
    <StatsComponent 
    iconName={'clock-outline'} 
    bodyText={formatMinutes(timesStudiedStat, theme['color-basic-800'], theme['color-basic-600'], 12, 26)} 
    headerText={'Total Time Studied'} 
    />

    
    <StatsComponent 
    iconName={'flag-outline'} 
    bodyText={format(new Date(userStartDate.toDate()), 'MMMM d, yyyy')} 
    headerText={'Started'} 
    subText={'You started ' + formatDistance(
        userStartDate.toDate(),
        new Date(),
        { addSuffix: true }
      ) + '.'}
    />
  
    <StatsComponent 
    iconName={'calendar-outline'} 
    bodyText={ <Text style={{...bodyStatsStyle}}>{studyStatsData.uniqueDates.size}</Text>} 
    headerText={'Days studied'} 
    subText={returnPercentageStudied()}
    />
    <StatsComponent 
    iconName={'trending-up-outline'} 
    bodyText={<Text style={{...bodyStatsStyle}}>{studyStatsData.timesStudied}</Text>} 
    headerText={'Total sessions'} 
    subText={'You study an average of ' + (studyStatsData.timesStudied/studyStatsData.uniqueDates.size).toFixed(1) + " sessions on days you study."}
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
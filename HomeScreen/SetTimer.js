import React, { useState, useEffect } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet} from 'react-native'
import { Button, Icon,  Card, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'

const Header = (props) => (
    <View {...props}>
      <Text category='s1'>{props.title}</Text>

    </View>
  );


  const ClockIcon = (props) => (
    <Icon {...props} width={30} height={30} name='clock-outline' />
  );


function SetTimer({ route }){
 
    const [mode, setMode] = React.useState('BASIC');
    const navigation = useNavigation();
    const { id } = route.params
 
    const Footer = (props) => (

    
      <View {...props} style={[props.style, styles.footerContainer]}>
        <ClockIcon/>
        <Button
          onPress={()=>navigation.navigate("TimerScreen", { mode: props.mode, subjectID: id })}
          style={styles.footerControl}
          size='small'>
        
         {props.title}
        </Button>
      </View>
    );

    return (
       
        //onPress={()=>navigation.navigate("TimerScreen",{mode:"ADVANCED"},

        <SafeAreaView style={{flex: 1, padding:16}}>
        <TopHeader/>
        <Text style={{marginBottom:20}}  category='h1'>Choose a study session</Text>    

        <Text style={{marginBottom:12}} category='h2'>{mode == 'BASIC' ? 'Learner' : 'Advanced'}</Text>  
        <Text>
  
        {mode == 'BASIC' ? 'Start building good study habits by studying for 25 mintues' : 'A longer study session for people with established study habits'}
        </Text>
        
      <View style={{ flex:1, marginBottom:36 , justifyContent:'flex-end'}}>
      <Button style={{marginBottom:30}} onPress={()=>navigation.navigate("TimerScreen", { mode:mode, subjectID: id })}>
      START
    </Button>

    <View style={{ flexDirection:'row' }}>
      <Button style={styles.button} appearance={mode == 'BASIC' ? 'outline' : 'ghost'} onPress={()=>setMode('BASIC')}>
      STARTER
    </Button>

    <Button style={styles.button} appearance={mode == 'ADVANCED' ? 'outline' : 'ghost'} onPress={()=>setMode('ADVANCED')}>
      ADVANCED
    </Button>
    
    </View>
    </View>

      {/*   <Card style={styles.card} header={(props)=><Header {...props} title='Starter Study Session'/>} footer={(props)=><Footer {...props} title='START' mode='BASIC'/>}>
        <Text>
         A quick and simple 25 minute study session
        </Text>
        </Card>


        <Card style={styles.card} header={(props)=><Header {...props} title='Advanced Study Session'/>} footer={(props)=><Footer {...props} title='START' mode='ADVANCED'/>}>
        <Text>
        One hour study session. Two twenty five minute studys with a break inbetween.
        </Text>
        </Card> */}



      
      </SafeAreaView>
      
      
      );

      //we need to update state when we add an item
    
    }

export default SetTimer


const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
        marginBottom:20
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',

    },
    footerControl: {
      marginHorizontal: 2,
    },
  });
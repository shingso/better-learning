import React, { useState, useEffect } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet} from 'react-native'
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TopHeader from '../UtilComponents/TopHeader'

const Header = (props) => (
    <View {...props}>
      <Text category='h6'>{props.title}</Text>

    </View>
  );

  const BackIcon = (props) => (
    <Icon {...props} width={30} height={30} name='arrow-back' />
  );


function SetTimer({ route }){
 
  
    const navigation = useNavigation();
    const { id } = route.params
 
    const Footer = (props) => (

    
      <View {...props} style={[props.style, styles.footerContainer]}>
       
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

        <View style={{flex: 1, padding:16}}>
        <TopHeader/>
        <Text style={{marginBottom:8}}  category='h2'>Choose a study session</Text>    
        <Card style={styles.card} header={(props)=><Header {...props} title='Starter Study Session'/>} footer={(props)=><Footer {...props} title='START' mode='BASIC'/>}>
        <Text>
         A quick and simple 25 minute study session
        </Text>
        </Card>


        <Card style={styles.card} header={(props)=><Header {...props} title='Advanced Study Session'/>} footer={(props)=><Footer {...props} title='START' mode='ADVANCED'/>}>
        <Text>
        One hour study session. Two twenty five minute studys with a break inbetween.
        </Text>
        </Card>



      
      </View>
      
      
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
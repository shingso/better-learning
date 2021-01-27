import React from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { Text, useTheme } from '@ui-kitten/components';



function GuideComponent(props){
 
  
    const theme = useTheme()

    return (
       
        <View style={styles.container}>
        <Image
          style={{
           
            width:420,
            height:200,
            alignSelf:'center',
            resizeMode:'contain',
          }}
          source={props.picture}
        />
     
        <View style={{justifyContent:'flex-start', paddingTop:90, flex:2.5}}>
        <Text category='h6' style={styles.headerText}>{props.headerText}</Text>
        <Text style={[styles.bodyText, {color:theme['color-basic-700']}]} >{props.bodyText}</Text>
        </View>
    
        </View>
      
      );

    }

export default GuideComponent


const styles = StyleSheet.create({
  
    bodyText:{
      textAlign:'center', 
      lineHeight: 28,
      marginHorizontal:12,
      fontSize:15,
      letterSpacing:0.1
    },
  
    headerText:{
      marginBottom:24,
      textAlign:'center',
     
    },
  
    container: {
     
      paddingBottom:32,
      paddingHorizontal:20,
      paddingTop:80,
      alignItems:'center',
      flex:1,
      justifyContent:'center',
  
  
    },
  
  
  });
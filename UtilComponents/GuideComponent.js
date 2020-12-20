import React from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { Text } from '@ui-kitten/components';



function GuideComponent(props){
 
  
  

    return (
       
        <View style={styles.container}>
        <Image
          style={{
    
            flex:3,
            
            resizeMode:'contain'
          }}
          source={props.picture}
        />
     
        <View style={{justifyContent:'flex-start', paddingTop:40, flex:2.5}}>
        <Text category='h4' style={styles.headerText}>{props.headerText}</Text>
        <Text style={styles.bodyText} category='s1'>{props.bodyText}</Text>
        </View>
    
        </View>
      
      );

    }

export default GuideComponent


const styles = StyleSheet.create({
  
    bodyText:{
      textAlign:'center', 
      lineHeight: 24,
      fontSize:15, 
      marginHorizontal:4,
      marginBottom:60
    },
  
    headerText:{
      marginBottom:24,
      textAlign:'center',
      fontSize:24
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
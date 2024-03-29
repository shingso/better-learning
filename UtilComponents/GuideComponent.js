import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { Text, useTheme } from '@ui-kitten/components';




function GuideComponent(props){
 
  
    const theme = useTheme()
    const width = Dimensions.get('screen').width
    return (
       
        <View style={styles.container}>
        <Image
          style={{
            width:width-64,
            height:200,
            resizeMode:'contain',
       
            
          }}
          source={props.picture}
        />
     
        <View style={{justifyContent:'flex-start', paddingTop:52}}>
        <Text category='h6' style={styles.headerText}>{props.headerText}</Text>
        <Text style={[styles.bodyText, {color:theme['color-basic-700']}]}>{props.bodyText}</Text>
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
      marginBottom:20,
      textAlign:'center',
     
    },
  
    container: {
     
      paddingBottom:120,
      paddingHorizontal:20,
    
      alignItems:'center',
      flex:1,
      justifyContent:'center',
  
  
    },
  
  
  });
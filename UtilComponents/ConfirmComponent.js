import React from 'react';
import { View, StyleSheet, Image, Dimensions} from 'react-native'
import { Text, useTheme, Button  } from '@ui-kitten/components';




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
            alignSelf:'center'
          }}
          source={props.picture}
        />
     
   
        <Text category='h6' style={styles.bodyText}>{props.bodyText}</Text>
        
        <View style={{flexDirection:'row', alignItems:'flex-end', flex:1}}>
        <Button style={{flex:1, borderRadius:30}} size='large' onPress={props.onPress}>{props.buttonText}</Button>
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
  
 
    container: {
     
      paddingBottom:32,
      paddingHorizontal:20,
      paddingTop:80,
      flex:1,

  
  
    },
  
  
  });
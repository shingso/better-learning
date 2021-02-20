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
            width:width-96,
            height:200,
            resizeMode:'contain',
            alignSelf:'center',
            flex:2.5
          }}
          source={props.picture}
        />
     
        <View style={{flex:1}}>
        <Text style={styles.headerText}>{props.headerText}</Text>
        <Text style={{textAlign:'center', marginTop:24, marginHorizontal:16, lineHeight:24, letterSpacing:0.1}}>{props.bodyText}</Text>
        </View>

        <View style={{flexDirection:'row', alignItems:'flex-end', flex:1, paddingBottom:40}}>
        <Button style={{flex:1, borderRadius:30, marginBottom:32}} size='large' onPress={props.onPress}>{props.buttonText}</Button>
        </View>
  
    
        </View>
      
      );

    }

export default GuideComponent


const styles = StyleSheet.create({
  
    headerText:{
      textAlign:'center', 
  
      marginHorizontal:12,
      fontSize:22,
      fontFamily:'OpenSans-Bold',
      letterSpacing:0.1
    },
  
 
    container: {
     
      paddingBottom:32,
      paddingHorizontal:20,
  
      flex:1,

  
  
    },
  
  
  });
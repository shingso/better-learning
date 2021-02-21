import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native'
import { Card, List, Text, useTheme } from '@ui-kitten/components';



function SwiperButtons(){

    const theme = useTheme()
  
    return (
       

        <Text category='s1' style={[styles.nextButtonStyle, {color:theme['color-basic-100'],backgroundColor:theme['color-primary-default']}]}>Next</Text>
      
      );


    }

export default SwiperButtons

const styles = StyleSheet.create({
    nextButtonStyle:{
        marginBottom:28, 
        marginRight:28, 
        padding:14, 
        borderRadius:24, 
        overflow:'hidden',
        paddingHorizontal:26
        
      },

});
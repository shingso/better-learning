import React from 'react';
import { Text, useTheme } from '@ui-kitten/components';
import SwiperButtons from './SwiperButtons'
import Swiper from 'react-native-swiper'


function TimeStudiedSwiper(props){
 
  
    const theme = useTheme()
  
    return (
       
        
        <Swiper 
        style={{height:330}}
        activeDotColor={theme['color-primary-default']} 
 
        loop={false} 
        index={0}>
        {props.children}

        </Swiper>
       
      );

    }

export default TimeStudiedSwiper
import React from 'react';
import { Text, useTheme } from '@ui-kitten/components';
import SwiperButtons from './SwiperButtons'
import Swiper from 'react-native-swiper'


function GlobalSwiper(props){
 
  
    const theme = useTheme()
  
    return (
       
        
        <Swiper 
        showsButtons={true} 
        activeDotColor={theme['color-primary-default']} 
        activeDotStyle={{marginBottom:32}} 
        dotStyle={{marginBottom:32}} 
        prevButton={<Text></Text>} 
        nextButton={<SwiperButtons/>} 
        buttonWrapperStyle={{alignItems:'flex-end'}} 
        loop={false} 
        index={0}>
        {props.children}

        </Swiper>
       
      );

    }

export default GlobalSwiper




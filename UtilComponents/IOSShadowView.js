import React from 'react';
import { View } from 'react-native'




function IOSShadowView(props){

  
    return (
       

        <View // Parent
        style={{
          flex: 1,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.1,
          shadowRadius: 4
        }}
         >
        {props.children}
          </View>
      
      );


    }

export default IOSShadowView


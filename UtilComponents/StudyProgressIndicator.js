import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native'
import { Card, List, Text, useTheme, Icon } from '@ui-kitten/components';
import StepIndicator from 'react-native-step-indicator';


function StudyProgressIndicator(props){

    const theme = useTheme()

    const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
    
        const iconConfig = {
          name: null,
          fill: stepStatus === 'finished' ? theme['color-primary-600'] : theme['color-basic-500'],
          width:20,
          height:20
        };
    
    
        switch (position) {
          case 0: {
    
              iconConfig.name = 'navigation-2-outline';
              iconConfig.height = 20
              iconConfig.width = 20
              if(stepStatus === 'current'){
                iconConfig.fill = theme['color-primary-700'] 
              }
            
            break;
    
          }
    
          case 1: {
    
              iconConfig.name = 'clock-outline',
              iconConfig.height = 20
              iconConfig.width = 20
              if(stepStatus === 'current'){
                iconConfig.fill = theme['color-primary-700'] 
              }
            
            break;
    
          }

          case 2: {
    
           
            iconConfig.name = 'bulb-outline';
            iconConfig.height = 20
            iconConfig.width = 20
            if(stepStatus === 'current'){
                iconConfig.fill = theme['color-primary-700'] 
              }
          
          break;
  
      
        }

          case 3: {
    
           
            iconConfig.name = 'edit-outline';
            iconConfig.height = 20
            iconConfig.width = 20
            if(stepStatus === 'current'){
                iconConfig.fill = theme['color-primary-700'] 
              }
          
          break;
  
      
        }

        case 4: {
    
           
            iconConfig.name = 'flag-outline';
            iconConfig.height = 20
            iconConfig.width = 20
            if(stepStatus === 'current'){
                iconConfig.fill = theme['color-primary-700'] 
              }
          
          break;
  
      
        }

    
          default: {
            break;
          }
        }
        return iconConfig;
      };
    
    
      const renderStepIndicator = (params) => (
        
        <Icon {...getStepIndicatorIconConfig(params)}/>
      );

    const customStyles = {
    
        stepIndicatorSize: 40,
        currentStepIndicatorSize:40,
        separatorStrokeWidth:40,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: theme['color-primary-200'],
        stepStrokeWidth: 1.5,
        stepStrokeFinishedColor: theme['color-primary-200'],
        stepStrokeUnFinishedColor: theme['color-basic-400'],
        separatorFinishedColor: theme['color-primary-200'],
        separatorUnFinishedColor: theme['color-basic-400'],
        stepIndicatorFinishedColor: theme['color-primary-200'],
        stepIndicatorUnFinishedColor:  theme['color-basic-400'],
        stepIndicatorCurrentColor: theme['color-primary-200'],
    
        labelColor: theme['color-basic-600'],
        labelSize: 9,
        currentStepLabelColor: theme['color-primary-700'],
        
      }
  
    return (
       
        
        <View style={{alignSelf:'center',width:400, marginTop:32,justifyContent:'center'}}>
        <StepIndicator
         customStyles={customStyles}
         currentPosition={props.currentStep != null ? props.currentStep : 0}
         stepCount={5}
         position={1}
         renderStepIndicator={renderStepIndicator}
         //labels={returnLabels(0)}
         

        />
       </View>
      );


    }

export default StudyProgressIndicator


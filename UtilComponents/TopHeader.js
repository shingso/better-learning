import React from 'react';
import { View, StyleSheet, Platform} from 'react-native'
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';

      

function TopHeader(props){
 
  
    const navigation = useNavigation();

    const navigateBack = () => {
      navigation.goBack();
    };

    const popToTop = () => {
      navigation.dispatch(StackActions.popToTop());
    };
    
    const BackIcon = (props) => (
      <Icon {...props} name={Platform.OS == 'ios' ? 'arrow-ios-back-outline' : 'arrow-back-outline'}/>
    );
    
    const BackAction = () => (
      <TopNavigationAction onPress={props.func == 'top' ? popToTop : navigateBack} icon={BackIcon}/>
    );

    return (
      <TopNavigation style={{minHeight:60, backgroundColor:null}} accessoryLeft={BackAction} title={props.title} accessoryRight={props.rightAccessory}/>
      );

    }




export default TopHeader



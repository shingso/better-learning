import React from 'react';
import { View, StyleSheet, Platform, Dimensions} from 'react-native'
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';

      // style={{flexShrink:1, width:width-160}}

function TopHeader(props){
 
  
    const navigation = useNavigation();
    const width = Dimensions.get('screen').width
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

    const renderTitle = () =>(

    <Text category='s1' numberOfLines={1} style={{width:width-160}}>{props.title}</Text>

    )
    return (
     
      <TopNavigation style={{minHeight:60, backgroundColor:null}} accessoryLeft={BackAction} title={renderTitle} accessoryRight={props.rightAccessory}/>
     
      );

    }




export default TopHeader



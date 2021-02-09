import React from 'react';
import { View, StyleSheet} from 'react-native'
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';



const BackIcon = (props) => (
    <Icon {...props} fill='black' width={30} height={30} name='arrow-back' />
  );


function TopHeader(props){
 
  
    const navigation = useNavigation();

    const navigateBack = () => {
      navigation.goBack();
    };

    const popToTop = () => {
      navigation.dispatch(StackActions.popToTop());
    };
    

    return (
       
      <View style={{alignSelf:'flex-start',marginLeft: -20, flexDirection:'row', alignItems:'center', flexShrink:1}}>
      <Button size='small' appearance='ghost' accessoryLeft={BackIcon} onPress={props.func == 'top' ? popToTop : navigateBack}></Button>
      {props.title != null && <Text numberOfLines={1}  style={{ fontSize:16, fontWeight:'bold', flexShrink:1}}>{props.title}</Text>}
      </View>
      
      );

    }

export default TopHeader



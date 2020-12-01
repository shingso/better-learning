import React from 'react';
import { View, StyleSheet} from 'react-native'
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text } from '@ui-kitten/components';
import { useNavigation, StackActions } from '@react-navigation/native';



const BackIcon = (props) => (
    <Icon {...props} width={30} height={30} name='arrow-back' />
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
       
      <View style={{alignSelf:'flex-start', marginLeft: -20}}>
      <Button size='small' appearance='ghost' accessoryLeft={BackIcon} onPress={props.func == 'top' ? popToTop : navigateBack}></Button>
      </View>
      
      );

    }

export default TopHeader


const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    card: {
        marginBottom:20
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    footerControl: {
      marginHorizontal: 2,
    },
  });
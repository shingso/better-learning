import React, { useState, useEffect } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet} from 'react-native'
import { Button, Icon , TopNavigation, TopNavigationAction, Modal, Card, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const BackIcon = (props) => (
    <Icon {...props} width={30} height={30} name='arrow-back' />
  );


function TopHeader(){
 
  
    const navigation = useNavigation();

    const navigateBack = () => {
      navigation.goBack();
    };
    
    const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={()=>navigateBack()}/>
      
    );
    


 
    return (
       
 
        <View style={{alignSelf:'flex-start', marginLeft:-20,}}>
         <Button size='small' appearance='ghost' accessoryLeft={BackIcon} onPress={() => navigateBack()}></Button>
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
import React, { useState, useEffect, useContext } from 'react'
import { TextInput, View, StyleSheet, ImageBackground } from 'react-native'

import { useNavigation, StackActions } from '@react-navigation/native';
import { Button, Text ,Icon, Input, Layout, Modal, Card } from '@ui-kitten/components';

import { AuthContext } from '../AuthContext'
import TopHeader from '../UtilComponents/TopHeader'
import ConfirmComponent from '../UtilComponents/ConfirmComponent'

import { deleteSubject } from '../helperFunctions';





function DeleteFolder({route}){
    const { folderID } = route.params
    const [ deletedConfirm, setDeletedConfirm ] = useState(false)
    const [ inputValue, setInputValue ] = React.useState();
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const navigation = useNavigation();

    const deleteSubjectFunction = ( userID, subjectID ) => {

        if(inputValue == 'Delete'){
          deleteSubject(userID, subjectID)
          setDeletedConfirm(true)
        } else {

        }

      }

      if(deletedConfirm){
        return(
        <Layout style={{ flex: 1, padding:16}}>
        <ConfirmComponent 
        picture={require('../assets/images/trash.png')}
        buttonText={'Go Back'}
        headerText={'Folder Deleted'}
        bodyText={'That folder is gone'}
        onPress={()=>navigation.dispatch(StackActions.popToTop())}
        />
        </Layout>
        )

      }
      
      return (
        <Layout style={{flex:1, paddingHorizontal:16, paddingTop:8}}>
        <TopHeader title={'Delete Folder'} />
        <Layout style={{flex:1, justifyContent:'center', alignItems:'center', padding:16}}>
        <Text style={{marginBottom:12}}>Type "Delete" to remove this folder</Text>
        <Input value={inputValue} onChangeText={setInputValue} />
        <View style={{flexDirection:'row', marginTop:20,marginBottom:8}}>
        
        <Button appearance='outline' style={{borderRadius:30}} onPress={()=>navigation.goBack()}>
        Go Back
        </Button>

        <Button status='danger' style={{marginLeft:12, borderRadius:30, paddingHorizontal:60}} onPress={()=> deleteSubjectFunction(userID, folderID)}>
        Delete
        </Button>
       
        </View>
        </Layout>
        </Layout>
      );
     
  
}


const styles = StyleSheet.create({
  
  

    backdrop:{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  
    contentContainer: {
      paddingTop:12,
      paddingBottom:80,
        
    },
  
    container:{
    
    },
  
    
    item: {
      paddingTop:8,
      paddingHorizontal:4,
      paddingBottom:40,
     
    },
  
  });


export default DeleteFolder

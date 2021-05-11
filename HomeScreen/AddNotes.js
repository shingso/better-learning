import React, { useContext } from 'react';
import { View , SafeAreaView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Formik } from 'formik';
import { addNote } from '../helperFunctions';
import { Button, Text ,Icon , Input, Layout, useTheme } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import * as Yup from 'yup';
import { SubjectsContext } from '../SubjectsContext';
import FolderSelectionComponent from '../UtilComponents/FolderSelectionComponent'
import GlobalStyle from '../constants'


const TextSchema = Yup.object().shape({
  text: Yup.string()
    .min(1, 'Too short')
    .max(200, 'Too Long')
    .required('Required'),
});



function AddNotes(){

  const theme = useTheme()
  const [visible, setVisible] = React.useState(false);
  const authContext = useContext(AuthContext)
  const navigation = useNavigation();
  const subjectsContext = useContext(SubjectsContext)

  return(

    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <Layout style={{flex:1}}>
    <SafeAreaView style={{ flex: 1}}>
    
    <TopHeader title={'Add Note'}/>
    <View style={{padding:16}}>
    
   
    <Formik
    initialValues={{ text:'', textTheme:'' }}
    validationSchema={TextSchema}
    onSubmit={(values) => {
    

     if(subjectsContext.lastUsedSubject != null){
      addNote( authContext.user.uid, subjectsContext.lastUsedSubject.id  , values.text, values.textTheme)
     } else {
      addNote( authContext.user.uid, '', values.text, values.textTheme)
     }
     Keyboard.dismiss()
     setVisible(true)

    }}
   >

    {formikProps => (

   <React.Fragment>
   <View>
   
   <View style={{marginLeft:20}}>
   <FolderSelectionComponent/> 
   </View>
   </View>

   <View style={{marginVertical:20}}>
   <Input
   textStyle={{fontSize:16, fontWeight:'bold'}}
   style={{marginBottom:4, marginTop:4, borderColor:theme['background-basic-color-1'], backgroundColor:theme['background-basic-color-1']}}
   placeholder={'Tag'}
   onChangeText={formikProps.handleChange('textTheme')}
    />


   <Input
    placeholder={'Write a new note'}
    style={{backgroundColor:theme['background-basic-color-1'], borderColor:theme['background-basic-color-1'], marginTop:12}}
    textAlignVertical={'top'}
    textStyle={{fontSize:15, height:120}}
    multiline={true}
    autoFocus={true}
    size={'large'}
    onChangeText={formikProps.handleChange('text')}
    />
  
   <Button size='large' style={{marginVertical:16, marginHorizontal:20, borderRadius:30, ...GlobalStyle.ButtonShadow}} disabled={!(formikProps.dirty && formikProps.isValid)} onPress={()=>formikProps.handleSubmit()}>Done</Button>
   </View>
    

    </React.Fragment>
    )}

  </Formik>


  <Modal
   visible={visible}
   transparent={true}

   >
  
  <Layout style={{justifyContent:'center', alignItems:'center', flex:1, backgroundColor:'rgba(0,0,0,0.5)'}}>
  
  <View style={styles.modalView}>
  <View style={{marginVertical:30}}>
  <Text category='s1' style={{textAlign:'center'}}>Note Added</Text>
  </View>
  <View style={{ borderTopWidth:0.5, borderTopColor:theme['color-basic-400'],height:50, marginHorizontal:-20, width:300, justifyContent:'center'}}>
  <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
  <TouchableOpacity  onPress={()=>navigation.goBack()} style={{flex:1, height:50, justifyContent:'center', alignItems:'center'}}>
  <Text category='s1' style={{color:theme['color-info-500']}}>Back</Text>
  </TouchableOpacity>
  </View>
  </View>
  </View>
  </Layout>
  </Modal>
  </View>



  </SafeAreaView>
  </Layout>
  </TouchableWithoutFeedback>

  )
};


export default AddNotes


const styles = StyleSheet.create({
  
  backdrop:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalView: {

    backgroundColor: "white",
    borderRadius: 12,
    width:300,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

});
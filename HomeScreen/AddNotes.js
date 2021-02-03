import React, { useContext, useState, useEffect } from 'react';
import { View , StyleSheet, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { addNote } from '../helperFunctions';
import { Button, Text ,Icon , Input, Modal, Card, List, Layout, useTheme, Divider} from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import * as Yup from 'yup';
import { SubjectsContext } from '../SubjectsContext';
import FolderSelectionComponent from '../UtilComponents/FolderSelectionComponent'

const TextSchema = Yup.object().shape({
  text: Yup.string()
    .min(1, 'Its crucial to recall inorder to learn')
    .max(200, 'Too Long!')
    .required('Required'),
});



function AddNotes(){

  const theme = useTheme()
  const [visible, setVisible] = React.useState(false);
  const authContext = useContext(AuthContext)
  const navigation = useNavigation();
  const subjectsContext = useContext(SubjectsContext)
  const [selectVisible, setSelectVisible] = React.useState(false);


  const confirmAddNote = () => {
    setVisible(false)
    navigation.dispatch(StackActions.popToTop())
  }


  return(
           
    <Layout behavior='position' style={{ flex: 1, padding:16}}>
      
    <Formik
    initialValues={{ text:'', textTheme:'' }}
    validationSchema={TextSchema}
    onSubmit={(values, actions) => {
     addNote( authContext.user.uid, subjectsContext.lastUsedSubject.id  , values.text, values.textTheme)
     //actions.setSubmitting(false);
     setVisible(true)

    }}
   >

    {formikProps => (

   <React.Fragment>
   <View>
    

   <TopHeader title={'Add Note'}/>

  <FolderSelectionComponent/> 
   </View>

   <View style={{marginVertical:20}}>



   <Input
   textStyle={{fontSize:16, fontWeight:'bold'}}
   style={{marginBottom:4, marginTop:4, borderColor:theme['background-basic-color-1'], backgroundColor:theme['background-basic-color-1']}}
   placeholder={'Main topic'}
   onChangeText={formikProps.handleChange('textTheme')}
    />

  {/*  {formikProps.errors.text && formikProps.touched.text ? <Text style={{marginVertical:4}}>{formikProps.errors.text}</Text> : null} */}
   <Input
    placeholder={'Write something here'}
    style={{backgroundColor:theme['background-basic-color-1'], borderColor:theme['background-basic-color-1'], marginTop:12}}
    textAlignVertical={'top'}
    textStyle={{fontSize:15, height:120}}
    multiline={true}
    autoFocus={true}
    size={'large'}
    onChangeText={formikProps.handleChange('text')}
    />
  
   <Button style={{marginVertical:16, marginHorizontal:20, borderRadius:30}} disabled={!(formikProps.dirty && formikProps.isValid)} onPress={()=>formikProps.handleSubmit()}>Done</Button>
   </View>
    
  
      
    <Modal
    visible={visible}
    backdropStyle={styles.backdrop}>
    <Card style={{width:180, height:120}} disabled={true}>
    <ImageBackground opacity={0.10} resizeMode='contain'source={require('../assets/images/progress.png')} style={styles.image}>
    <View style={{ height:100}}>
    <View style={{flex:1}}>
    <Text category='s1' style={{textAlign:'center', marginTop:12}}>Another note added!</Text>
    </View>
    
    <View>
    <Button style={{marginBottom:20}} onPress={confirmAddNote}>
    dismiss
    </Button>
    </View>
    
    </View>
    </ImageBackground>
    </Card>
    </Modal>     
  



    </React.Fragment>
    )}

  </Formik>
  </Layout>

    )
};


const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  contentContainer: {
    backgroundColor:'white'
  },

  image: {

    height:120,
    margin:-24,
    padding:18
  },

});

export default AddNotes
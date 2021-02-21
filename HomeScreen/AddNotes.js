import React, { useContext } from 'react';
import { View , SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import { addNote } from '../helperFunctions';
import { Button, Text ,Icon , Input, Layout, useTheme, Divider} from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import * as Yup from 'yup';
import { SubjectsContext } from '../SubjectsContext';
import FolderSelectionComponent from '../UtilComponents/FolderSelectionComponent'
import ConfirmComponent from '../UtilComponents/ConfirmComponent'


const TextSchema = Yup.object().shape({
  text: Yup.string()
    .min(1, 'Its crucial to recall inorder to learn')
    .max(200, 'Too Long!')
    .required('Required'),
});



function AddNotes(){

  const theme = useTheme()
  const [noteAdded, setNoteAdded] = React.useState(false);
  const authContext = useContext(AuthContext)
  const navigation = useNavigation();
  const subjectsContext = useContext(SubjectsContext)


  const confirmAddNote = () => {
    navigation.dispatch(StackActions.popToTop())
  }

  if(noteAdded){
    return(

      <Layout style={{ flex: 1, padding:16}}>
      <ConfirmComponent 
      picture={require('../assets/images/noteaddedv2.png')}
      buttonText={'Confirm'}
      headerText={'Note Added!'}
      bodyText={'Every note that you type out helps your brain process and retain information.'}
      onPress={confirmAddNote}
      />


      </Layout>
    )
  }


  return(
           
    <SafeAreaView style={{ flex: 1}}>
    <TopHeader title={'Add Note'}/>
    <Layout style={{ padding:16}}>
    <Formik
    initialValues={{ text:'', textTheme:'' }}
    validationSchema={TextSchema}
    onSubmit={(values) => {
    
     if(subjectsContext.lastUsedSubject != null){
      addNote( authContext.user.uid, subjectsContext.lastUsedSubject.id  , values.text, values.textTheme)
     } else {
      addNote( authContext.user.uid, '', values.text, values.textTheme)
     }

     setNoteAdded(true)

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
    

    </React.Fragment>
    )}

  </Formik>
  </Layout>
  </SafeAreaView>

    )
};


export default AddNotes
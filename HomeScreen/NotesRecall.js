import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, Input, useTheme } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../AuthContext'
import Swiper from 'react-native-swiper'
import { addRecallNote, skipNote } from '../helperFunctions';

const firestoreAutoId = () => {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let autoId = ''

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(
      Math.floor(Math.random() * CHARS.length)
    )
  }
  return autoId
}


const TextSchema = Yup.object().shape({
  text: Yup.string()
    .min(1, 'Its crucial to recall inorder to learn')
    .max(200, 'Too Long!')
    .required('Required'),
  

    
});



function NotesRecall(){
    const theme = useTheme();

    

    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const navigation = useNavigation();
 
    const [ currentData, setCurrentData ] = useState({})
    const [value, setValue] = React.useState('');
    const [visible, setVisible] = React.useState(false);



    const confirmSkipNote = (userID,subjectID) => {
      console.log(subjectID)
      skipNote(userID,subjectID)
      navigation.dispatch(StackActions.popToTop());
    }



    useEffect(() => {


        //

        async function fetchData(){

          let randomVar = firestoreAutoId()


          //if we have more than 3 notes then recall acn start

           const ref = await firestore().collection('Users').doc(userID).collection('GlobalNotes')
           .where(firestore.FieldPath.documentId(), '>=', randomVar)
           .orderBy(firestore.FieldPath.documentId(),'asc')
           .limit(1)
           .get()

           if(ref.docs.length > 0){
            ref.docs.map(doc => {
              let placeholderDict = doc.data()
              placeholderDict['id'] = doc.id
              setCurrentData(placeholderDict)
            })
           
          
          } else {

            const ref2 = await firestore().collection('Users').doc(userID).collection('GlobalNotes')
            .where(firestore.FieldPath.documentId(), '<=', randomVar)
            .orderBy(firestore.FieldPath.documentId(),'asc')
            .limit(1)
            .get()

            if(ref2.docs.length > 0){
              ref2.docs.map(doc => {
              let placeholderDict = doc.data()
              placeholderDict['id'] = doc.id
              setCurrentData(placeholderDict)
              })
             }
  

           }

           

        }

        fetchData()




      }, []);
    
   
    //Allow to never show again - skip
    //Once someone writes something it should never show again 

    return (

     

      <Formik
      initialValues={{ text:'', textTheme:'' }}
      validationSchema={TextSchema}
      onSubmit={(values, actions) => {
       addRecallNote( authContext.user.uid, currentData.id , values.text, currentData.textTheme, currentData.subject)
       //actions.setSubmitting(false);
       setVisible(true)
  
      }}
     >
    {formikProps => (
    <Layout style={{flex: 1, padding:16}}>
    <SafeAreaView>  


  
    <Button style={{alignSelf:'flex-end'}} status='danger' appearance='ghost' onPress={()=>{confirmSkipNote(userID,currentData.id)}}>Skip</Button>
   
   
    {/* <Text category='h5' style={{textAlign:'center'}}>{currentData.text}</Text> */}
    <Text category='h5' style={{textAlign:'center', marginTop:40}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</Text>
    <Input
      style={{marginTop:40, marginBottom:20,marginTop:20 ,backgroundColor:theme['background-basic-color-1'],  borderColor:theme['background-basic-color-1'],borderWidth:0}}
      autoFocus={true}
      multiline={true}
      textStyle={{height:80}}
      onChangeText={formikProps.handleChange('text')}
      placeholder='Write anything thoughts you have about the notes. Any new thoughts or new things learned?'
   

    />
    <Button style={{marginHorizontal:20}} onPress={()=>console.log(formikProps.errors.text)} disabled={formikProps.errors.text ? true : false}/>
    </SafeAreaView>
    </Layout>
    
    )}
    </Formik>
    );

      //we need to update state when we add an item
    
    }


const styles = StyleSheet.create({
  item: {

    marginBottom:8,
  
    
  },
  //contanier that holds everything 
  contentContainer: {

    paddingHorizontal: 16,

  },

  listItem:{
    lineHeight:24,
    textAlign:'center'
  },
  
  container:{
 
    flex:1
  },

  image: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
  
    margin:-24,
    padding:24
  },
});

export default NotesRecall


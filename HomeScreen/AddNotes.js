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



const SelectIcon = (props) => (
  <Icon {...props} width='25' height='25' name={'checkmark'} />
);
 

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

  const renderFooter = () => (
    <TouchableOpacity onPress={()=>subjectsContext.setLastUsedSubject({id:'', title:'No Folder'})}>
    <View style={{flexDirection:'row', alignItems:'center', marginVertical:16}}>
    
    <Icon style={{width:20, height:20, marginRight:16}} 
    name={subjectsContext.lastUsedSubject.id == '' ? 'checkmark-square-2': 'square-outline'}
    fill={subjectsContext.lastUsedSubject.id == '' ? theme['color-primary-800'] :theme['color-basic-500']}/>

    <Text 

    style={{
      flexShrink:1,
      fontWeight:subjectsContext.lastUsedSubject.id == '' ? 'bold' : 'normal',
      color:subjectsContext.lastUsedSubject.id == '' ? theme['color-basic-600'] :theme['color-basic-600']}
    }>
    None
    </Text>

  
    </View>
    </TouchableOpacity>
    

  )

  const renderItem = (info) => (
    <TouchableOpacity onPress={()=>subjectsContext.setLastUsedSubject(info.item)}>
    <View style={{flexDirection:'row', alignItems:'center', marginVertical:16}}>
    
    <Icon style={{width:20, height:20, marginRight:16}} 
    name={subjectsContext.lastUsedSubject.id == info.item.id ? 'checkmark-square-2': 'square-outline'}
    fill={subjectsContext.lastUsedSubject.id == info.item.id ? theme['color-primary-800'] :theme['color-basic-500']}/>

    <Text 
   
    style={{
      flexShrink:1,
      fontWeight:subjectsContext.lastUsedSubject.id == info.item.id ? 'bold' : 'normal',
      color:subjectsContext.lastUsedSubject.id == info.item.id ? theme['color-primary-800'] :theme['color-basic-800']}
    }>
    {info.item.title}
    </Text>

  
    </View>
    </TouchableOpacity>
    
  
  );

  
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
    
   <View style={{flexDirection:'row', justifyContent:'space-between'}}>
   <TopHeader/>

   </View>

    
   <View style={{alignSelf:'flex-end'}}> 
   <TouchableOpacity onPress={()=>{setSelectVisible(true)}}>
   <Text style={{textAlign:'right', marginBottom:2}} category='label'>Note Added To:</Text>
   {subjectsContext.lastUsedSubject != null &&
   <Text style={{fontSize:13, textAlign:'right',marginBottom:20, color:theme["color-primary-900"], fontWeight:'bold'}}>{subjectsContext.lastUsedSubject.title }</Text>
   }
   </TouchableOpacity>
   </View>


    
{/* 
   <Text category='s1' style={{marginBottom:8}}>If you figured out something new, write it down!</Text>
   <Text>The more you write out the better the information will be processed and stored in your head</Text> */}
   
   </View>

   <View style={{marginVertical:20}}>


   <Divider/>
   <Input
   textStyle={{fontSize:16}}
   style={{marginBottom:4, marginTop:4, borderColor:'white'}}
   placeholder={'Theme?'}
   onChangeText={formikProps.handleChange('textTheme')}
    />

   <Divider/>
  

   {formikProps.errors.text && formikProps.touched.text ? <Text style={{marginVertical:4}}>{formikProps.errors.text}</Text> : null}
   <Input
    placeholder={'What did you learn?'}
    style={{backgroundColor:theme["color-basic-100"], borderColor:theme["color-basic-100"], marginTop:20}}
    textAlignVertical={'top'}
    textStyle={{fontSize:16, height:100,  paddingTop:4}}
    multiline={true}
    
    size={'large'}
    onChangeText={formikProps.handleChange('text')}
      />

   <Button style={{marginVertical:16, marginHorizontal:24}} disabled={formikProps.errors.text ? true : false} onPress={()=>formikProps.handleSubmit()}>Done</Button>
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




    <Modal
    visible={selectVisible}
    backdropStyle={styles.backdrop}>
    <Card style={{margin:20}} disabled={true}>
    
    <Text category='h5' style={{marginTop:12, marginBottom:12, fontWeight:'bold'}}>Select a Folder:</Text>
  

    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={subjectsContext.subjects}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
    />
    
    <View>
    <Button  size='small' style={{marginBottom:8, marginTop:12 , alignSelf:'flex-end'}} onPress={()=>setSelectVisible(false)}>
    Close
    </Button>
    </View>
    
  
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
    height:280,
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
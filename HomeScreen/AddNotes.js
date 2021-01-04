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
  <Icon {...props} width='25' height='25' name={'folder-outline'} />
);
 

const TextSchema = Yup.object().shape({
  text: Yup.string()
    .min(1, 'Its crucial to recall inorder to learn')
    .max(200, 'Too Long!')
    .required('Required'),

    
});

const renderEmpty = () => (

  <View style={{flex: 1,alignItems:'center', justifyContent:'space-between', padding:16}}>


  <Text style={{textAlign:'center', marginTop:20}}>If you come up with thoughts write it down, typing it out will reinforce the idea in our heads</Text>
  <Text style={{textAlign:'center', marginTop:20, marginBottom:40}}>You can press the <Icon fill={'black'} width={25} height={25} name='edit'/> on the top left to add a note when you make connections about new ideas</Text>
  </View>
  
)





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

 /*  const renderFooter = () => (
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
    

  ) */

  const renderItem = (info) => (
    <TouchableOpacity onPress={()=>subjectsContext.setLastUsedSubject(info.item)}>
    <View style={{flexDirection:'row', alignItems:'center', marginVertical:16}}>
    
    <Icon style={{width:15, height:15, marginRight:20}} 
    name={subjectsContext.lastUsedSubject.id == info.item.id ? 'checkmark': 'folder-outline'}
    fill={subjectsContext.lastUsedSubject.id == info.item.id ? theme['color-primary-700'] :theme['color-basic-600']}/>

    <Text 
   
    style={{
      flexShrink:1,
      fontSize:14,
   
      fontWeight:subjectsContext.lastUsedSubject.id == info.item.id ? 'normal' : 'normal',
      color:subjectsContext.lastUsedSubject.id == info.item.id ? theme['color-primary-700'] :theme['color-basic-600']}
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
    

   <TopHeader title={'Add Note'}/>


    
   <View style={{marginLeft:20, marginRight:50}}> 
   <TouchableOpacity onPress={()=>{setSelectVisible(true)}}>
    
   {subjectsContext.lastUsedSubject != null &&
   <View style={{ marginTop:20, flexDirection:'row', alignItems:'center'}}>
   <Icon style={{marginRight:8}} fill={theme["color-primary-500"]} width='15' height='15' name={'folder'} />
   <Text style={{fontSize:13,color:theme["color-primary-500"], fontWeight:'bold'}}>{subjectsContext.lastUsedSubject.title }</Text>
   </View>
   }
   </TouchableOpacity>
   </View>


    
{/* 
   <Text category='s1' style={{marginBottom:8}}>If you figured out something new, write it down!</Text>
   <Text>The more you write out the better the information will be processed and stored in your head</Text> */}
   
   </View>

   <View style={{marginVertical:20}}>



   <Input
   textStyle={{fontSize:16, fontWeight:'bold'}}
   style={{marginBottom:4, marginTop:4, borderColor:'white', backgroundColor:theme["color-basic-100"]}}
   placeholder={'Main topic'}
   onChangeText={formikProps.handleChange('textTheme')}
    />


  

  {/*  {formikProps.errors.text && formikProps.touched.text ? <Text style={{marginVertical:4}}>{formikProps.errors.text}</Text> : null} */}
   <Input
    placeholder={'Write something here'}
    style={{backgroundColor:theme["color-basic-100"], borderColor:theme["color-basic-100"], marginTop:12}}
    textAlignVertical={'top'}
    textStyle={{fontSize:15, height:120}}
    multiline={true}
    autoFocus={true}
    size={'large'}
    onChangeText={formikProps.handleChange('text')}
      />
  
   <Button style={{marginVertical:16, marginHorizontal:20}} disabled={!(formikProps.dirty && formikProps.isValid)} onPress={()=>formikProps.handleSubmit()}>Done</Button>
  
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
    <Card style={{paddingHorizontal:24, paddingVertical:20, marginHorizontal:20}} disabled={true}>
    
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={subjectsContext.subjects}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      
    />
    
    <View>
    <Button appearance='outline' style={{marginBottom:0, marginTop:20 }} onPress={()=>setSelectVisible(false)}>
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
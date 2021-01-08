import React, { useContext, useState, useEffect } from 'react';
import { View , StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { addNote } from '../helperFunctions';
import { Button, Text ,Icon , Input, Modal, Card, Layout, useTheme, List } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import { useNavigation, StackActions } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'
import * as Yup from 'yup';
import { SubjectsContext } from '../SubjectsContext';
import StudyProgressIndicator from '../UtilComponents/StudyProgressIndicator'

const TextSchema = Yup.object().shape({
  text: Yup.string()
    .min(1, 'Its crucial to recall inorder to learn')
    .max(200, 'Too Long!')
    .required('Type out what you have learned below '),

});







function Recall(){
 
  const theme = useTheme()
  const [visible, setVisible] = React.useState(false);
  const [selectVisible, setSelectVisible] = React.useState(false);
  const authContext = useContext(AuthContext)
  const navigation = useNavigation();
  const subjectsContext = useContext(SubjectsContext)
  const [confirmBackVisible, setConfirmBackVisible] = React.useState(false);



  const renderEmpty = () => (

    <View style={{flex: 1,alignItems:'center', justifyContent:'space-between', padding:16}}>
  
  
    <Text style={{textAlign:'center', marginTop:20}}>If you come up with thoughts write it down, typing it out will reinforce the idea in our heads</Text>
    <Text style={{textAlign:'center', marginTop:20, marginBottom:40}}>You can press the <Icon fill={'black'} width={25} height={25} name='edit'/> on the top left to add a note when you make connections about new ideas</Text>
    </View>
    
  )
  
  
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

  useEffect(() => {

    if( confirmBackVisible || visible ){
      return;
    }

    const unsubscribe = navigation.addListener('beforeRemove', (e) => {

      e.preventDefault();
      setConfirmBackVisible(true)

    })

    return unsubscribe
    
   
  },

    
  [navigation, confirmBackVisible, visible]
);


  const confirmAddNote = () => {
    setVisible(false)
    navigation.pop()
    navigation.navigate('StudyFinished')
  }

  

  const popToTop = () => {
    navigation.dispatch(StackActions.popToTop())
  }


  return(
           
    <Layout style={{ flex: 1 }}>
    <StudyProgressIndicator currentStep={3}/>
    <View style={{padding:16}}>

    <Formik
    initialValues={{ text:'', textTheme:'', subject:''}}
    validationSchema={TextSchema}
    onSubmit={(values, actions) => {
     addNote( authContext.user.uid,  subjectsContext.lastUsedSubject.id, values.text, values.textTheme)
     setVisible(true)
     confirmAddNote()

    }}
   >

    {formikProps => (

   <React.Fragment>
   
   <Text category='h5' style={{marginTop:20, marginLeft:20, marginBottom:12, fontWeight:'bold', lineHeight:26}}>Think about what you just learned and type it out</Text>
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

   <View style={{marginVertical:20}}>
   
   
  
   <Input
   textStyle={{fontSize:16, fontWeight:'bold'}}
   style={{marginBottom:4, marginTop:4, borderColor:'white', backgroundColor:theme["color-basic-100"]}}
   placeholder={'Main topic'}
   onChangeText={formikProps.handleChange('textTheme')}
    />
   
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

   </View>

    <Button style={{marginVertical:16, marginHorizontal:20}} disabled={!(formikProps.dirty && formikProps.isValid)} onPress={()=>formikProps.handleSubmit()} >
      Done
    </Button>
      
  {/*   <Modal
    visible={visible}
    backdropStyle={styles.backdrop}>
    <Card disabled={true}>
    <Text>Note Added!</Text>
    <Button size='small' onPress={confirmAddNote}>
    DISMISS
    </Button>
    

    </Card>
    </Modal> */}  


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


    <Modal
    visible={confirmBackVisible}
    backdropStyle={styles.backdrop}
    >

    <Card style={{marginHorizontal:40}} disabled={true}>
    <View style={{justifyContent:'center', alignItems:'center'}}>
    <Text style={{marginVertical:12, marginBottom:24 ,textAlign:'center'}}>Writing something down is crucial to learning!</Text> 
    <View style={{flexDirection:'row', marginBottom:8}}>
        
    <Button status='danger' style={{marginRight:12}} onPress={popToTop}>
    Leave
    </Button>

    <Button appearance='outline' onPress={()=>setConfirmBackVisible(false)}>
    Close
    </Button>
    </View>
    </View>
    </Card>
    </Modal>     
      
    </React.Fragment>
    )}
  </Formik>
  </View>

  </Layout>

    )


    
};


const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  container: {
    backgroundColor:'white',
  },

});



export default Recall
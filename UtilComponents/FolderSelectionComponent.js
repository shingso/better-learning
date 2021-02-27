import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard, Dimensions } from 'react-native'
import { Card, List, Text, Button, Icon, Modal, useTheme, Layout, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { SubjectsContext } from '../SubjectsContext';
import * as Yup from 'yup';
import { addSubject } from '../helperFunctions';
import { AuthContext } from '../AuthContext'
import { Formik } from 'formik';


const FolderTitleSchema = Yup.object().shape({
  folderTitle: Yup.string()
    .min(1, 'Too Short!')
    .max(80, 'Maximum 80 characters for folder title')
    .required('Folder Title Required'),

})


function FolderSelectionComponent(){

    const width = Dimensions.get('screen').width
    const theme = useTheme()
    const authContext = useContext(AuthContext)
    const [selectVisible, setSelectVisible] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const subjectsContext = useContext(SubjectsContext)
    const navigation = useNavigation();
    const [number, setNumber] = React.useState(0);


    const StatefulModalContent = () => {
   
     
    
      return (
        <Layout style={{flex:1, paddingTop:20, paddingHorizontal:20, borderRadius:12, marginBottom:300}}>
           <Formik
            initialValues={{ folderTitle:''}}
            validationSchema={FolderTitleSchema}
            onSubmit={(values, actions) => {
            addSubject( authContext.user.uid, values.folderTitle)
            actions.setSubmitting(false);
            setVisible(false)
            }}
          >

      {formikProps => (
        <View>
        <View>
        <Text category='s1' style={{textAlign:'center', marginBottom:4}}>Add a Folder</Text>
        <Text category='p2' style={{textAlign:'center', marginBottom:20}}>Enter a title for the folder</Text>
        </View>
        <Input
        placeholder={'Folder Title'}
        value={formikProps.values.folderTitle}
       
        onChangeText={formikProps.handleChange('folderTitle')}
        status={formikProps.errors.folderTitle != null ? 'danger' : 'basic'}
        autoFocus={true}
        />

        <View style={{ borderTopWidth:0.5, borderTopColor:theme['color-basic-400'],height:50, marginHorizontal:-20, borderBottomRightRadius:12, borderBottomLeftRadius:12, width:300, justifyContent:'center', marginTop:16}}>
        <View style={{flexDirection:"row"}}>
        
        <TouchableOpacity onPress={()=>setVisible(false)} style={{flex:1, height:50, borderRightWidth:0.5, borderRightColor:theme['color-basic-400'], justifyContent:'center'}}>
        <Text category='s1' style={{textAlign:"center"}}>Close</Text>
        </TouchableOpacity>
        
        <TouchableOpacity  onPress={()=>formikProps.handleSubmit()} disabled={formikProps.errors.folderTitle} style={{flex:1, height:50, justifyContent:'center'}}>
        <Text category='s1' style={{textAlign:"center", color:!(formikProps.isValid && formikProps.dirty) ? theme['color-basic-600'] : theme['color-primary-600']}}>Confirm</Text>
        </TouchableOpacity>
        </View>
        </View>



        </View>
        )}
        </Formik>
        </Layout>
      );
    };

    const renderFooter = () => (
        <View>
        {subjectsContext.lastUsedSubject &&
        <TouchableOpacity onPress={()=>subjectsContext.setLastUsedSubject({id:'', title:'All Notes'})}>
        <View style={{flexDirection:'row', alignItems:'center', marginVertical:16}}>
        
        <Icon style={{width:20, height:20, marginRight:12}} 
        name={subjectsContext.lastUsedSubject.id == '' ? 'folder': 'folder'}
        fill={subjectsContext.lastUsedSubject.id == '' ? theme['color-primary-600'] :theme['color-basic-400']}/>
    
        <Text
        style={{
          flexShrink:1,
          fontSize:14,
          fontSize:subjectsContext.lastUsedSubject.id == '' ? 15 : 14,
          fontWeight:subjectsContext.lastUsedSubject.id == '' ? 'bold' : 'bold',
          color:subjectsContext.lastUsedSubject.id == '' ? theme['color-primary-600'] :theme['color-basic-500'],
          letterSpacing:0.2
        }}>
        All Notes
        </Text>
        </View> 
        </TouchableOpacity>
        }
        </View>
    ) 
    //subjectsContext.setLastUsedSubject(info.item)
    const renderItem = (info) => (
        
    <TouchableOpacity onPress={()=>setNumber(number+1)}>
    <View style={{flexDirection:'row', alignItems:'center', marginVertical:20}}>

    <Icon style={{width:20, height:20, marginRight:12}} 
    name={subjectsContext.lastUsedSubject.id == info.item.id ? 'folder': 'folder'}
    fill={subjectsContext.lastUsedSubject.id == info.item.id ? theme['color-primary-600'] :theme['color-basic-400']}/>
    
    <Text 
    style={{
        flexShrink:1,
        fontSize:subjectsContext.lastUsedSubject.id == info.item.id ? 15 : 14,
        fontWeight:subjectsContext.lastUsedSubject.id == info.item.id ? 'bold' : 'bold',
        color:subjectsContext.lastUsedSubject.id == info.item.id ? theme['color-primary-700'] :theme['color-basic-500'],
        letterSpacing:0.2
        }}>
    {info.item.title}
    </Text>
      
    </View>
    </TouchableOpacity>

    );


    const renderEmpty = () => (

    <View style={{flex: 1}}>
    <Text style={{textAlign:'center', fontWeight:'bold',letterSpacing:0.4, fontSize:16, marginVertical:12}}>You don't have any folders yet</Text>
    </View>
        
    )
    
    const openModal = () => {
        Keyboard.dismiss()
        setSelectVisible(true)
    }


   return (
 
   <View>
   <View style={{marginRight:50}}> 
   <TouchableOpacity onPress={subjectsContext.lastUsedSubject != null ? ()=>openModal() : ()=>setVisible(true)}>
    
   {subjectsContext.lastUsedSubject != null &&
   <View style={{ marginTop:20, flexDirection:'row', alignItems:'center'}}>
   <Icon style={{marginRight:12}} fill={theme["color-primary-500"]} width='20' height='20' name={'folder'} />
   <Text style={{fontSize:16,color:theme["color-primary-600"], fontWeight:'bold'}}>{subjectsContext.lastUsedSubject.title}</Text>
   </View>
   }

   {subjectsContext.lastUsedSubject == null &&
   <View style={{ marginTop:20, flexDirection:'row', alignItems:'center'}}>
   <Icon style={{marginRight:8}} fill={theme["color-info-500"]} width='20' height='20' name={'folder-add-outline'} />
   <Text style={{fontSize:13,color:theme["color-info-500"], fontWeight:'bold'}}>{'Create a folder'}</Text>
   </View>
   }


   </TouchableOpacity>


   </View>
    <Modal
    visible={selectVisible}
    backdropStyle={styles.backdrop}>
    <Layout style={{paddingHorizontal:20, paddingTop:20, borderWidth:0.5, width:width-60, borderRadius:12}} disabled={true}>
    <List
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      data={subjectsContext.subjects}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
    />
  
   <View style={{ borderTopWidth:0.5, borderTopColor:theme['color-basic-400'],height:50, marginHorizontal:-20, borderBottomRightRadius:12, borderBottomLeftRadius:12, width:width-61, justifyContent:'center', marginTop:16}}>
   <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
   <TouchableOpacity onPress={()=>setSelectVisible(false)} style={{flex:1, height:50, justifyContent:'center' }}>
   <Text category='s1' style={{ textAlign:"center", color:theme['color-info-500'] }}>Close</Text>
   </TouchableOpacity>
   </View>
   </View>
   </Layout>
   </Modal>   

   <Modal
    visible={visible}
    backdropStyle={styles.backdrop}>
    <StatefulModalContent/>
    </Modal>

   
   </View>
      
      
    );


  }

export default FolderSelectionComponent

const styles = StyleSheet.create({
    
      backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    
      contentContainer: {
        paddingHorizontal:12,
        backgroundColor:"white"
      },
    
      image: {
    
        height:120,
        margin:-24,
        padding:18
      },
  
  item: {
    marginVertical:4
  },

});
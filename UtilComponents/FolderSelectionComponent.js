import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard, Dimensions, Modal, Platform } from 'react-native'
import { Card, List, Text, Button, Icon, useTheme, Layout, Input } from '@ui-kitten/components';
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
    
    
    
    const openModal = () => {
      Keyboard.dismiss()
      setSelectVisible(true)
    }

    const StatefulModalContent = () => {
   
     
    
      return (
        <Layout style={{ paddingTop:20, paddingHorizontal:20, borderRadius:12}}>
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
        <Text category='s1' style={{textAlign:"center", color:theme['color-info-500']}}>Close</Text>
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
        <View style={{flexDirection:'row', alignItems:'center', marginVertical:16, paddingHorizontal:20}}>
        
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
        
    <TouchableOpacity onPress={()=>subjectsContext.setLastUsedSubject(info.item)}>
    <View style={{flexDirection:'row', alignItems:'center', marginVertical:16, paddingHorizontal:20}}>

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
    
    


   return (
 
   <View>
   <View style={{marginRight:50}}> 
   <TouchableOpacity onPress={subjectsContext.lastUsedSubject != null ? ()=>openModal() : ()=>setVisible(true)}>
    
   {subjectsContext.lastUsedSubject != null &&
   <View style={{ marginTop:20, flexDirection:'row', alignItems:'center'}}>
   <Icon style={{marginRight:8}} fill={theme["color-primary-500"]} width='22' height='22' name={'folder'} />
   <Text style={{fontSize:16,color:theme["color-primary-600"], fontFamily:'Poppins-Bold', marginTop:4, fontWeight:'800'}}>{subjectsContext.lastUsedSubject.title}</Text>
   </View>
   }

   {subjectsContext.lastUsedSubject == null &&
   <View style={{ marginTop:20, flexDirection:'row', alignItems:'center'}}>
   <Icon style={{marginRight:8}} fill={theme["color-info-400"]} width='20' height='20' name={'folder-add'} />
   <Text style={{fontSize:14,color:theme["color-info-400"], fontFamily:'Poppins-Bold', marginTop:Platform.OS ==='ios' ? 0 : 4, fontWeight:'800'}}>{'Create a folder'}</Text>
   </View>
   }


   </TouchableOpacity>


   </View>
    <Modal
    visible={selectVisible}

    transparent={true}>
    <Layout style={{justifyContent:'center', alignItems:'center', flex:1, backgroundColor:'rgba(0,0,0,0.5)'}}>
    <View style={[styles.modalView,{width:width-36}]}>
    <List
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      data={subjectsContext.subjects}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
    />
  
   <View style={{ borderTopWidth:0.5, borderTopColor:theme['color-basic-400'],height:50,  width:width-36, justifyContent:'center', marginTop:16}}>
   <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
   <TouchableOpacity onPress={()=>setSelectVisible(false)} style={{flex:1, height:50, justifyContent:'center' }}>
   <Text category='s1' style={{ textAlign:"center", color:theme['color-info-500'] }}>Close</Text>
   </TouchableOpacity>
   </View>
   </View>
   </View>
   </Layout>
   </Modal>   

   <Modal
    visible={visible}
    transparent={true}>
       <Layout style={{justifyContent:'center', paddingBottom:Platform.OS ==='ios' ? 200 : 0,alignItems:'center', flex:1, backgroundColor:'rgba(0,0,0,0.5)'}}>
    <StatefulModalContent/>
    </Layout>
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
        backgroundColor:"white",

      },
    
      item: {
        marginVertical:4,
      },

      modalView: {
        paddingTop:12,
        backgroundColor: "white",
        borderRadius: 12,

   
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
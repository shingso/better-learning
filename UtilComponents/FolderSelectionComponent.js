import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, List, Text, Button, Icon, Modal, useTheme } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { SubjectsContext } from '../SubjectsContext';








function FolderSelectionComponent(){

    const theme = useTheme()
    const [selectVisible, setSelectVisible] = React.useState(false);
    const subjectsContext = useContext(SubjectsContext)
    const navigation = useNavigation();
    
    const navigateToAddSubject = () => {
        setSelectVisible(false)
        navigation.navigate('AddSubject')
      }

      

    const renderFooter = () => (
        <View>
        {subjectsContext.lastUsedSubject &&
        <TouchableOpacity onPress={()=>subjectsContext.setLastUsedSubject({id:'', title:'All Notes'})}>
        <View style={{flexDirection:'row', alignItems:'center', marginVertical:16}}>
        
        <Icon style={{width:15, height:15, marginRight:20}} 
        name={subjectsContext.lastUsedSubject.id == '' ? 'checkmark': 'folder-outline'}
        fill={subjectsContext.lastUsedSubject.id == '' ? theme['color-primary-700'] :theme['color-basic-600']}/>
    
        <Text
        style={{
          flexShrink:1,
          fontWeight:subjectsContext.lastUsedSubject.id == '' ? 'bold' : 'normal',
          color:subjectsContext.lastUsedSubject.id == '' ? theme['color-basic-600'] :theme['color-basic-600']}
        }>
        All Notes
        </Text>
        </View> 
        </TouchableOpacity>
        }
        </View>
      ) 
    
      const renderItem = (info) => (
        
        <TouchableOpacity onPress={()=>subjectsContext.setLastUsedSubject(info.item)}>
        <View style={{flexDirection:'row', alignItems:'center', marginVertical:16, width:400}}>
        
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


      const renderEmpty = () => (

        <View style={{flex: 1}}>
        <Text style={{textAlign:'center', color:theme['color-info-500'], fontWeight:'bold',letterSpacing:0.4}}>You don't have any folders yet</Text>
        <Text style={{textAlign:'center', marginVertical:12}}>Add a folder to better organize your notes and review them</Text>
        <Card onPress={navigateToAddSubject} style={{alignItems:'center', paddingVertical:40, marginVertical:20, borderWidth:0 ,backgroundColor:theme['color-primary-600']}}> 
        <View style={{alignItems:'center'}}>
        <Icon width={30} height={30} fill={theme['color-basic-200']} style={{marginBottom:8}}  name={'folder-add-outline'}/>
        <Text category='s1' style={{color:theme['color-basic-200']}}>Add Folder</Text>
        </View>
        </Card>
        </View>
        
      )
    
    
    return (
       

       

   <View style={{}}>

   <View style={{marginLeft:20, marginRight:50}}> 
   <TouchableOpacity onPress={()=>{setSelectVisible(true)}}>
    
   {subjectsContext.lastUsedSubject != null &&
   <View style={{ marginTop:20, flexDirection:'row', alignItems:'center'}}>
   <Icon style={{marginRight:8}} fill={theme["color-primary-600"]} width='16' height='16' name={'folder'} />
   <Text style={{fontSize:15,color:theme["color-primary-700"], fontWeight:'bold'}}>{subjectsContext.lastUsedSubject.title }</Text>
   </View>
   }

  {subjectsContext.lastUsedSubject == null &&
   <View style={{ marginTop:20, flexDirection:'row', alignItems:'center'}}>
   <Icon style={{marginRight:8}} fill={theme["color-info-500"]} width='15' height='15' name={'plus-circle-outline'} />
   <Text style={{fontSize:13,color:theme["color-info-500"], fontWeight:'bold'}}>{'Create a new folder'}</Text>
   </View>
   }


   </TouchableOpacity>
   </View>
    <Modal
    visible={selectVisible}
    backdropStyle={styles.backdrop}>
    <Card style={{paddingHorizontal:24, paddingVertical:32, marginHorizontal:20}} disabled={true}>
    <List
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={subjectsContext.subjects}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
    />
    <View>
    <Button appearance='outline' style={{marginBottom:0, marginTop:20 }} onPress={()=>setSelectVisible(false)}>
    Close
    </Button>
    </View> 
    </Card>
    </Modal>   
    </View>
      
      
      );


    }

export default FolderSelectionComponent

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
  
  item: {
    marginVertical:4
  },

});
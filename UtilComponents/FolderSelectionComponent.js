import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard, Dimensions } from 'react-native'
import { Card, List, Text, Button, Icon, Modal, useTheme } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { SubjectsContext } from '../SubjectsContext';








function FolderSelectionComponent(){

    const width = Dimensions.get('screen').width
    const theme = useTheme()
    const [selectVisible, setSelectVisible] = React.useState(false);
    const subjectsContext = useContext(SubjectsContext)
    const navigation = useNavigation();
    const [number, setNumber] = React.useState(0);

    const renderFooter = () => (
        <View>
        {subjectsContext.lastUsedSubject &&
        <TouchableOpacity onPress={()=>subjectsContext.setLastUsedSubject({id:'', title:'All Notes'})}>
        <View style={{flexDirection:'row', alignItems:'center', marginVertical:16}}>
        
        <Icon style={{width:20, height:20, marginRight:20}} 
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

    <Icon style={{width:20, height:20, marginRight:20}} 
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
   <TouchableOpacity onPress={subjectsContext.lastUsedSubject != null ? ()=>openModal() : ()=>navigation.navigate('AddSubject')}>
    
   {subjectsContext.lastUsedSubject != null &&
   <View style={{ marginTop:20, flexDirection:'row', alignItems:'center'}}>
   <Icon style={{marginRight:12}} fill={theme["color-primary-500"]} width='20' height='20' name={'folder'} />
   <Text style={{fontSize:16,color:theme["color-primary-600"], fontWeight:'bold'}}>{subjectsContext.lastUsedSubject.title}</Text>
   </View>
   }

   {subjectsContext.lastUsedSubject == null &&
   <View style={{ marginTop:20, flexDirection:'row', alignItems:'center'}}>
   <Icon style={{marginRight:8}} fill={theme["color-info-500"]} width='15' height='15' name={'plus-circle-outline'} />
   <Text style={{fontSize:13,color:theme["color-info-500"], fontWeight:'bold'}}>{'Create a folder'}</Text>
   </View>
   }


   </TouchableOpacity>


   </View>
    <Modal
    visible={selectVisible}
    backdropStyle={styles.backdrop}>
    <Card style={{paddingHorizontal:12, paddingVertical:20, marginHorizontal:20, borderWidth:0.5, width:width-60}} disabled={true}>
    <List
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={subjectsContext.subjects}
      renderItem={renderItem}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
    />
  
    <Button  style={{marginBottom:0, marginTop:20, borderRadius:30 }} onPress={()=>setSelectVisible(false)}>
    Close
    </Button>
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
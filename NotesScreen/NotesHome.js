import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, Divider, useTheme } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'


const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const FolderIcon = (props) => (
  <Icon {...props} name='folder-add'/>
);



function NotesHome({ navigation }){
    
 
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const theme = useTheme()

    const [ loading, setLoading ] = useState(true);
    const [ subjects, setSubjects ] = useState([]);



    const renderItem = (info) => (
      
      <Card onPress={()=>{navigation.navigate('NotesFocused',{ title: info.item.title, subjectID: info.item.id})}} style={styles.item}>
      <View style={{flexDirection:'row', alignItems:'center',}}>
      <View>
      <Icon fill={theme['color-primary-300']} width={35} height={35} style={{marginRight:24}} name='folder'/> 
      </View>
      <View style={{flex:1}}>
      <Text style={{lineHeight:22, flexShrink:1, letterSpacing:0.1, color:theme['color-basic-700'], fontSize:13, fontWeight:'bold'}} >{info.item.title}</Text>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <Text style={{ color:theme['color-basic-600'], fontSize:10, marginTop:2}}><Text style={{fontSize:11, fontWeight:'bold', color:theme['color-basic-600']}}>23</Text>  notes</Text>
      <Text style={{fontSize:5, marginHorizontal:12, color:theme['color-basic-600']}}>{'\u2B24'}</Text>
      <Text style={{ color:theme['color-basic-600'], fontSize:10, marginTop:2}}><Text style={{fontSize:11, fontWeight:'bold', color:theme['color-basic-600']}}>1 day ago</Text></Text>
      </View>
      </View>
      <Icon fill={theme['color-basic-400']} width={20} height={20} name='arrow-ios-forward-outline'/> 
     {/*  <View style={{borderWidth:0, padding:6, borderRadius:4, marginLeft:12, flexDirection:'row', alignItems:'center'}}>
      <Text style={{fontSize:15, fontWeight:'bold', color:theme['color-basic-700']}}>1 <Text style={{fontSize:11, color:theme['color-basic-600']}}>note</Text></Text>
      <Icon fill={theme['color-primary-500']} width={16} height={16} style={{marginLeft:4}} name='edit-2'/> 
      </View> */}

      
      
      </View>
      </Card>
      

    );


    const renderEmpty = () => (

      <Card onPress={()=>navigation.navigate('AddSubject')} style={{marginTop:8, borderWidth:1, paddingVertical:60, borderColor:theme['color-primary-600']}}>
      <View>
      <Text style={{textAlign:'center', color:theme['color-primary-600']}} category='s1'>Add a Folder</Text>
      <Text style={{marginTop:12,letterSpacing:0.2,color:theme['color-basic-600'], textAlign:'center', fontSize:14}}>You dont have any folders yet, add a folder to better organize your notes</Text>
      </View>
      </Card>
    )


   
    const renderHeader = () => (
        
    <View>
    <View>
    <TopHeader title={'Notes Collection'}/>
    </View>
 

     {/* <Image
          style={{
            height:80,
            width:410,
            
            marginBottom:16,
            marginTop:-16,
           
          }}
  
          source={require(('../assets/images/yournotesv1orange.png'))}
        />  */}
    
    {/* <Text  style={{ fontSize:14, letterSpacing:0.2,marginHorizontal:32,textAlign:'center', lineHeight:24, color:theme['color-basic-600']}}>Review and organize your notes</Text> */}

    
    {/* 
    <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:16, paddingHorizontal:4 }}>

      
    <Button  onPress={()=>navigation.navigate('AddNotes')} accessoryLeft={EditIcon} appearance='outline' style={{flex:1, height:40, marginRight:8}}>Add Note</Button>
    <Button  onPress={()=>navigation.navigate('AddSubject')} accessoryLeft={FolderIcon} appearance='outline'  style={{flex:1, height:40, marginLeft:8}}>Add Folder</Button>
    </View> */}

    <Card onPress={()=>navigation.navigate('AddNotes')}  style={{marginVertical:4, paddingHorizontal:4, paddingVertical:4, borderWidth:0.3, marginTop:16}}>
    <View style={{flexDirection:'row', alignItems:'center',}}>
    <View>
    <Icon fill={theme['color-primary-700']} width={35} height={35} style={{marginRight:24}} name='folder-add'/> 
    </View>
    <View style={{flex:1}}>
    <Text style={{lineHeight:22, flexShrink:1, letterSpacing:0.1, color:theme['color-primary-700'], fontSize:15, fontWeight:'bold'}}>Add a new folder</Text>
    </View>
    </View>
    </Card>
  

    <Card onPress={()=>navigation.navigate('GlobalNotes')}  style={styles.item}>
    <View style={{flexDirection:'row', alignItems:'center',}}>
    <View>
    <Icon fill={theme['color-info-200']} width={35} height={35} style={{marginRight:24}} name='folder'/> 
    </View>
    <View style={{flex:1}}>
    <Text style={{lineHeight:22, flexShrink:1, letterSpacing:0.1, color:theme['color-basic-700'], fontSize:13, fontWeight:'bold'}}>All Notes</Text>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={{ color:theme['color-basic-600'], fontSize:10, marginTop:2}}><Text style={{fontSize:11, fontWeight:'bold', color:theme['color-basic-600']}}>121</Text>  notes</Text>
    <Text style={{fontSize:5, marginHorizontal:12}}>{'\u2B24'}</Text>
    <Text style={{ color:theme['color-basic-600'], fontSize:10, marginTop:2}}><Text style={{fontSize:11, fontWeight:'bold', color:theme['color-basic-600']}}>23 mins ago</Text></Text>
    </View>
    </View>
    <Icon fill={theme['color-basic-400']} width={20} height={20} name='arrow-ios-forward-outline'/> 
    </View>
    </Card>


    <Card onPress={()=>navigation.navigate('RecalledNotes')}  style={styles.item}>
    <View style={{flexDirection:'row', alignItems:'center',}}>
    <View>
    <Icon fill={theme['color-info-200']} width={35} height={35} style={{marginRight:24}} name='folder'/> 
    </View>
    <View style={{flex:1}}>
    <Text style={{lineHeight:22, flexShrink:1, letterSpacing:0.1, color:theme['color-basic-700'], fontSize:13, fontWeight:'bold'}}>Daily Recall Notes</Text>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Text style={{ color:theme['color-basic-600'], fontSize:10, marginTop:2}}><Text style={{fontSize:11, fontWeight:'bold', color:theme['color-basic-600']}}>13</Text>  notes</Text>
    <Text style={{fontSize:5, marginHorizontal:12}}>{'\u2B24'}</Text>
    <Text style={{ color:theme['color-basic-600'], fontSize:10, marginTop:2}}><Text style={{fontSize:11, fontWeight:'bold', color:theme['color-basic-600']}}>1 hour ago</Text></Text>
    </View>
    </View>
    <Icon fill={theme['color-basic-400']} width={20} height={20} name='arrow-ios-forward-outline'/> 
    </View>
    </Card>


  
   {/*  <Card onPress={()=>navigation.navigate('GlobalNotes')} style={styles.item}>   
    <Text style={{textAlign:'center' ,fontSize:15, fontWeight:'bold'}}>All Notes</Text>
    <Text style={{ color:theme['color-basic-600'], fontSize:12, textAlign:'center', marginTop:8}}><Text style={{fontSize:13}}>112</Text> notes</Text>
    <Text style={{marginTop:8,letterSpacing:0.2,color:theme['color-basic-600'], textAlign:'center', fontSize:12}}>A collection of your thoughts</Text>
    </Card>

    <Card onPress={()=>navigation.navigate('RecalledNotes')} style={styles.item}>
    <Text style={{textAlign:'center',  fontSize:15, fontWeight:'bold'}}>Daily Recall Notes</Text>
    <Text style={{marginTop:8,letterSpacing:0.2,color:theme['color-basic-600'], textAlign:'center', fontSize:12}}>Notes from your daily recall sessions</Text>
    </Card> */}
    </View>

    );
 
    
 
    
    
    useEffect(() => {

        const ref = firestore().collection('Users').doc(userID).collection('Subjects')
        return ref.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { title, timeStamp } = doc.data();
            list.push({
              id: doc.id,
              title,
              timeStamp,
            
            });
          });
  
          setSubjects(list);
          
          if (loading) {
            setLoading(false);
          }
          

        });
      }, []);

    
    if (loading) {
        return null; 
    }

  

    return (
       
      <SafeAreaView style={{flex: 1}}>
      
      <List
         style={styles.container}
         contentContainerStyle={styles.contentContainer}
         data={subjects}
         renderItem={renderItem}
         ListEmptyComponent={renderEmpty}
         ListHeaderComponent={renderHeader}
         />
       </SafeAreaView>
      
      
      );

      //we need to update state when we add an item
    
    }

export default NotesHome

const styles = StyleSheet.create({
  
  

  backdrop:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  contentContainer: {
    marginVertical:12,
    marginHorizontal:20,
    paddingBottom:100,
    borderColor:'red',
    
  },

  container:{
  
  },

 
  
  item: {


    marginVertical:4,
    paddingHorizontal:4,
    paddingVertical:12,
    borderWidth:0.3
  
   
  },

});
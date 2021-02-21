import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, Divider, useTheme } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { UserDataContext } from '../UserDataContext'


const EditIcon = (props) => (
  <Icon {...props}  name='edit-2-outline'/>
);


const FolderIcon = (props) => (
  <Icon {...props}  name='folder-add-outline'/>
);





function NotesHome({ navigation }){
    
 
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const theme = useTheme()
    const userData = useContext(UserDataContext)

    const [ loading, setLoading ] = useState(true);
    const [ subjects, setSubjects ] = useState([]);


    const FolderComponent = (props) => (
      <Card onPress={props.navigate} style={styles.item}>
      <View style={{flexDirection:'row', alignItems:'center',}}>
      <View>
      <Icon fill={props.color} width={35} height={35} style={{marginRight:24}} name='folder'/> 
      </View>
      <View style={{flex:1}}>
      <Text category='s2' style={{lineHeight:22, flexShrink:1, letterSpacing:0.1, marginBottom:2}}>{props.title}</Text>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <Text category='c2' style={{ color:theme['text-hint-color'], marginTop:2}}><Text style={{fontSize:12, fontWeight:'bold', color:theme['color-basic-700']}}>{props.noteCount}</Text> notes</Text>
      {/*<Text style={{fontSize:5, marginHorizontal:12, color:theme['color-basic-600']}}>{'\u2B24'}</Text>
      <Text style={{ color:theme['color-basic-600'], fontSize:10, marginTop:2}}><Text style={{fontSize:11, fontWeight:'bold', color:theme['color-basic-600']}}>1 day ago</Text></Text> */}
      </View>
      </View>
      {/* <Icon fill={theme['color-basic-400']} width={20} height={20} name='arrow-ios-forward-outline'/>  */}
      </View>
      </Card>
      
    )

    const renderItem = (info) => (

      <FolderComponent navigate={()=>navigation.navigate('NotesFocused',{ title: info.item.title, subjectID: info.item.id})} title={info.item.title} noteCount={info.item.noteCount} color={theme['color-primary-300']}/>
      


    );


    const renderEmpty = () => (

      <Card onPress={()=>navigation.navigate('AddSubject')} style={{marginTop:12, paddingBottom:40,borderWidth:0.3}}>
      <View style={{alignItems:'center'}}>
      <Image
          style={{
            height:120,
            width: 400,
            marginBottom:40,
            marginTop:-16,
          }}
          source={require('../assets/images/addafolder.png')}
      />
      
      <Text style={{textAlign:'center', color:theme['color-primary-800'], fontSize:18, fontWeight:'bold', letterSpacing:0.5}} >Add Your Own Folder</Text>
      <Text style={{marginTop:12,letterSpacing:0.2,color:theme['color-basic-600'], textAlign:'center', fontSize:14}}>Add a folder to better organize your notes</Text>
      </View>
      </Card>
    )


   
    const renderHeader = () => (
        
    <View>
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
    <TopHeader title={'Notes'}/>
    <View style={{flexDirection:'row'}}>
    <Button  onPress={()=>navigation.navigate('AddNotes')} size='large' accessoryLeft={EditIcon} appearance='ghost'></Button>
    <Button  onPress={()=>navigation.navigate('AddSubject')} size='large' accessoryLeft={FolderIcon} appearance='ghost'></Button>
    </View> 
    </View>
    
    <FolderComponent 
    navigate={()=>navigation.navigate('GlobalNotes')} 
    title={"All Notes"} 
    noteCount={userData.totalNotes} 
    color={theme['color-info-200']}/>
    </View>

    );
 
    
 
    
    
    useEffect(() => {

        const ref = firestore().collection('Users').doc(userID).collection('Subjects')
        return ref.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { title, timeStamp, noteCount } = doc.data();
            list.push({
              id: doc.id,
              title,
              timeStamp,
              noteCount
            
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
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../AuthContext'
import { Formik } from 'formik';
import { Card, List, Text, Button, Icon, Modal, Input, Layout, useTheme,  TopNavigationAction, } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { UserDataContext } from '../UserDataContext'
import * as Yup from 'yup';
import { addSubject } from '../helperFunctions';


const EditIcon = (props) => (
  <Icon {...props} height={27} width={27}  name='edit-2-outline'/>
);


const FolderIcon = (props) => (
  <Icon {...props} height={27} width={27}  name='folder-add-outline'/>
);

const FolderTitleSchema = Yup.object().shape({
  folderTitle: Yup.string()
    .min(1, 'Too Short!')
    .max(80, 'Maximum 80 characters for folder title')
    .required('Folder Title Required'),

})

function NotesHome({ navigation }){
    
 
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const theme = useTheme()
    const userData = useContext(UserDataContext)

    const [ loading, setLoading ] = useState(true);
    const [ subjects, setSubjects ] = useState([]);
    const [ visible, setVisible ] = useState(false);


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
        multiline={true}
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



    const FolderComponent = (props) => (
      <Card onPress={props.navigate} style={styles.item}>
      <View style={{flexDirection:'row', alignItems:'center',}}>
      <View>
      <Icon fill={props.color} width={26} height={26} style={{marginRight:12}} name='folder'/> 
      </View>
      <View style={{flex:1}}>
      <Text category='s2' style={{lineHeight:22, flexShrink:1, letterSpacing:0.1}}>{props.title}</Text>
      </View>
      <View style={{paddingLeft:16}}>
      <Text style={{fontSize:12, fontWeight:'bold', color:theme['color-basic-700']}}>{props.noteCount}</Text>
      </View>
      </View>
      </Card>
      
    )

    const renderItem = (info) => (

      <FolderComponent navigate={()=>navigation.navigate('NotesFocused',{ title: info.item.title, subjectID: info.item.id})} title={info.item.title} noteCount={info.item.noteCount} color={theme['color-primary-300']}/>
      
    );


    const renderEmpty = () => (

      <Card onPress={()=>setVisible(true)} style={{marginTop:12, paddingBottom:40,borderWidth:0, borderRadius:12}}>
      <View style={{alignItems:'center'}}>
      <Image
          style={{
            height:180,
            width: 400,
            marginBottom:40,
            marginTop:-16,
          }}
          source={require('../assets/images/addafolder.png')}
      />
      
      <Text style={{textAlign:'center', color:theme['color-primary-800'], fontSize:18, fontWeight:'bold', letterSpacing:0.5}} >Add Your Own Folder</Text>
      <Text style={{marginTop:12,letterSpacing:0.2,color:theme['color-basic-700'], textAlign:'center', fontSize:14}}>Add a folder to better organize your notes</Text>
      </View>
      </Card>
    )


  const renderRightAcessory = () => (
    <View style={{flexDirection:'row', marginRight:8}}>
    <TopNavigationAction style={{marginRight:16}} onPress={()=>navigation.navigate('AddNotes')} icon={EditIcon}/>
    <TopNavigationAction  onPress={()=>setVisible(true)} icon={FolderIcon}/>
    </View>
  )


   
    const renderHeader = () => (
        
    <View>
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
      <TopHeader title={'Notes'} rightAccessory={renderRightAcessory}/>
      <List
         showsVerticalScrollIndicator={false}
         contentContainerStyle={styles.contentContainer}
         data={subjects}
         renderItem={renderItem}
         ListEmptyComponent={renderEmpty}
         ListHeaderComponent={renderHeader}
         />

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          >
       <StatefulModalContent/>
       </Modal>
    
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
    marginVertical:8,
    marginHorizontal:20,
    paddingBottom:100,
    borderColor:'red',
    
  },
  
  item: {


    marginVertical:4,
    paddingHorizontal:4,
    paddingVertical:4,
    borderWidth:0,
    borderRadius:12
  
   
  },

});
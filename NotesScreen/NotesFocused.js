import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image, Dimensions, TouchableOpacity, Platform } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, useTheme, TopNavigationAction } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { deleteSubject } from '../helperFunctions';

const TrashIcon = (props) => (
  <Icon {...props} width={20} height={20} name='trash-outline' />
);

const SearchIcon = (props) => (
  <Icon {...props} width={16} height={16} name='search-outline' />
);


const SearchIconLarge = (props) => (
  <Icon {...props} width={22} height={22} name='search-outline' />
);



function NotesFocused({ route, navigation }){

    const screenWidth = Dimensions.get('window').width
    const theme = useTheme()
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const { subjectID } = route.params
    const { title } = route.params
    const [ loading, setLoading ] = useState(true);
    const [ notes, setNotes ] = useState([]);
    const [ filteredNotes, setFilteredNotes ] = useState([]);
    const [ searchVisible, setSearchVisible ] = useState(false)
    const [ visible, setVisible ] = useState(false)
    const [ value, setValue ] = useState('');

    const StatefulModalContent = () => {
      const [inputValue, setInputValue] = React.useState();
      const [deleteConfirm, setDeleteConfirm] = React.useState();
      const deleteSubjectFunction = ( user, subjectID ) => {

        if(inputValue == 'Delete'){
          deleteSubject(user, subjectID)
          setDeleteConfirm(true)
        } 

      }
  
      if(deleteConfirm){
        return (
          <Layout style={{flex:1, paddingTop:20, paddingHorizontal:20, borderRadius:12}}>
          <View>
          <Text category='s1' style={{textAlign:'center', marginBottom:4, paddingVertical:20}}>Folder Removed</Text>
          </View>
        
          <View style={{ borderTopWidth:0.5, borderTopColor:theme['color-basic-400'],height:50, marginHorizontal:-20, borderBottomRightRadius:12, borderBottomLeftRadius:12, width:300, justifyContent:'center', marginTop:16}}>
          <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
        
          <TouchableOpacity  onPress={()=>navigation.goBack()} style={{flex:1, height:50, justifyContent:'center', alignItems:'center'}}>
          <Text category='s1' style={{color:theme['color-info-500']}}>Back</Text>
          </TouchableOpacity>
          </View>
          </View>
  
          </Layout>
        );
      }

      return (
        <Layout style={{flex:1, paddingTop:20, paddingHorizontal:20, borderRadius:12, marginBottom:300}}>
        <View>
        <Text category='s1' style={{textAlign:'center', marginBottom:4}}>Remove Folder</Text>
        <Text category='p2' style={{textAlign:'center', marginBottom:20}}>Enter 'Delete' to remove this folder</Text>
        </View>
        <Input value={inputValue} onChangeText={setInputValue} />
      
        <View style={{ borderTopWidth:0.5, borderTopColor:theme['color-basic-400'],height:50, marginHorizontal:-20, borderBottomRightRadius:12, borderBottomLeftRadius:12, width:300, justifyContent:'center', marginTop:16}}>
        <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>

        <TouchableOpacity onPress={()=>setVisible(false)} style={{flex:1, height:50, borderRightWidth:0.5, borderRightColor:theme['color-basic-400'], justifyContent:'center' }}>
        <Text category='s1' style={{textAlign:"center", color:theme['color-info-500']}}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=> deleteSubjectFunction(userID, subjectID)} style={{flex:1, height:50, justifyContent:'center'}}>
        <Text category='s1' style={{textAlign:"center", color:theme['color-danger-600']}}>Delete</Text>
        </TouchableOpacity>
        </View>
        </View>
        </Layout>
      );
    };

   

    const textInputChange = (input) => {
      
      if(input != ''){
      const regexp = new RegExp(input, 'i')
      const result = notes.filter(x => regexp.test(x.textTheme) && x.textTheme != null)
      setFilteredNotes(result)
      setValue(input)
      } else {
        setFilteredNotes(notes)
        setValue(input)
      }
    }
 

    const renderItem = (info) => (
      
      <View style={styles.item}>
      <Text category='c1' style={{marginBottom:8, color:theme['text-hint-color']}}>{format(new Date(info.item.timeStamp.toDate()), 'MMM d yyyy')}</Text>
      {info.item.textTheme != null && <Text category='s1' style={{marginBottom:8}}>{info.item.textTheme}</Text>}
      <Text category='p2' style={{lineHeight:22}} >{info.item.text}</Text>
      </View>
      

    );

    const renderRightAcessory = () => (
      <View style={{flexDirection:'row', marginRight:8 }}>
     
      <TopNavigationAction style={{marginRight:16}} onPress={()=>setVisible(true)} icon={TrashIcon}/>
      <TopNavigationAction onPress={()=>setSearchVisible(!searchVisible)} icon={SearchIconLarge}/>

      </View>
    )
  

    const renderRightAcessoryNoSearch = () => (
      <View style={{marginRight:8}}>
      <TopNavigationAction onPress={()=>setVisible(true)} icon={TrashIcon}/>
      </View>
    )
  


    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes').where('subject', '==', subjectID).orderBy('timeStamp','desc')
        return ref.onSnapshot(querySnapshot => {
          if(!querySnapshot.metadata.hasPendingWrites){
          const list = [];
          querySnapshot.forEach(doc => {
      
            const { text, timeStamp, textTheme } = doc.data();

            list.push({
              id: doc.id,
              text,
              timeStamp,
              textTheme,
            
            });
          });
      
          setNotes(list);
          setFilteredNotes(list)
    
          if (loading) {
            setLoading(false);
          }

          }

        });
      }, []);
    
    if (loading) {
        return null; 
    }


    if(notes.length == 0){
      return(   
      <SafeAreaView style={{flex: 1}}>
      <TopHeader title={title} rightAccessory={renderRightAcessoryNoSearch}/>
      <View style={{paddingHorizontal:20, paddingTop:12, flex:1}}>
      <View style={{flex: 1,alignItems:'center',justifyContent:'center', marginBottom:100}}>
      <Image
        style={{width: screenWidth-64, height: 200,}}
        source={require('../assets/images/notesempty.png')}
      
      />
      <Text category='h6' style={{textAlign:'center', marginTop:32}}>Nothing here yet...</Text>
      <Text style={{textAlign:'center', marginTop:32, lineHeight: 28, marginHorizontal:12, fontSize:15, fontFamily:'Poppins-Regular'}}>Press the
      <Icon fill={theme['color-primary-700']} style={{marginHorizontal:4, paddingTop:20,  marginBottom:Platform.OS == 'ios' ? 0 :-5}} width={24} height={24} name='folder' /> 
      icon when writing a note to select a folder.</Text>
      </View>
      </View>
      <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          >
       <StatefulModalContent/>
       </Modal>
      </SafeAreaView>
      )
    }
  

    return (


      <SafeAreaView style={{flex: 1}}>
      <TopHeader title={title} rightAccessory={renderRightAcessory}/>
      <View style={{paddingHorizontal:20, paddingTop:12, flex:1}}>
      <View>
      {searchVisible &&
      <Input
            placeholder='Search tags'
            value={value}
            accessoryLeft={SearchIcon}
            onChangeText={nextValue => textInputChange(nextValue)}
          />
      }
      </View>
      
      
     
      <List
         style={styles.container}
         contentContainerStyle={styles.contentContainer}
         data={filteredNotes}
         renderItem={renderItem}
         showsVerticalScrollIndicator={false}
         />
 
        </View>
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

export default NotesFocused

const styles = StyleSheet.create({
  
  backdrop:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  contentContainer: {
    paddingTop:12,
    paddingBottom:80,
      
  },

  container:{
  
  },

  
  item: {
    paddingTop:8,
    paddingHorizontal:4,
    paddingBottom:40,
   
  },

});
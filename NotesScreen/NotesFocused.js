import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, useTheme } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { useNavigation } from '@react-navigation/native';
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
    const [ value, setValue ] = useState('');


    const textInputChange = (input) => {
      
      if(input != ''){
      const regexp = new RegExp(input, 'i')
      const result = notes.filter(x => regexp.test(x.textTheme) && x.textTheme != null)
      console.log(input, result)
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
      <View style={{paddingHorizontal:20, paddingTop:12, flex:1}}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
      <TopHeader title={title}/>
      <Button style={{marginRight:-12}} status='basic' size='small' appearance='ghost' accessoryLeft={TrashIcon} onPress={()=>navigation.navigate('DeleteFolder',{folderID:subjectID})}></Button>
      </View>
      <View style={{flex: 1,alignItems:'center',justifyContent:'center', marginBottom:100}}>
      <Image
        style={{width: screenWidth-64, height: 200, resizeMode:'contain'}}
        source={require('../assets/images/notesempty.png')}
      
      />
      <Text style={{textAlign:'center', marginTop:32,  fontSize:20, fontFamily:'OpenSans-Bold',letterSpacing:0.1}}>You dont have any notes yet</Text>
      <Text style={{textAlign:'center', marginTop:32, fontFamily:'OpenSans-SemiBold'}}>Notes for <Text style={{fontWeight:'bold', fontSize:16}}>{title}</Text> will be stored here</Text>
      </View>
      </View>
      </SafeAreaView>
      )
    }
  

    return (


      <SafeAreaView style={{flex: 1, paddingHorizontal:20, paddingTop:8}}>
      <View style={{paddingHorizontal:20, paddingTop:12, flex:1}}>
      <View>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', }}>
      <TopHeader title={title}/>
      <View style={{flexDirection:'row'}}>
      <Button style={{marginRight:-12}} status='basic' size='small' appearance='ghost' accessoryLeft={TrashIcon} onPress={()=>navigation.navigate('DeleteFolder',{folderID:subjectID})}></Button>
      <Button style={{marginRight:-12}} status='basic' size='small' appearance='ghost' accessoryLeft={SearchIconLarge} onPress={()=>setSearchVisible(!searchVisible)}></Button>
      </View>
      </View>
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
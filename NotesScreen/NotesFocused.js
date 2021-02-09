import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native'
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


function NotesFocused({ route, navigation }){
    
    const theme = useTheme()
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
  
    const { subjectID } = route.params
    const { title } = route.params
    const [ loading, setLoading ] = useState(true);
    const [ notes, setNotes ] = useState([]);
    const [ filteredNotes, setFilteredNotes ] = useState([]);
    const [ visible, setVisible ] = useState(false)
    const [ searchVisible, setSearchVisible ] = useState(false)
    const [ visibleConfirm, setVisibleConfirm ] = useState(false)
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





    const StatefulModalContent = (props) => {
      const [inputValue, setInputValue] = React.useState();
      
      const deleteSubjectFunction = ( userID, subjectID ) => {

        if(inputValue == 'Delete'){
          deleteSubject(userID, subjectID)
          setVisible(false)
          setVisibleConfirm(true)
        } else {


        }

      }
      
      return (
        <Layout style={styles.modalContent}>
         
        <Input value={inputValue} onChangeText={setInputValue} />
        <View style={{flexDirection:'row', marginTop:20,marginBottom:8}}>
        <Button status='danger' style={{marginRight:12}} onPress={()=> deleteSubjectFunction(userID, subjectID)}>
        Delete
        </Button>
       
        <Button appearance='outline' onPress={()=>setVisible(false)}>
        Close
        </Button>
        </View>
          
        </Layout>
      );
    };


   
    /* const renderHeader = () => (
        

      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
      <TopHeader title={title}/>
      <Button style={{marginRight:-12}} status='basic' size='small' appearance='ghost' accessoryLeft={TrashIcon} onPress={()=>setVisible(true)}></Button>
      </View>

    ); */
 
    
  
 
    
    
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
      <SafeAreaView style={{flex: 1, paddingHorizontal:20, paddingTop:12}}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
      <TopHeader title={title}/>
      <Button style={{marginRight:-12}} status='basic' size='small' appearance='ghost' accessoryLeft={TrashIcon} onPress={()=>setVisible(true)}></Button>
      </View>
      <View style={{flex: 1,alignItems:'center',justifyContent:'center', paddingBottom:60}}>
      <Image
        style={{width: 380, height: 200, resizeMode:'contain',}}
        source={require('../assets/images/notesempty.png')}
      
      />

      <Text style={{textAlign:'center', marginTop:40, fontSize:15}}>Notes for <Text style={{fontWeight:'bold', fontSize:16}}>{title}</Text> will be stored here</Text>

      </View>
      </SafeAreaView>
      )
    }
  

    return (


      <SafeAreaView style={{flex: 1, paddingHorizontal:20, paddingTop:8}}>

      <View>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', }}>
      <TopHeader title={title}/>
      <Button style={{marginRight:-12}} status='basic' size='small' appearance='ghost' accessoryLeft={TrashIcon} onPress={()=>setVisible(true)}></Button>
      
      </View>
      {searchVisible &&
      <Input
            placeholder='Search themes'
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

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          >
          <Card style={{marginHorizontal:40}} disabled={true}>
          <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text style={{marginVertical:12, textAlign:'center'}}>Delete this subject?</Text> 
          <Text style={{marginBottom:20 ,textAlign:'center'}}>All notes will be lost and cannot be recovered</Text>
          <Text style={{  marginBottom:12 }}>Type Delete to confirm</Text>  
          <StatefulModalContent/>
          
        </View>
        </Card>
        </Modal>   

        <Modal
          visible={visibleConfirm}
          backdropStyle={styles.backdrop}
          >
        <Card style={{marginHorizontal:40}} disabled={true}>
          
        <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={{marginVertical:12, textAlign:'center'}}>Subject Deleted.</Text> 
        <Button onPress={()=> navigation.navigate('Home')}>
          Close
        </Button>
          
        </View>
        </Card>
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
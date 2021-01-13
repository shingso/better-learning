import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout, Divider } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { useNavigation } from '@react-navigation/native';
import { deleteSubject } from '../helperFunctions';

const TrashIcon = (props) => (
  <Icon {...props} width={20} height={20} name='trash-2-outline' />
);


function NotesFocused({ route, navigation }){
    
 
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
  
    const { subjectID } = route.params
    const { title } = route.params
    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    const [ visible, setVisible ] = useState(false)
    const [ visibleConfirm, setVisibleConfirm ] = useState(false)
    const [ value, setValue ] = React.useState('');

    const renderItem = (info) => (
      
      <View style={styles.item}>
      <Text category='label' style={{marginBottom:8, fontSize:10}} appearance='hint'>{format(new Date(info.item.timeStamp.toDate()), 'MMM d yyyy')}</Text>
      {info.item.textTheme != null && <Text category='s1' style={{fontWeight:'bold', marginBottom:8}}>{info.item.textTheme}</Text>}
      <Text style={{lineHeight:22}} >{info.item.text}</Text>
      </View>
      

    );


    const renderEmpty = () => (

      <View style={{flex: 1,alignItems:'center', marginTop:60,justifyContent:'center',padding:16}}>
      
      <Image
        style={{width: 650, height: 250, resizeMode:'contain'}}
        source={require('../assets/images/notesv1.png')}
      
      />

      <Text style={{textAlign:'center', marginTop:40}}>Your notes for <Text category='s1'>{title}</Text> will be organized here.</Text>
      <Text style={{textAlign:'center', marginTop:20}}>If you come up with thoughts write it down, typing it out will reinforce the idea in our heads</Text>

     
      </View>
      
    )



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


   
    const renderHeader = () => (
        
      <View style={{marginBottom:12}}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <TopHeader/>
      <View style={{flexDirection:'row'}}>
      
      <Button style={{marginRight:-12}} status='basic' size='small' appearance='ghost' accessoryLeft={TrashIcon} onPress={()=>setVisible(true)}></Button>
      </View>
      </View>
      <Text style={{marginTop:12, fontWeight:'bold'}} category='h6'>{title}</Text>
      </View>
    );
 
    
 
    
    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes').where('subject', '==', subjectID)
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
      
          setTodos(list);
    
          if (loading) {
            setLoading(false);
          }

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
         data={todos}
         renderItem={renderItem}
         ListEmptyComponent={renderEmpty}
         ListHeaderComponent={renderHeader}
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
    marginVertical:12,
    marginHorizontal:20,
    paddingBottom:100,
    borderColor:'red',
    
  },

  container:{
  
  },

 
  
  item: {
    paddingVertical:32,
   
  },

});
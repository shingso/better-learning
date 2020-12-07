import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { Card, List, Text, Button, Icon, Modal, Input, Layout } from '@ui-kitten/components';
import Empty from '../UtilComponents/EmptyList'
import TopHeader from '../UtilComponents/TopHeader'
import { useNavigation } from '@react-navigation/native';
import { deleteSubject } from '../helperFunctions';

const TrashIcon = (props) => (
  <Icon {...props} width={20} height={20} name='trash-2-outline' />
);

const EditIcon = (props) => (
  <Icon {...props} width={20} height={20} name='edit-outline'/>
);


function NotesFocused({ route, navigation }){
    
 
    const user = useContext(AuthContext)
    const userID = user.uid
  
    const { subjectID } = route.params
    const { title } = route.params
    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    const [ visible, setVisible ] = useState(false)
    const [ visibleConfirm, setVisibleConfirm ] = useState(false)
    const [ value, setValue ] = React.useState('');

    const renderItem = (info) => (
      
      <View style={styles.item}>
      <View>
      <Text style={{marginBottom:12}} category='label'>{format(new Date(info.item.timeStamp.toDate()), 'MMMM do yyyy')}</Text>
      <Text>{info.item.text}</Text>
      </View>
      </View>
    );



    const StatefulModalContent = (props) => {
      const [inputValue, setInputValue] = React.useState();
      
      const deleteSubjectFunction = ( user, subjectID ) => {

        if(inputValue == 'Delete'){
          deleteSubject(user, subjectID)
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
        
      <View>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <TopHeader/>
      <View style={{flexDirection:'row'}}>
      <Button accessoryLeft={EditIcon} style={{marginRight:16}} appearance='ghost' onPress={()=>navigation.navigate('AddNotes', { subjectID: subjectID, mode:'ADD'})}/>
      <Button style={{marginRight:-12}} size='small' appearance='ghost' accessoryLeft={TrashIcon} onPress={()=>setVisible(true)}></Button>
      </View>
      </View>
      <Text style={{marginTop:12}} category='s1'>{title}</Text>
      </View>
    );
 
    
 
    
    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('NotesCollection').doc(subjectID).collection('Notes')
        return ref.orderBy("timeStamp", "asc").onSnapshot(querySnapshot => {
          if(!querySnapshot.metadata.hasPendingWrites){
          const list = [];
          querySnapshot.forEach(doc => {


            const { text, timeStamp } = doc.data();

            list.push({
              id: doc.id,
              text,
              timeStamp
            
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
         ListEmptyComponent={<Empty message={'Your notes will be placed here'}/>}
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
    marginVertical:8,
    marginHorizontal:16,
    flexGrow: 1
  },
  
  
  item: {
    marginVertical:20
  },

});
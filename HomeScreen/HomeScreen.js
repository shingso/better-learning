import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Divider } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import ProgressHeader from '../UtilComponents/ProgressHeader'
import { format, formatDistance } from 'date-fns'


const PlayIcon = (props) => (
  <Icon {...props} height={30} width={30} name='play-circle-outline'/>
);
  

const BookIcon = (props) => (
  <Icon {...props} name='book-outline'/>
);

function HomeScreen(){

    const user = useContext(AuthContext)
    const userID = user.uid
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(true);
    const [ todos, setTodos ] = useState([]);
    
    
    const renderListFooter = () => (

      <View style={{alignItems:'flex-start'}}> 
      <Button style={{marginVertical:12}} onPress={()=>navigation.navigate('AddSubject')}>
      Add A Subject to Study
      </Button>
      </View>

  );

     
  const renderWelcome = () => (
      
    <View style={{marginBottom:20, justifyContent:'space-between'}}>
      
    <Text category='h1'>Welcome!</Text>
    <Text category='s1' style={{marginVertical:20}}>Get started by learning a better way to learn</Text>
    <Card style={{marginBottom:16}}>
    <ImageBackground opacity={0.2} resizeMode='cover'  source={require('../assets/images/8600.5.png')} style={styles.image}>
    <Text style={{marginBottom:8}} category='s1'>What is Learning?</Text>
    <Text>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</Text>
    </ImageBackground>
    </Card>

    <Card style={{marginVertical:8, marginBottom:28}}>
    <ImageBackground opacity={0.2} resizeMode='cover'  source={require('../assets/images/8600.5.png')} style={styles.image}>
    <Text style={{marginBottom:8}} category='s1'>How should I be learning?</Text>
    <Text>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</Text>
    </ImageBackground>
    </Card>

    <Card style={{marginBottom:28}}>
    <ImageBackground opacity={0.2} resizeMode='cover' source={require('../assets/images/8600.5.png')} style={styles.image}>
    <Text style={{marginBottom:8}} category='s1'>Want to know more?</Text>
    <Text>Duis aute irure dolor in reprehenderit</Text>

    </ImageBackground>
    </Card>
    <Text category='s1'>When youre ready to start your studying journey...</Text>
    </View>
  );
  
  //<Text category='h1'>Home</Text>
  const renderHeader = () => (

    <View style={{marginTop:12, marginBottom:12}}>
    <ProgressHeader messageNumber={1}/>
    </View>

  );

/*   <Button accessoryLeft={EditIcon} style={{marginRight:16}} appearance={'outline'} onPress={()=>navigation.navigate('AddNotes', {id:info.item.id, mode:'ADD'})}/> */

    const renderItem = (info) => (
      
      <Card
        style={styles.item}
        disabled={true}
      >

      <View style={{ justifyContent:'space-between' }}>
      <View>
      <Text category='s1'>{info.item.title}</Text>
      {info.item.timeStamp != null && <Text category='label'> Last Studed: {formatDistance(new Date(info.item.timeStamp.toDate()), new Date())} ago</Text>}
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:24, }}>
      <Button accessoryLeft={BookIcon} style={{marginRight:16}} appearance={'outline'} onPress={()=>navigation.navigate('NotesFocused', {id:info.item.id, title:info.item.title})}/>
   
      <Button accessoryLeft={PlayIcon} size={'small'}  style={{width:'70%'}} onPress={()=>navigation.navigate('SetTimer', {id:info.item.id})}/>
    
      </View>
      
      </View>
      </Card>
    );
    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('NotesCollection')

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
  
          setTodos(list);
    
          if (loading) {
            setLoading(false);
          }
        });
      }, []);
    
    if (loading) {
        return null; 
    }

  

    return (
    <ImageBackground source={require('../assets/images/5294.2.png')} style={{ flex:1 }}>
    <SafeAreaView style={{flex: 1}}>
   
    <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={todos}
        renderItem={renderItem}
        ListFooterComponent={renderListFooter}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderWelcome}
        />
 
    </SafeAreaView>
    </ImageBackground>
      
    );

      //we need to update state when we add an item
    
    }


const styles = StyleSheet.create({
  item: {

    marginVertical:8,
  
    
  },
  //contanier that holds everything 
  contentContainer: {

    paddingHorizontal: 20,
    paddingVertical: 12,
    flexGrow:1,

  },
  
  container:{
    opacity:0.95
  },
  image: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "flex-end",
  
    margin:-24,
    padding:24
  },
});

export default HomeScreen


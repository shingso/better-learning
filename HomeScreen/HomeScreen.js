import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import ProgressHeader from '../UtilComponents/ProgressHeader'
import { format, formatDistance } from 'date-fns'



const PlayIcon = (props) => (
  <Icon {...props} height={40} width={40} name='play-circle'/>
);
  

const BookIcon = (props) => (
  <Icon {...props} name='book-outline'/>
);

const PlusIcon = (props) => (
  <Icon {...props} height={28} width={28}  name='plus-outline'/>
);



function HomeScreen(){

    const user = useContext(AuthContext)
    const userID = user.uid
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(true);
    const [ subjects, setSubjects ] = useState([]);   
    const [ currentSubject, setCurrentSubject ] = useState(null);   
    const [ currentSubjectID, setCurrentSubjectID ] = useState(null);   

  
    const renderListFooter = () => (

      <View style={{alignItems:'flex-start', marginBottom:128}}> 
      {/* <Button  style={{marginVertical:12, width:64, height:64, borderRadius:32, }} accessoryRight={PlusIcon} onPress={()=>navigation.navigate('AddSubject')} /> */}
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
  

  const renderHeader = () => (

    <View >
{/*     <ProgressHeader messageNumber={1}/> */}

  
  
   

    </View>

    

  );

  const setCurrentItemInfo = (title, id) => {
    setCurrentSubject(title)
    setCurrentSubjectID(id)
  }


    const renderItem = (info) => (
     
      <Card
        style={{backgroundColor: info.item.title == currentSubject ? '#F0FDE3' : '#FFFFFF', marginVertical:8 }}
        onPress={()=>{setCurrentItemInfo(info.item.title, info.item.id)}}
      >

      <View style={{ justifyContent:'space-between', flexDirection:'row'}}>
      <View style={{flex:10}}>
      <Text category='s1'>{info.item.title}</Text>
      {info.item.lastStudied != null && <Text style={{fontSize:10}}>Last Studed: {formatDistance(new Date(info.item.lastStudied.toDate()), new Date())} ago</Text>}
      </View>

    

      <View style={{flex:1}}>
      <Button accessoryLeft={BookIcon} style={{ height:42}} appearance={'outline'} onPress={()=>navigation.navigate('NotesFocused', {subjectID :info.item.id, title:info.item.title})}/>
    
      </View> 
      
      </View>
      </Card>
    );

    
    
    useEffect(() => {

        const ref = firestore().collection('Users').doc(userID).collection('NotesCollection')
        return ref.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { title, timeStamp, lastStudied } = doc.data();
            list.push({
              id: doc.id,
              title,
              timeStamp,
              lastStudied
            });
          });
  
          setSubjects(list);
          setCurrentSubject(list[0].title)
          
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
    
    <Layout level='2' style={{padding:16}}>
    <ProgressHeader messageNumber={1}/>
    <Card style={{marginTop:12, backgroundColor:'white', borderWidth:1.5, borderColor:'#80D86A'}} onPress={()=>navigation.navigate('SetTimer', {subjectID :currentSubjectID})}>
    <View style={{flexDirection:'row', alignItems:'center'}}>
    <Icon style={{marginRight:12}} fill='#14671C' width={50} height={50} name='play-circle' />
    <View style={{flexDirection:'column', flex:1}}>
    <Text style={{fontWeight:'bold', fontSize:15}} category='label'>Start a study session for:</Text>
    <Text style={{flexWrap:'wrap'}}>{currentSubject}</Text>
    </View>
    </View>
    </Card>
    </Layout>

    <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={subjects}
        renderItem={renderItem}
        ListFooterComponent={renderListFooter}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderWelcome}
        />
    <Button  style={{marginVertical:12, width:64, height:64, borderRadius:32,position: 'absolute', bottom: 20,                                                    
    right: 20, zIndex:5 }} accessoryRight={PlusIcon} onPress={()=>navigation.navigate('AddSubject')} />
    </SafeAreaView>
  
      
    );

      //we need to update state when we add an item
    
    }


const styles = StyleSheet.create({
  item: {

    marginBottom:8,
  
    
  },
  //contanier that holds everything 
  contentContainer: {

    paddingHorizontal: 16,

   

  },
  
  container:{
 
    flex:1
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


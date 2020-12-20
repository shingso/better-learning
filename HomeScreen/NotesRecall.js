import React, { useState, useEffect, useContext } from 'react';
import { TextInput, View, SafeAreaView, Dimensions, FlatList, StyleSheet, ImageBackground } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Card, List, Text, Button, Icon, Layout, Input, useTheme } from '@ui-kitten/components';
import { AuthContext } from '../AuthContext'
import ProgressHeader from '../UtilComponents/ProgressHeader'
import { format, formatDistance } from 'date-fns'
import Swiper from 'react-native-swiper'




function NotesRecall(){
    const theme = useTheme();

    const selectRandomToShow = (list) => {
      let currentList = list
    
      let numberToSelect = 0
      const randomList = []
      //const randomDict = [{text:'hello', one:'two'}, {text:'helso', one:'two'}, {text:'hell', one:'two'}]
      //select a random number in the length of the array
      //remove that element and add the text and ID to a 
      //need to map objects to a swiper
    
      /* for(var x in [0,1]){
      let currentRandomNumber = Math.random() * currentList.length
      let currentRandomNumberRounded = Math.floor(currentRandomNumber)
      
      let newList = currentList.splice(currentRandomNumberRounded,1)
      
      console.log(newList)
      randomList.push(newList)
      } */
      
    
      //allow the user to look at one of the notes and add an additonal note if they want 
    
      //map the elements into a array object
    
      //Dont show this note again
      //Skip all in general
    
      const listItems = list.map((item) =>
      <View key={item.id}>
      <Text style={styles.listItem}>{item.text}</Text>
    
      </View>
      );
    
      return(
        <View style={{height:180, padding:20, }}>
        <Swiper  activeDotColor={theme['color-primary-default']} index={0}>
        {listItems}
        </Swiper>
        </View>
      )
    
    }

    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const navigation = useNavigation();
    const [ loading, setLoading ] = useState(true);
    const [ notes, setNotes ] = useState([]);   
    const [ currentSubject, setCurrentSubject ] = useState(null);   
    const [ currentSubjectID, setCurrentSubjectID ] = useState(null);   

    const [value, setValue] = React.useState('');
    
    useEffect(() => {

        const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes')
        return ref.onSnapshot(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const { text } = doc.data();
            list.push({

              id: doc.id,
              text,

            });
          });
  
        setNotes(list);

   
          if (loading) {
            setLoading(false);
          }

          
          

        });
      }, []);
    
    if (loading) {
        return null; 
    }

    return (

      
    <Layout style={{flex: 1, padding:16}}>
    <SafeAreaView>
    <Text style={{marginBottom:20}}>Review this</Text>
    {selectRandomToShow(notes)}
    <Input
      style={{marginTop:40, marginBottom:20,marginTop:20, backgroundColor:'white', borderColor:'white', borderWidth:0}}
      autoFocus={true}
      multiline={true}
      textStyle={{height:80}}
      
      placeholder='Write anything thoughts you have about the notes. Any new thoughts or new things learned?'
      value={value}
      onChangeText={nextValue => setValue(nextValue)}
    />
    <Button style={{marginHorizontal:20}} disabled={value == '' ? true : false}/>
    </SafeAreaView>
    </Layout>
      
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

  listItem:{
    lineHeight:24,
    textAlign:'center'
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

export default NotesRecall


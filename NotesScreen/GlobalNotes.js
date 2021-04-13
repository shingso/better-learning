import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns'
import { AuthContext } from '../AuthContext'
import { List, Text, TopNavigationAction, Icon, Input, useTheme } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'

const SearchIconLarge = (props) => (
  <Icon {...props} width={22} height={22} name='search-outline' />
);

const SearchIcon = (props) => (
  <Icon {...props} width={16} height={16} name='search-outline' />
);


function GlobalNotes(){
    
    const theme = useTheme()
    const authContext = useContext(AuthContext)
    const userID = authContext.user.uid
    const [ loading, setLoading ] = useState(true);
    const [ filteredNotes, setFilteredNotes ] = useState([]);
    const [ searchVisible, setSearchVisible ] = useState(false)
    const [ value, setValue ] = useState('');
    const [ notes, setNotes ] = useState([]);
    
    const renderItem = (info) => (
      
      <View style={styles.item}>
      <Text category='label' style={{marginBottom:8, fontSize:10}} appearance='hint'>{format(new Date(info.item.timeStamp.toDate()), 'MMM d yyyy')}</Text>
      {info.item.textTheme != null && <Text category='s1' style={{fontWeight:'bold', marginBottom:8}}>{info.item.textTheme}</Text>}
      <Text style={{lineHeight:22}} >{info.item.text}</Text>
      </View>
      

    );


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
 


    const renderEmpty = () => (


   
   <SafeAreaView style={{flex: 1}}>
   <View style={{paddingHorizontal:20, paddingTop:100, flex:1}}>
   <View style={{flex: 1,alignItems:'center',justifyContent:'center'}}>
   <Image
        style={{width: 300, height: 200,}}
        source={require('../assets/images/notesempty.png')}
      
    />
    <Text category='h6' style={{textAlign:'center', marginTop:32}}>Nothing here yet...</Text>
    <Text style={{textAlign:'center', marginTop:32, lineHeight: 28, marginHorizontal:12, fontSize:15, fontFamily:'Poppins-Regular'}}>You can search notes you write by adding tags</Text>
    </View>
    </View>
  
    </SafeAreaView> 
   
      
    )


    const renderRightAcessory = () => (
      <View style={{flexDirection:'row', marginRight:8 }}>
      <TopNavigationAction onPress={()=>setSearchVisible(!searchVisible)} icon={SearchIconLarge}/>
      </View>
    )




    
    useEffect(() => {
        const ref = firestore().collection('Users').doc(userID).collection('GlobalNotes').orderBy("timeStamp", 'desc')
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

    

    return (
       
      <SafeAreaView style={{flex: 1}}>
      <TopHeader title='All Notes' rightAccessory={renderRightAcessory}/>
      <View style={{paddingHorizontal:20}}>
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
         showsVerticalScrollIndicator={false}
         style={styles.container}
         contentContainerStyle={styles.contentContainer}
         data={filteredNotes}
         renderItem={renderItem}
         ListEmptyComponent={renderEmpty}
         />
       </SafeAreaView>
      
      
      );

      //we need to update state when we add an item
    
    }

export default GlobalNotes

const styles = StyleSheet.create({
  
  

  backdrop:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  contentContainer: {
    
    paddingHorizontal:24,
    paddingBottom:100,
   
    
  },

  container:{
  
  },

 
  
  item: {
    paddingVertical:32,

   
  },

});
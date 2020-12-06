import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Tab, TabView, Text, View, ViewPager, Button  } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'

const Header = (props) => (
  <View {...props}>
    <Text category='s1'>{props.title}</Text>

  </View>
);




function HowToLearn(){

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const options = [

    {
      key: 0,
     
    },
    {
        key: 1,
       
    },
    {
        key: 2,
      
    },

     
];

  const Body = () =>{
    return(
 
      <Layout
        style={{ alignItems:'center', flex:1, paddingTop:12,padding:16}}
        level='2'>
     
      <Text style={{marginBottom:20}} category='h1'>How should I study?</Text>
      <Text style={{paddingHorizontal:16}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</Text>
      <Image
        style={{width: 650,
          height: 300}}
        source={require('../assets/images/studying.png')}
      
      />
           
      <Text style={{marginBottom:20, paddingHorizontal:16}} category='s1'>consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
  
      </Layout>

    )
  }

  return (
    <Layout level='2' style={{flex:1}}>
    <Layout level='2' style={{marginLeft:20, marginTop:8}}>
    <TopHeader/>
    </Layout>
    <ViewPager

      style={{flex:1}}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      
     
  
     <Body/>
      
      <Layout
        style={styles.tab}
        level='2'>
           <Text style={{marginBottom:20}} category='h1'>How should I study?</Text>
      <Text>Any of the following</Text>

      </Layout>
      <Layout
        style={styles.tab}
        level='2'>
           <Text style={{marginBottom:20}} category='h1'>How should I study?</Text>
           <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</Text>

      </Layout>
  
    </ViewPager>

    <Layout level='2' style={{flexDirection:'row', alignSelf:'center', marginBottom:28 }}>
				{options.map(item => {
					return (
						<Layout key={item.key} style={styles.buttonContainer}>
						
							<Layout
								style={[styles.circle]}
							
							>
								{selectedIndex === item.key && <Layout style={styles.checkedCircle} />}
							</Layout>
						</Layout>
					);
				})}
		</Layout>

    </Layout>
  );
};




const styles = StyleSheet.create({
  tab: {
    flex:1,
    alignItems: 'center',
    borderWidth:1,
    

  },

  buttonContainer: {
	
	
    marginHorizontal:6,
    marginVertical:20,
},

  circle: {

    height: 8,
    width: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {

    width: 9,
    height: 9,
    borderRadius: 20,
    backgroundColor:'blue'
  },
});


export default HowToLearn
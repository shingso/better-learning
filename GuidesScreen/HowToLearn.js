import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Tab, TabView, Text, View, ViewPager, Button  } from '@ui-kitten/components';

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


  return (
    <Layout level='2' style={{flex:1}}>
    <ViewPager

      style={{flex:1}}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      
      <Layout
        style={styles.tab}
        level='2'>
        
        <Text category='h5'>USERS</Text>
     
     <Button/>
  
      </Layout>
      
      <Layout
        style={styles.tab}
        level='2'>
        <Text style={{marginTop:12}} category='h5'>ORDERS</Text>
      </Layout>
      <Layout
        style={styles.tab}
        level='2'>
        <Text category='h5'>TRANSACTIONS</Text>
      </Layout>
      <Layout
        style={styles.tab}
        level='2'>
        <Text category='h5'>TRANSACTIONS</Text>
      </Layout>
    </ViewPager>

    <Layout level='2' style={{flexDirection:'row', alignSelf:'center', marginBottom:40 }}>
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

  },

  buttonContainer: {
	
	
    marginHorizontal:6,
    marginVertical:20,
},

  circle: {

    height: 10,
    width: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {

    width: 12,
    height: 12,
    borderRadius: 20,
    backgroundColor:'blue'
  },
});


export default HowToLearn
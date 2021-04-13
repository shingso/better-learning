import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'



function PrivacyPolicy(){

 

return (
   
<Layout level='2' style={{ flex: 1 }}>
<SafeAreaView style={{ flex: 1}}>
<TopHeader title={'Privacy Policy'}/>

<ScrollView showsVerticalScrollIndicator={false} style={{paddingTop:20, paddingHorizontal:20}}>
    

<Text>

{`\t  Study Sesh is a free application which is provided by at no cost and is intended for use as is. This privacy policy is to inform you regarding the collection, use, and disclosure of Personal Information.
    
    By using this app, you hereby agree to the collection and use of information in relation to this policy. The Personal Information that is collected is used for the functionality and improvement of this app. Your information will not be shared with any being except as described in this Privacy Policy.`}
</Text>


<Text style={styles.bodyText}>
{`\t 
   For a better experience while using this application, you may be required to provide us with personally identifiable information. This app does use third party services that may collect information used to identify you.

The third party service providers used by the app include:

Google Play Services,
Google Analytics for Firebase,
Log Data.

Log Data is information that is collection when errors occur in the application. Log Data may include information such as your device's Internet Protocol (“IP”) address, device name, operating system version, time and date information, and various other statistics.`}
</Text>


<Text style={styles.bodyText}>
{`\t  Third-party companies and individuals may be employed to work on this application due to the following reasons:

To facilitate our Service;
To perform Service-related services; or
To assist us in analyzing how our Service is used.

These third parties have access to your Personal Information in order to perform the tasks assigned to them on our behalf. 
However, third parties are obligated not to disclose or misuse the your personal information.`}
</Text>

<Text style={styles.bodyText}>
{`\t  Keeping your information safe and secure is important, and we will strive to follow the best security practices in order to protect any information provided to us. However, due to the nature that information security can never be fully guaranteed,  we also cannot fully guarantee the absolute security of your information.`}
</Text>

<Text style={styles.bodyText}>
{`\t  These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13. In the case that I discover that a child under 13 has provided me with personal information, their information will be promptly removed from our servers and databases. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me.`}
</Text>


<Text style={styles.bodyText}>
We reserve the right to update our Privacy Policy. You are advised to review this page periodically for any changes.
I will notify you of any changes by posting the new Privacy Policy on this page.
</Text>

<Text style={styles.bodyText}>
This policy is effective as of 2021-1-1
</Text>

<Text style={styles.bodyText}>
If you have any questions concerning this Privacy Policy, contact us at studyseshdev@gmail.com.
</Text>


    

</ScrollView>   
</SafeAreaView>
</Layout>
  );
};


export default PrivacyPolicy



const styles = StyleSheet.create({
 
  bodyText: {
    marginBottom:16,
    marginHorizontal:4,

  },

});
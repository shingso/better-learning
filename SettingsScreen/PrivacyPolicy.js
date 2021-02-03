import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import TopHeader from '../UtilComponents/TopHeader'



function PrivacyPolicy(){

 

  return (
   
    <Layout level='2' style={{ flex: 1, padding:16, paddingTop:20, paddingHorizontal:20  }}>
    <SafeAreaView style={{ flex: 1}}>
    <TopHeader title={'Privacy Policy'}/>

    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 20}}>
    
    <Text style={styles.bodyText}>
    Better Learning is a free application which is provided by at no cost and is intended for use as is.
    This privacy policy is used to inform visitors regarding the collection, use, and disclosure of Personal Information.
    If you choose to use this application, you hereby agree to the collection and use of information in relation to this policy. The Personal Information that is collected is used for the functionality and improvement of this application. Your information will not be shared with any being except as described in this Privacy Policy.
    </Text>


    <Text style={styles.bodyText}>
    For a better experience while using this application, you may be required to provide us with personally identifiable information. The information that is requested will be retained on your device and is not collected in any way.
    The app does use third party services that may collect information used to identify you.
    The third party service providers used by the app are listed below:
    Google Play Services,
    Google Analytics for Firebase,
    Log Data.

    Log Data is informatiopn that is collection when errors occur in the application. Log Data may include information such as your device's Internet Protocol (“IP”) address, device name, operating system version, time and date information, and various other statistics.
    </Text>


    <Text style={styles.bodyText}>
    Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. Cookies are sent to your 
    browser from the websites that you visit and are stored on your device's internal memory.
    This application does not use “cookies” explicitly. However, this app may use third party code and libraries that use 
    “cookies” to collect information inorder to improve their services.
    </Text>


    <Text style={styles.bodyText}>
    Third-party companies and individuals may be employed to work on this application due to the following reasons:
    To facilitate our Service;
    To provide the Service on our behalf;
    To perform Service-related services; or
    To assist us in analyzing how our Service is used.
    These third parties have access to your Personal Information inorder to perform the tasks assigned to them on our behalf. 
    However, third parties are obligated not to disclose or use the information for any other purposes.
    </Text>


    <Text style={styles.bodyText}>
    I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable
    means of protecting it. However, no method of transmission over the internet, or method of electronic storage 
    is 100% secure and reliable. I cannot fully guarantee its absolute security, but we will work on following the best practices possible.
    </Text>


    <Text style={styles.bodyText}>
    This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. 
    Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy 
    of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices 
    of any third-party sites or services.
    </Text>


    <Text style={styles.bodyText}>
    These Services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information 
    from children under 13. In the case that I discover that a child under 13 has provided me with personal information, I immediately 
    delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal 
    information, please contact me.
    </Text>


    <Text style={styles.bodyText}>
    I may update our Privacy Policy from time to time. You are advised to review this page periodically for any changes.
    I will notify you of any changes by posting the new Privacy Policy on this page.
    </Text>

    <Text style={styles.bodyText}>
    This policy is effective as of 2020-11-1
    </Text>

    <Text style={styles.bodyText}>
    If you have any questions or suggestions about my Privacy Policy, do not hesitate to contact me at betterlearningdev@gmail.com.
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
    lineHeight:24
  },

});
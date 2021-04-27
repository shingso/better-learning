import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { ScrollView } from 'react-native-gesture-handler';



function TermsOfService(){

return (
<SafeAreaView style={{flex: 1}}>
<TopHeader title={'Terms and Conditions'}/>
<ScrollView showsVerticalScrollIndicator={false}>

<Layout level='2' style={{flex: 1, paddingTop:20, paddingHorizontal:20, paddingBottom:60}}>


<Text style={[styles.bodyText, {fontFamily:'Poppins-Bold'}]}>
{`By downloading or using this application, these terms and conditions automatically apply to you. You are obligated to read and understand these terms carefully before using this application. `}
</Text>


<Text style={styles.bodyText}>
{`You are not allowed to copy or modify this application, any parts of this application, or any of its trademarks in any way. You are not allowed to attempt to extract the source code of this application, nor attempt to make derivative versions of this app. This application, all trademarks, copyrights, database rights and other intellectual property rights related to it belong to the developer of this application.`}
</Text>

<Text style={styles.bodyText}>
{`We are committed to ensuring that this app is up to date and has growing functionality. For that reason, we reserve the right, at any time and for any reason, to make changes to the app or to charge for its services. You will be notified about changes to charges for this app or for its services. Charges that you incur through this app will be made clear to you.`}
</Text>


<Text style={styles.bodyText}>
{`The Study Sesh app processes and stores personal information that you have provided. Review our privacy policy for more information on how this app handles personal information.`}
</Text>


<Text style={styles.bodyText}>
{`This app uses third party services that declare their own Terms and Conditions. Please refer to the Terms and Conditions of third party service providers used by this app for more information:

Google Play Services,
Google Analytics for Firebase`}
</Text>

<Text style={styles.bodyText}>
{`An internet connection is required for this application to function. If you are using this app while not on a Wi-Fi connection, be aware that of charges from your mobile provider for the cost of data. You are responsible for any such data charges, including roaming data charges, that you incur from using this app.`}
</Text>

<Text style={styles.bodyText}>
{`We accept no liability for any loss, direct or indirect,  that you experience as a result of relying wholly on the functionality of this app.`}
</Text>

<Text style={styles.bodyText}>
{`This application will be updated from time to time. This app is currently available on Android and iOS – the requirements for both systems(and for any additional systems we decide to extend the availability of the app to) may change, and you may need to download an update for this application to continue to function. We cannot guarantee that this app will always work with the Android and iOS version that you have installed on your device. 

You are obligated to review and accept updates to the application when offered to you. We reserve the right to stop providing this app and service at any time, and may terminate use of it without any advanced notice of termination. Unless stated, upon any termination, (a) the rights and licenses granted to you in these terms will end; (b) you must stop using the app, and (if needed) delete it from your device.`}
</Text>


<Text style={styles.bodyText}>
We may update our Terms and Conditions from time to time. You are advised to review this page 
periodically for any changes. If changes are made to the terms and conditions, we notify you of any changes by posting the a notice on this service or through email.
</Text>


<Text style={styles.bodyText}>
These terms and conditions are effective as of 2021-1-1
</Text>


<Text style={styles.bodyText}>
If you have any questions or suggestions about these Terms and Conditions, contact me at studyseshdev@gmail.com.
</Text>


</Layout>
</ScrollView>   
</SafeAreaView>
  );
};

export default TermsOfService


const styles = StyleSheet.create({

  bodyText: {
    marginBottom:12,
    marginHorizontal:4,
   
  },

});
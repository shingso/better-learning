import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, } from 'react-native';
import { Card, List, Text, Button, Icon, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';
import TopHeader from '../UtilComponents/TopHeader'
import { ScrollView } from 'react-native-gesture-handler';



function OpenSource(){

  return (
   
    <Layout level='2' style={{ flex: 1, padding:16 }}>
    <SafeAreaView style={{ flex: 1}}>
    <TopHeader/>
    <Text style={{marginBottom:20}} category='h2'>Open Source Libraries</Text>
    <ScrollView>
    

    <Text style={styles.bodyText} category='s1'>react-native-ui-kitten</Text>
    <Text style={styles.bodyText}>
    
    <Text style={styles.bodyText}>  
    The MIT License (MIT)
    </Text>
    <Text style={styles.bodyText}>  
    Copyright (c) 2016 akveo.com
    </Text>
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    </Text>


    <Text style={styles.bodyText}>
    I am committed to ensuring that the app is as useful and efficient as possible. For that reason, we reserve 
    the right to make changes to the app or to charge for its services, at any time and for any reason. We will never 
    charge you for the app or its services without making it very clear to you exactly what you’re paying for.
    </Text>


    <Text style={styles.bodyText}>
    The Better Learning app stores and processes personal data that you have provided to us, in order to provide my Service. 
    It’s your responsibility to keep your phone and access to the app secure. We therefore recommend that you do not 
    jailbreak or root your phone, which is the process of removing software restrictions and limitations imposed by the
    official operating system of your device. It could make your phone vulnerable to malware/viruses/malicious programs, 
    compromise your phone’s security features and it could mean that the Better Learning app won’t work properly or at all.
    </Text>


    <Text style={styles.bodyText}>
    The app does use third party services that declare their own Terms and Conditions.
    Please refer to the Terms and Conditions of third party service providers used by this app:
    Google Play Services,
    Google Analytics for Firebase
    </Text>


    <Text style={styles.bodyText}>
    You should be aware that there are certain things that will not take responsibility for. Certain 
    functions of the app will require the app to have an active internet connection. The connection can 
    be Wi-Fi, or provided by your mobile network provider, but cannot take responsibility for the app not 
    working at full functionality if you don’t have access to Wi-Fi, and you don’t have any of your data allowance left.
    </Text>


    <Text style={styles.bodyText}>
    If you’re using the app outside of an area with Wi-Fi, you should remember that your 
    terms of the agreement with your mobile network provider will still apply. As a result, 
    you may be charged by your mobile provider for the cost of data for the duration of the 
    connection while accessing the app, or other third party charges. In using the app, you’re 
    accepting responsibility for any such charges, including roaming data charges if you use the app 
    outside of your home territory (i.e. region or country) without turning off data roaming. If you 
    are not the bill payer for the device on which you’re using the app, please be aware that we assume 
    that you have received permission from the bill payer for using the app.
    </Text>


    <Text style={styles.bodyText}>
    Along the same lines, cannot always take responsibility for the way you use the app i.e. 
    You need to make sure that your device stays charged – if it runs out of battery and you can’t 
    turn it on to avail the Service, cannot accept responsibility.
    </Text>


    <Text style={styles.bodyText}>
    With respect to ’s responsibility for your use of the app, when you’re using the app, 
    it’s important to bear in mind that although we endeavor to ensure that it is updated 
    and correct at all times, we do rely on third parties to provide information to us so 
    that we can make it available to you. accepts no liability for any loss, direct or indirect, 
    you experience as a result of relying wholly on this functionality of the app.
    </Text>


    <Text style={styles.bodyText}>
    At some point, we may wish to update the app. The app is currently available on Android and 
    iOS – the requirements for both systems(and for any additional systems we decide to extend the 
    availability of the app to) may change, and you’ll need to download the updates if you want to 
    keep using the app. does not promise that it will always update the app so that it is relevant 
    to you and/or works with the Android and iOS version that you have installed on your device. 
    However, you promise to always accept updates to the application when offered to you, We may also 
    wish to stop providing the app, and may terminate use of it at any time without giving notice of 
    termination to you. Unless we tell you otherwise, upon any termination, (a) the rights and licenses 
    granted to you in these terms will end; (b) you must stop using the app, and (if needed) 
    delete it from your device.
    </Text>


    <Text style={styles.bodyText}>
    I may update our Terms and Conditions from time to time. Thus, you are advised to review this page 
    periodically for any changes. I will notify you of any changes by posting the new Terms and Conditions on this page.
    </Text>


    <Text style={styles.bodyText}>
    These terms and conditions are effective as of 2020-11-1
    </Text>


    <Text style={styles.bodyText}>
    If you have any questions or suggestions about my Terms and Conditions, 
    do not hesitate to contact me at betterlearningdev@gmail.com.
    </Text>

    </ScrollView>   
    </SafeAreaView>
    </Layout>
  );
};

export default OpenSource


const styles = StyleSheet.create({

  bodyText: {
    marginBottom:12,
    marginHorizontal:4
  },

});
import PushNotification from 'react-native-push-notification';

export default class NotifService {
  constructor() {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
    
    PushNotification.getChannels(function(channels) {
      console.log(channels);
    });
  }

  createDefaultChannels() {

    PushNotification.createChannel(
      {
        channelId: "General", // (required)
        channelName: `Sound channel`, // (required)
        channelDescription: "Used to study notifications", // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        playSound:true,
        soundName:'notificationsound',
        vibrate: false, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel 'sound-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }


  popInitialNotification() {
    PushNotification.popInitialNotification((notification) => console.log('InitialNotication:', notification));
  }


  scheduleNotif(time) {
    this.lastId++;

    let timeConverted = Math.round((time-1000)/60000)

    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + time), // in 30 secs
      /* Android Only Properties */
      channelId: 'General',

      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher_round', // (optional) default: "ic_launcher"
      smallIcon: 'ic_launcher_round', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      //bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      //subText: 'This is a subText', // (optional) default: none
      //color: 'blue', // (optional) default: system default
      //vibrate: false, // (optional) default: true
      //vibration: 1000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000

      ongoing: true, // (optional) set whether this is an "ongoing" notification
      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    
      /* iOS only properties */
      
      /* iOS and Android properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: "You've studied for " + timeConverted + " minutes", // (optional)
      message:'The study period is over', // (required)
      //soundName: 'alert_asterisk_9', SOUND IS SET IN CHANNEL
  
      userInfo: { sceen: "home" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
      //playSound: false, // (optional) default: true
      // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
  }
  


  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }

  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }
}
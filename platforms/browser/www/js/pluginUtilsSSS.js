// 
//    pluginUtils.js
//


  function timeConverter(UNIX_timestamp)   {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ', ' + year + ' at ' + hour + ':' + ((min < 10) ? '0' : '') + min + ':' + ((sec < 10) ? '0' : '') + sec ;
    return time;
  }

  /*
  var Xhours;
  var Xampm;
  var Xmins;
  var Xsecs;
  var clockPanel = document.getElementById("clockPanel");
  var ticker;
  var Xcounter;
  var XclockIsRunning = false;
  
  function startClock()   {
    XclockIsRunning = true;
    Xcounter = 0;
    var now = new Date();
    
    var hrs = now.getHours();
    if (hrs == 0)   {
      Xhours = 12;
      Xampm = "AM";
    }
    else if (hrs > 12)   {
      Xhours = hrs - 12;
      Xampm = "PM";
    }
    else if (hrs == 12)   {
      Xhours = hrs;
      Xampm = "PM";
    }
    else   {
      Xhours = hrs;
      Xampm = "AM";
    }
      
    Xmins = now.getMinutes();
    Xsecs = now.getSeconds();
    
    clockPanel.innerHTML = "<span class=\"clockNumbersBig\">" + Xhours + ":" + ((Xmins < 10) ? '0' : '') + Xmins + "</span><span class=\"clockNumbersSmall\">" +
                                                       ((Xsecs < 10) ? '0' : '') + Xsecs + "&nbsp;" + Xampm + "</span>"; 
                                                       
    ticker = window.setInterval('clockTick()', 1000);
  }
  
  function clockTick()   {
    if (++Xcounter == 60)   {
      restartClock();
      return;
    }
  
    ++Xsecs;
    if (Xsecs == 60)   {
      Xsecs = 0;
      ++Xmins;
      if (Xmins == 60)   {
        Xmins = 0;
        Xhours++;
        if (Xhours == 13)   {
          Xhours = 1;
        }
        if ((Xhours == 12) && (Xmins == 0))   {
          if (Xampm == "AM")   {
            Xampm = "PM";
          }
          else   {
            Xampm = "AM";
          }
        }
      }
    }
    
    clockPanel.innerHTML = "<span class=\"clockNumbersBig\">" + Xhours + ":" + ((Xmins < 10) ? '0' : '') + Xmins + "</span><span class=\"clockNumbersSmall\">" +
                                                       ((Xsecs < 10) ? '0' : '') + Xsecs + "&nbsp;" + Xampm + "</span>";  
               
//    ticker = window.setTimeout('clockTick()', 1000);                                                           
  }
  
  document.addEventListener("deviceready", 'restartClock()', false);
  
  function restartClock()   {
    if (XclockIsRunning)   {
      clearTimeout(ticker); 
      startClock();
    } 
  }
*/
//
//    GEOLOCATION'
//




  // onSuccess Callback
  // This method accepts a Position object, which contains the
  // current GPS coordinates
  //
    var onGeoTestSuccess = function(position) {
        var displayTime = timeConverter(position.timestamp);
    
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + displayTime                       + '\n');

        // Alert box will stop clock javascript.
        // Comment this out as needed  
        // restartClock();
    };

    // onError Callback receives a PositionError object
    //
    function onGeoTestError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
    
    function doGeoTest()   {
      navigator.geolocation.getCurrentPosition(onGeoTestSuccess, onGeoTestError);
    }
    

//
//    CAMERA
//

      function doCameraTest()   {
        navigator.camera.getPicture(onCameraTestSuccess, onCameraTestFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
      }

      function onCameraTestSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
        // Alert box will stop clock javascript.
        // Comment this out as needed            
        // restartClock();
      }

      function onCameraTestFail(message) {
        alert('I see you\'ve chosen not to take a picture. That\'s OK.');
        // Alert box will stop clock javascript.
        // Comment this out as needed            
        // restartClock();
      }
      
      function clearCameraTestPic()   {
        var image = document.getElementById('myImage');
        image.src = '';
      }      


//
//    BATTERY LEVEL/STATUS

      var batteryLevel = "[init]";
      var isPluggedIn = false;

//  Comment this out if you don't want it
//  Turned this off. It's not working on my phone -- and per README, it sucks battery

//  window.addEventListener("batterystatus", onBatteryStatus, false);

      function onBatteryStatus(status) {
        batteryLevel = status.level;
        isPluggedIn = status.isPlugged;
      }
    
      function showBatteryStatus()   {
        if (isPluggedIn)   {
          alert("Battery is " + batteryLevel + "% full \nThe phone IS Plugged In");
        }
        else   {  
          alert("Battery is " + batteryLevel + "% full \nThe phone IS NOT Plugged In");
        }
        
        // Alert box will stop clock javascript.
        // Comment this out as needed             
        // restartClock();

      }


//
//    CONTACTS
//

      function onContactTestSuccess(contacts) {
        var myBuffer = "YOUR CONTACTS ARE:\n\n";
        var tmpArray = [];
          
        for (var j = 0; j < contacts.length; j++)   {
          tmpArray[j] = contacts[j].displayName + ": [" + contacts[j].phoneNumbers[0].value + "]";          
        }

        tmpArray.sort();
        
        for (var j = 0; j < contacts.length; j++)   {
          myBuffer += tmpArray[j] + "\n";
        }
                  
        alert (myBuffer);
            
//           alert (JSON.stringify(contacts[2]));
//           alert (contacts[2].type + ": [" + contacts[2].phoneNumbers[0].value);
             
      }
   
      function onContactTestError(contactError) {
        alert('UNABLE TO GET CONTACTS\n\n' + JSON.stringify(contactError));
      };

      function doContactTest()   {
        var options = new ContactFindOptions();  
        options.filter = "";
        options.multiple = true;
//      var filter = ["displayName", "addresses"];
        var filter = ["displayName"];
        navigator.contacts.find(filter, onContactTestSuccess, onContactTestError, options); 
      }


//
//    NETWORK INFO
//

      function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        return states[networkState];
      }
      
      function testConnection()   {
         alert('Connection type: ' + checkConnection());
        // Alert box will stop clock javascript.
        // Comment this out as needed      
        // restartClock();

      }
 
      var savedState = "";
      
      function displayWiFi()   {     
        var nowState = checkConnection();
        
        if (nowState != savedState)   {
          savedState = nowState;
          
          if (savedState == 'WiFi connection')   {
            document.getElementById("netStatus").value = "  ON WI-FI ";
            document.getElementById("netStatus").style.backgroundColor = "green";        
          }
          else   {
            document.getElementById("netStatus").value = " OFF WI-FI ";
            document.getElementById("netStatus").style.backgroundColor = "red";  
          }
        }
        
        setTimeout("displayWiFi()", 3000);
      }
      
      document.getElementById("netStatus").style.color = "white";
      setTimeout("displayWiFi()", 3000);

//  Monitor for Network Offline    
//      document.addEventListener("offline", onOffline, false);
//
//      function onOffline() {
//        document.getElementById("netStatus").value = " OFFLINE ";
//      }
//
//  Monitor for Network Online
//      document.addEventListener("online", onOnline, false);
//        
//      function onOnline() {
//        document.getElementById("netStatus").value = " ONLINE ";
//      }


//
//    DIALOGS
//

      function doAlertTest()   {
          navigator.notification.alert(
              'This is a Test Alert',   // message
              alertDismissed,           // callback
              'Test Alert',             // title
              'Received'                // buttonName
         );
      }


      function alertDismissed() {
        // do something
      }

      var buttonLabels = ['Sign Me Up','No Thanks'];
      
      function doPromptTest()   {
        navigator.notification.prompt(
          'Please enter your Email Address to receive our Newsletter',  // message
          onTestPrompt,                                                 // callback to invoke
          'Get on our Mailing List',                                    // title
          buttonLabels,                                                 // buttonLabels
          'sample@someplace.com'                                        // defaultText
        );    
      }
      
      function onTestPrompt(results)   {
        var selectedButton = buttonLabels[results.buttonIndex - 1];
        alert("You selected [" + selectedButton + "] and entered " + results.input1);
        // Alert box will stop clock javascript.
        // Comment this out as needed          
        // restartClock();
      
      }
 
      
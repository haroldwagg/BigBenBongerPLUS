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
        states[Connection.CELL_2G]  = '2G connection';
        states[Connection.CELL_3G]  = '3G connection';
        states[Connection.CELL_4G]  = '4G connection';
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
            document.getElementById("networkConn").value = "  WI-FI ";
            document.getElementById("networkConn").style.backgroundColor = "green"        
          }
          else   {
            document.getElementById("netStatus").value = " OFF WI-FI ";
            document.getElementById("netStatus").style.backgroundColor = "red"; 
            
            if (savedState == "4G connection")   {
              document.getElementById("networkConn").style.backgroundColor = "#0000cc"; 
              document.getElementById("networkConn").value = " 4G CELL "; 
            }
            else if (savedState == "3G connection")   {
              document.getElementById("networkConn").style.backgroundColor = "#997700"; 
              document.getElementById("networkConn").value = " 3G CELL "; 
            }
            else if ((savedState == "2G connection") ||  (savedState == "No network connection"))  {
              document.getElementById("networkConn").style.backgroundColor = "black"; 
              document.getElementById("networkConn").value = " 1X/NO NETWORK "; 
            }            
          }
        }
      }
      
      document.getElementById("netStatus").style.color = "white";
      setInterval("displayWiFi()", 3000);

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
 

//
//    BARCODE SCANNER
//

      function doBarCode()   {
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            alert("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera : true, // iOS and Android 
          showFlipCameraButton : true, // iOS and Android 
          showTorchButton : true, // iOS and Android 
          torchOn: true, // Android, launch with the torch switched on (if available) 
          prompt : "Place a barcode inside the scan area", // Android 
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device 
          disableAnimations : true // iOS 
        }
      );
    } 
    
    
//
//    PHOTOVIEWER
//

     function showPic(pic, caption)   {
//     PhotoViewer.show('http://my_site.com/my_image.jpg', 'Optional Title', {share:false});
       PhotoViewer.show(pic, caption, {share:false});
     }
     
 
              
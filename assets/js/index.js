// Best practice for ensuring the page is ready before starting DOM manipulations
$(document).ready(function() {

  // Notification settings for visual and audio notifications
  var visual = true;
  var audio = true;

  // Time until next alert in minutes
  var alertInterval;
  // Default to a low score to quickly trigger an alert when the website is loaded
  var currentProductivity = 1;

  // Manage the entire app, restarted after the alert triggers
  function manager() {
    // Compute minutes until next alert
    alertInterval = calculateAlertInterval(currentProductivity);
    // Display a countdown to the user
    timeUntilAlert(alertInterval);
    // Set an internal countdown to trigger an alert
    setNextAlert(alertInterval);
    // Set currentProductivity to 1 so that users are notified until they check-in
    currentProductivity = 1;
  }

  // Create global variables for alert intervals in minutes to display to the user
  var s1Interval = 1;
  var s2Interval = 2;
  var s3Interval = 5;
  var s4Interval = 10;
  var s5Interval = 15;
  var s6Interval = 20;
  var s7Interval = 30;

  // Use current productivity score to determine minutes until next alert
  function calculateAlertInterval(currentProductivity) {
    let interval;
    if (currentProductivity == 1) {
      interval = s1Interval;
    }
    else if (currentProductivity == 2) {
      interval = s2Interval;
    }
    else if (currentProductivity == 3) {
      interval = s3Interval;
    }
    else if (currentProductivity == 4) {
      interval = s4Interval;
    }
    else if (currentProductivity == 5) {
      interval = s5Interval;
    }
    else if (currentProductivity == 6) {
      interval = s6Interval;
    }
    else if (currentProductivity == 7) {
      interval = s7Interval;
    }
    else {
      // Use for user-driven notification testing and internal testing
      interval = 0.05;
    }
    return interval;
  }

  // Create global variable for recurring displayCountdown task
  // so other functions can deactivate the recurring task
  var displayCountdown;

  // Displays the time in minutes and seconds until the next alert
  function timeUntilAlert(alertInterval) {
    var nextAlert = new Date();
    nextAlert.setSeconds(nextAlert.getSeconds() + (alertInterval * 60));
    displayCountdown = setInterval(function() {
        var now = new Date().getTime();
        var timeDifference = nextAlert - now;
        var minutes = Math.floor((timeDifference/1000/60) % 60);
        var seconds = Math.floor((timeDifference/1000) % 60 );
        if (seconds < 10 && timeDifference >= 0) {seconds = "0" + seconds};
        if (timeDifference < 0) {minutes = 0; seconds = 00};
        $("#time_until_alert").text(minutes + ":" + seconds);
        if (timeDifference <=100) {clearInterval(displayCountdown);};
    }, 100)
  }

  // Create global variables for scheduled calling of triggerAlert and manager
  // so other functions can deactivate the scheduled calls
  var scheduleAlert;
  var scheduleManager;

  // Trigger alerts and restart the manager function at the end of the alert interval
  function setNextAlert(minutes) {
    scheduleAlert = setTimeout(triggerAlert, (minutes * 60 * 1000));
    scheduleManager = setTimeout(manager, (minutes * 60 * 1000));
  }

  // Triggers visual or audio alerts depending on user settings
  function triggerAlert() {
    if (visual) {
      // Use Push.js to trigger a push notification
      Push.create("Please update Productive.gq");
    }
    if (audio) {
      var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3');
      a.play();
    }
  }

  // If a currentProductivity button is clicked, stop countdown and scheduled
  // alert/manager calls, and reset timer using the currentProductivity button value
  $(".modern-button").click(function() {
    currentProductivity = $(this).text();
    clearInterval(displayCountdown);
    clearTimeout(scheduleAlert);
    clearTimeout(scheduleManager);
    manager();
  });

  // Trigger an alert quickly
  $("#notify").click(function() {
    currentProductivity = 0.1;
    clearInterval(displayCountdown);
    clearTimeout(scheduleAlert);
    clearTimeout(scheduleManager);
    manager();
  });

  // Display remain on page prompt; enable in production
  window.onbeforeunload = function() {
      return true;
  };

  // Request notifications without optional callback arguments (onGranted, onDenied)
  // so the app can run via the call to manager while push permissions are pending
  Push.Permission.request();

  // Run program 
  manager();

// End of JS code: close the $(document).ready() function
});


// START REFERENCE SECTION

//var msg = new SpeechSynthesisUtterance('Hello World');
//window.speechSynthesis.speak(msg);

// One line speech
// window.speechSynthesis.speak(new SpeechSynthesisUtterance('Hello World'))

/*
// Track if push notifications are enabled
var can_push;
// Prompt user for notification permissions if permissions not granted
// This will call onGranted if notifications are granted, or onDenied if 
// notifications are blocked or if the decision is deferred
// May be able to call Push.Permission.has(); for permissions status
Push.Permission.request(onGranted, onDenied);

// Trigger changes if notifications are granted
function onGranted(callback) {
  can_push = true;
}

// Trigger changes if notifications are denied/deferred
function onDenied() {
  can_push = false;
}
*/


/* Testing code 
console.log("is false");
setTimeout(function(){Push.create("Please check in with Productive.gq")}, 2000);
// audio: http://soundbible.com/2156-Text-Message-Alert-3.html
var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3'); a.play();
*/

/* Alert code
// Subtle alert
setTimeout(function(){alert("Please check in with Productive.gq")}, 5000);
// Intensive alert
setTimeout(function(){window.alert("Please check in with Productive.gq")}, 4000);
// Desktop Notifications
Push.create("Please check in with Productive.gq")
// Play Audio
var a=new Audio('https://soundbible.com/grab.php?id=2156&type=mp3'); a.play();
setTimeout(function(){Push.create("Please check in with Productive.gq")}, 5000);
*/

/* timer debugging code
//var remaining_time = document.getElementById("timeUntilAlert");
//remaining_time.innerHTML = 
//document.getElementById('timeUntilAlert').innerHTML(timeDifference);

//if (timeDifference < 0) {minutes = 0; seconds = 00}; // in case timeDifference decreases below 0
//$(#timeUntilAlert).text(minutes + ":" + seconds) // display time on homepage
*/
